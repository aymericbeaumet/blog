---
title: Properly shim AngularJS applications using Browserify
date: 2014-10-12
thumbnail: ./thumbnail.png
tags:
  - AngularJS
  - Browserify
  - JavaScript
attachments:
  - ./example.tgz
---

_Edit (March 5th 2015): the frontend community has evolved in the last few
months and tends to be less hostile to the CommonsJS style (e.g.: Angular is
now available on npm). This article has been rewritten accordingly._

[AngularJS](https://angularjs.org/) is a frontend framework developed by
folks at Google. It allows to build advanced web applications in a modular
way by splitting the code base into small components. This brings a lot of
advantages like a clean separation of concerns and an easier testability.

[Browserify](http://browserify.org/) is a tool which allows to benefit from
the [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) modules in
theoretically any JavaScript environments. Given an entry point, it computes
a dependency tree, resolves it and produces a single output file. By
consuming the `package.json`, Browserify enables to require `node_modules` in
the build. This allows to rely on [npm](https://www.npmjs.com/) as a package
manager for frontend dependencies, where [Bower](https://bower.io/) or
[Component](http://component.github.io/) would have been usually used.

When I first heard about Browserify, I immediately thought the modularity it
brings would be really nice to build AngularJS applications. And it actually
is. However they are not a perfect match by now, and some drawbacks need to
be fixed.

This article presents a solution to structure an AngularJS application using
Browserify. It covers the use of non-CommonJS modules as dependencies.

## A sample application

Let’s consider a sample application which sets an entry in the local storage,
and uses it to react differently whether it’s the first time a user is
loading the page. It will be used as a support to identify the trouble cases
and detail how to tackle them. So create an empty folder and let’s get
started!

First, create an `app.js` file which will be the entry point:

```javascript
var angular = require('angular')
var app = angular.module('app', [require('angular-local-storage')])

app.run(function(localStorageService) {
  if (!localStorageService.get('lastVisit')) {
    angular.element('body').text('Hello stranger!')
  } else {
    angular.element('body').text('Welcome back!')
  }
  localStorageService.set('lastVisit', Date.now())
})
```

Neat, isn’t it? If you come from a Node.js background I’m sure you do like it.

Now let’s generate the `package.json`:

```bash
npm init
npm install --save angular angular-local-storage jquery
npm install -D browserify
```

Then compile the application:

```bash
./node_modules/.bin/browserify app.js -o bundle.js
```

And finally create a basic `index.html` to load it:

```html
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body ng-app="app"></body>
</html>
```

Pretty simple huh? But as you might expect, this doesn’t work. Open
`index.html` in a web browser and take a look at the console to find a nice
JavaScript error.

## Explanations

There are several issues occurring here.

### Modules not defining an entry point

When a module is required, Browserify looks in the `node_modules` folder to
find its `package.json` and loads it. Browserify expects it to have a `main`
property which contains the relative path to the file which should be loaded.

It is usual that this property is missing, that it points to the wrong file
or that the `package.json` itself is missing. In such case, you can override
the file to load in the own project’s `package.json`:

```json
{
  "browser": {
    "angular": "./node_modules/angular/angular.js",
    "angular-local-storage": "./node_modules/angular-local-storage/dist/angular-local-storage.js"
  }
}
```

### Modules not properly exporting their content

When Browserify requires the file indicated by the `main` property in the
module’s `package.json`, it is usual that this file does not properly export
its content in the CommonJS style. Also, we expect AngularJS modules to
export their names so that we could directly require them in our AngularJS
modules definitions.

To this end, [browserify-shim](https://github.com/thlorenz/browserify-shim) can be used.

First install it:

```bash
npm install -D browserify-shim
```

Then, update the `package.json`:

```json
{
  "browserify-shim": {
    "angular": {
      "exports": "angular"
    },
    "angular-local-storage": {
      "exports": "angular.module('LocalStorageModule').name"
    }
  },
  "browserify": {
    "transform": ["browserify-shim"]
  }
}
```

- `angular` exports the global variable `angular`
- `angular-local-storage` exports its AngularJS module name `LocalStorageModule`

### Modules fetching their dependencies on the global context

Some frontend modules relies on the fact their dependencies will be exposed
on the global object (generally the `window` object in most browsers). This is
an anti-pattern of the CommonJS architecture which favors separation of
concerns.

For example, AngularJS expects jQuery to be exposed at the `window.jQuery`
property.

One solution is to wrap the module into a function which exposes a global
object with the appropriate properties. Hopefully, this could also easily
done via _browserify-shim_ (see above for the installation).

Then, update the `package.json`:

```json
{
  "browserify-shim": {
    "angular": {
      "depends": "jquery:jQuery"
    },
    "angular-local-storage": {
      "depends": "angular"
    }
  }
}
```

- `angular` will be provided the `jquery` module on a fake window object at the property `jQuery`
- `angular-local-storage` will be provided the `angular` module the same way

## Wrap up

You should have added the following content to your `package.json`:

```json
{
  "browser": {
    "angular": "./node_modules/angular/angular.js",
    "angular-local-storage": "./node_modules/angular-local-storage/dist/angular-local-storage.js"
  },
  "browserify-shim": {
    "angular": {
      "depends": "jquery:jQuery",
      "exports": "angular"
    },
    "angular-local-storage": {
      "depends": "angular",
      "exports": "angular.module('LocalStorageModule').name"
    }
  },
  "browserify": {
    "transform": ["browserify-shim"]
  }
}
```

Once you’ve made those corrections, you should be able to compile and run the sample application:

```bash
./node_modules/.bin/browserify app.js -o bundle.js
```

Check it really works by opening `index.html`.

## Side notes

Some related facts which can save you time when dealing with Browserify:

- modules not published to npm can be installed by giving their git
  repository URL: `npm install git+https://github.com/angular-ui/ui-router.git`.
  Note that it is also possible to directly pass a GitHub repository: `npm install angular-ui/ui-router`. A version can be specified by appending `#tag`. See the [documentation](https://docs.npmjs.com/cli/install) for more information
- modules not containing a `package.json` cannot be installed using npm (even
  by directly providing a git repository). To tackle this issue, a third party
  installer like [napa](https://github.com/shama/napa) has to be used
- `napa` will directly install the dependencies in the `node_modules` directory
- the `postinstall` script is equivalent to `install`. It is executed after the
  modules installation. However, I find it to be more explicit
- you should place `napa` into the `postinstall` script
- the paths provided in the `browser` field needs to be relative to the root
  `package.json` path. It is mandatory to start each entry by `./`
- it is possible to indicate files in another repository than `node_modules`
  when filling the browser field (e.g.: `bower_components`)
- centralizing Browserify options in the `package.json` is a good practice
  since it allows to keep a constant behavior when invoking it in different
  ways (CLI, API)

## Source

A working example can be downloaded [here](./example.tgz).

## Conclusion

Even though there is a little more code to write to setup a project, this
solution provides a beautiful way to organize its code in logical bricks. It
totally matches the way AngularJS has been thought.

Also, managing all the dependencies in a single place is really useful.
Especially when developing full-stack JavaScript applications, hence
potentially sharing dependencies between the frontend and the backend (e.g.:
Async.js, Bluebird, Moment.js, highlight.js, …). Using a CommonJS loader
allows to rely on the exact same versions of the modules both client-side and
server-side.
