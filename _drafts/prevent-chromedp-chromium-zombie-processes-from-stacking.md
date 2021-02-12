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
formula. This was accompanied by an increasing slowness.

A quick look at the [activity monitor](/resources/chromium_zombies.png) revealed
that Chromium processes were not disposed as expected. They actually were using
a lot of RAM, and my computer started to swap (hence the percepted slowness).

A quick `pkill Chromium` got me out of trouble. But now remains the question:
how to prevent this from happening in the future? A quick search on Google led
me to the chromedp issue tracker, where this has already [been
reported](https://github.com/chromedp/chromedp/issues/472). This issue is now
closed, but people still seem to experience it. If you are also experiencing the
problem feel free to react there, this will give an idea of the number of people
impacted by this problem.

In the meantime, I was looking for a temporary solution that would prevent the
zombie processes from stacking (and eating my RAM). As it happens, the Chromium
processes are spawned with the same user as the Go process (as expected). That
means it should be possible to kill them from within the Go process. I quickly
tried this with the following code:

```go
func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer func() {
		cancel()
		// Prevent Chromium processes from hanging
		if _, err := exec.Command("pkill", "Chromium").Output(); err != nil {
			log.Println("Failed to kill Chromium processes", err)
		}
	}()

  // ...
}
```

It is not as chirurgical as I would like it to be as all the Chromium processes
on a given machine would die, but this works. Also I'm not using Chromium as my
daily browser, so this doesn't impact me. But then I started to write this blog
post, and I was sure at some point someone would face this issue while also
using Chromium as its main browser. So I started digging.

As it turns out, `man pkill` gives us the solution. `pkill` (and `pgrep`) does
support an option allowing to restrict the process to which the signal should be
sent to only be descendant of a specific _pid_ (or said otherwise: all the
processes whose parent is _pid_). This is done by providing the `-P <pid>` flag.

Once the code is adjusted as below, only the Chromium processes started by the
Go process will be killed:

```go
_, err := exec.Command("pkill", "-P", strconv.Itoa(os.Getpid()), "Chromium").Output()
```

Or so I thought, this actually doesn't work. As it turns out, the Chrome process
is not directly attached to the Go process (there are intermediate forks). So
trying to match the parent process will not work.

There is one relationship that remains though: the [process
group](https://en.wikipedia.org/wiki/Process_group). We can confirm this by
giving a quick look with `ps` with the `-g` flag to list all the processes
belonging to a given process group (in this case of the Go process _46499_):

```bash
$ ps -g 46499
  PID TTY           TIME CMD
46499 ttys001    0:00.77 go run .
46518 ttys001    0:38.43 /var/folders/dg/3zgc8tkd0wg7d0zc0mst6jc00000gn/T/go-build917574381/b001/exe/scraper
46520 ttys001    0:01.72 /Applications/Chromium.app/Contents/MacOS/Chromium --disable-popup-blocking --safebr
46521 ttys001    0:00.80 /Applications/Chromium.app/Contents/Frameworks/Chromium Framework.framework/Versions
46522 ttys001    0:08.18 /Applications/Chromium.app/Contents/Frameworks/Chromium Framework.framework/Versions
```

We are getting close to what we want. As it turns out, `pkill` also supports the
`-g` flag. So changing the code as follows should behave as expected:

```go
_, err := exec.Command("pkill", "-g", strconv.Itoa(os.Getpid()), "Chromium").Output()
```

Still doesn't work. If you look carefully at the `ps` command above, you can see
there is the actual `scraper` process, but above it you can see the `go run .`
process. This is the process that actually created the group. So we want to get
its pid. In Go, you can get the pid of the parent process with the
[os.Getppid()](https://golang.org/pkg/os/#Getppid) function:

```go
_, err := exec.Command("pkill", "-g", strconv.Itoa(os.Getppid()), "Chromium").Output()
```

And this works as expected, at least! Well it works when we `go run`. What
happens when we `go build`? I will let you try, but I can tell you it doesn't
work. The reason is because the group process is no longer the one created by
_go run_, but the one created by the binary itself. So we need to account for
that when we infer the group pid from the code.

An easy solution from the Go code is to try to `pkill -g` both for the current
pid _and_ the parent pid. As long as they don't both fail, it means we are not
going to have any zombie process remaining.

```go
_, errA := exec.Command("pkill", "-g", strconv.Itoa(os.Getppid()), "Chromium").Output()
_, errB := exec.Command("pkill", "-g", strconv.Itoa(os.Getpid()), "Chromium").Output()
}
```

It works but I find the current solution quite convulated, and not really
elegant (we are expecting at least half of the pkill commands to fail). Can we
take it one step further? Let's have a look at `man pkill`:

```
-g pgrp     Restrict matches to processes with a process group ID in the comma-separated list
            pgrp.  The value zero is taken to mean the process group ID of the running pgrep
            or pkill command.

```

We could actually pass a comma-separated list, that would allow us to only
perform one call to `pkill`. But the second part of the description is even more interesting,
by passing `0` we can actually ask `pkill` to guess what is the current process
group ID. And that greatly simplifies the code:

```go
func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer func() {
		cancel()
		// Prevent Chromium processes from hanging
		if _, err := exec.Command("pkill", "-g", "0", "Chromium").Output(); err != nil {
			log.Println("[warn] Failed to kill Chromium processes", err)
		}
	}()

  // ...
}
```

And here it is. This is the snippet I'm currently using in my production. I hope
you enjoyed the journey we took to get there. It is funny how sometime a simple
problem will lead you into discovering new things, or dive into knowledge you
thought was already mastered, only to remind you you can only get further you
even further.
