---
title: Prevent chromedp Chromium zombie processes from stacking
tags: [golang, chromedp, chromium, macos]
---

I have recently been playing with
[chromedp](https://github.com/chromedp/chromedp) in order to programatically
control a Chrome browser to extract some informations from specific websites. I
have some experience doing a similar task in Node.js, and I was really happy to
be able to leverage a strongly typed language for the job.

Going back and forth between the documentation and the examples, everything went
as expected. Vim on the left side of my terminal, zsh on the right side showing
me the output as the code was re-run by [watchexec](https://github.com/watchexec/watchexec).

Further down the coding session, I suddenly heard my MacBook Pro fans running
crazy, similar to what's happening when a `brew install` is not going as
expected and you are recompiling all the dependencies required by your
formula.

A quick look at the activity monitor revealed that Chromium processes were not
released as expected.

![Zombie Chromium processes](/resources/chromium_zombies.png)

A quick `pkill Chromium` got me out of trouble. But now remains the question:
how to prevent this from happening in the future? A quick search on Google led
me to the chromedp issue tracker, where this has already [been
reported](https://github.com/chromedp/chromedp/issues/472). This issue is closed, but people still seem to experience it.  I have open a [new issue]() to report the problem.

In the meantime, I'm looking for a temporary solution that would prevent the
zombie processes from stacking (and eating my RAM),
As it happens, the Chromium processes are spawned with the same user as the Go
process (as expected).

```go
func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer func() {
		cancel()
		// We shouldn't need to do this, but some Chromium instances are otherwise hanging
		if _, err := exec.Command("pkill", "Chromium").Output(); err != nil {
			log.Println("Failed to kill Chromium processes", err)
		}
	}()

  // ...
}
```

It is not as chirurgical as I would like it to be, but then that was enough for
me. Also I'm not using Chromium as my daily browser, so I wasn't concerned about
killing _all_ the Chromium processes on my machine. But then I started to write
this blog post, and I was sure at some point someone will face this issue while
also using Chromium as its main browser. So I started digging.

As it turns out, `pkill` does support an option allowing to restrict the process
to which the signal should be sent to only be descendant of a specific _pid_.
This is done by providing the `-P` option. Once the code is adjusted as below,
no more side effect, and only the Chromium processes started by the Go process
will be killed:

```go
exec.Command("pkill", "-P", strconv.Itoa(os.Getpid()), "Chromium").Output()
 ```

Hopefully the issue will be adressed in the near future, but in the meantime
this solution proves really efficient, and work on any platform that has the
`pkill` (or similar) command.
