---
title: Faster git clones with sparse checkouts
tags: [git, performance]
thumbnail: ./thumbnail.jpg
date: 2022-07-23
---

We at [REKKI](https://rekki.com) are working on a monorepo that contains all the
backend Go code for most of our services and jobs. As time goes by and the size
of this repository grows, the time it takes for an initial clone becomes
noticeable. While this is not really a problem on the engineers' workstations as
they operate statefully, it impacts stateless systems that have to download the
codebase regularly: like CIs, CDs, or even our in-house
[CLI](https://cli.rekki.team/).

Our CLI sometimes needs to pull a fresh version of a specific commit from the Go
codebase to perform beta updates when our engineers request it (e.g.: to test
new features that are not yet released in the stable version). Cloning the Go
monorepo every time they want to install a beta update is not an option, as it
takes more than a minute on a good connection.

## Shallow clones

The first approach you often take in a situation like this is to shallow clone.
While a default clone will fetch all the commits and all the
[blob objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) for the
branch you track (by default `master`/`main`), a shallow clone will only fetch
the blob objects for a subset of these commits, thus resulting in faster clone
times.

That is very common in the world of CIs. For example, both
[GitHub Actions](https://github.com/actions/checkout) and
[Travis CI](https://docs.travis-ci.com/user/customizing-the-build/#git-clone-depth)
do it by default.

One way you'd do a shallow clone is by specifying the `--depth=<n>` flag to the
`git clone` command, hence limiting the number of commits to pull starting from
the HEAD:

```bash
# fetch the latest commit
git clone --depth=1 git@github.com:rekki/go.git
```

Another way to shallow clone it is to specify a _start date_ instead of a number
of commits. This is possible via the `--shallow-since=<date>` flag with either
an absolute or a relative date:

```bash
# fetch the last day of commits
git clone --shallow-since='1 day' git@github.com:rekki/go.git
```

While shallow clones work well in some contexts, they fall short by downloading
all the blob objects in the working tree for the given commits. So even
specifying a depth of 1 results in non-negligible clone times for some
repositories (in the case of our Go monorepo, this still takes 30 seconds).

## Sparse checkouts

Another way to reduce the amount of downloaded data is to use sparse checkouts.
Sparse checkouts solve that problem by allowing to partially checkout a working
tree. While shallow clones give you control over the _commits_ you want to
fetch, sparse checkouts will enable you to specify the _blob objects_ you wish
to fetch.

> While sparse checkouts exist since git
> [2.25.0](https://github.com/git/git/blob/master/Documentation/RelNotes/2.25.0.txt),
> they are still considered experimental. It is unlikely that the feature will
> be removed in the future, but breaking changes might happen in both its
> implementation and its usage.

You can either specify a list of directories (in what's called _cone mode_) or a
list of patterns (ala _.gitignore_). The
[manual](https://git-scm.com/docs/git-sparse-checkout) recommends using the cone
mode for performance reasons.

Leveraging sparse checkouts allows you only to fetch the blob objects you need
for the task you want to perform. In our case, we wanted only to clone the files
required to build our CLI. This is how we did it:

```bash
git clone --filter=blob:none --no-checkout git@github.com:rekki/go.git
cd go
git sparse-checkout set --cone go.mod go.sum cmd/rekki-cli pkg/rekki/errors
git checkout master
```

Let's explain step by step:

1. `git clone`: like a typical clone, but with 2 additional flags:
   - `--filter=blob:none`: instructs not to fetch any blob object
   - `--no-checkout`: instructs not to automatically checkout _HEAD_
2. `git sparse-checkout set`: enables the sparse checkout settings and specifies
   which files should be checked out. Change this line to whatever works for
   you.
3. `git checkout master`: checkouts the actual branch or commit (in this case,
   the `master` branch) and fetches the objects matching the sparse patterns.

You can easily adapt these commands to your use cases.

This approach allowed us to reduce the end-to-end time to clone to less than 5
seconds. We are satisfied with that number, and we know that time will only grow
proportionally to the size of the code required to build the CLI (and nothing
else). So it should stay fast for the foreseeable future.

## Conclusion

Using sparse checkouts is a bit more involved in the commands you have to
execute, but it allows for more control over the files you download on your
local filesystem. You don't always need the entirety of a git repository, and
sparse checkouts allow you to pick what you need granularly.

Give it a try the next time you find yourself in a situation where a git clone
takes too long. What use case do you have in mind? Leave a comment with your
ideas below.
