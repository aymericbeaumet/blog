---
title: Prevent chromedp Chromium zombie processes from stacking
tags: [golang, chromedp, chromium, macos]
---

I have recently been playing with
[chromedp](https://github.com/chromedp/chromedp) in order to programatically
control a Chromium browser to scrape some informations. I have some memories
from implementing a similar task in Node.js, and I was really happy to leverage
a strongly typed language for the job.

_TLDR: if you are looking for the solution, look for the last code snippet of the post._

I was able to quickly start experimenting by following the
[examples](https://github.com/chromedp/examples) and browsing the
[documentation](https://pkg.go.dev/github.com/chromedp/chromedp). For the record, this is what the chromedp
hello world looks like:


```go
func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	if err := chromedp.Run(
		ctx,
		chromedp.Navigate("https://github.com"),
	); err != nil {
		panic(err)
	}
}
```

Further down the coding session, I suddenly heard my MacBook Pro fans running
crazy, similar to what's happening when a `brew install` is not going as
expected, and you feel like you are recompiling gcc from scratch (if you have
never tried to do so I would recommend doing it at least one, just to relativise when you say
_my code takes too long to compile_). This was accompanied by a gentle warmth on my
hands and an increasing slowness on the OS UX.

A quick look at the [activity monitor](/resources/chromium_zombies.png) revealed
that the Chromium processes were not disposed as expected. They were also using
a lot of RAM, and forced my computer to swap (hence the percepted slowness).

A swift `pkill Chromium` got me out of trouble. But now remains the question:
how to prevent this from happening in the future? A quick search on Google led
me to the chromedp issue tracker, where this has already [been
reported](https://github.com/chromedp/chromedp/issues/472). This issue is now
closed, but people still seem to experience it. If you are also experiencing the
problem, I can only encouraging you to make yourself heard there.

In the meantime, I was looking for a temporary solution that would prevent the
zombie processes from stacking (and eating my RAM). As it happens, the Chromium
processes are spawned with the same user as the Go process. That means it should theoratically
be possible to kill them from within the Go process right before it dies. I quickly tried to confirm
this theory with the following code:

```go
func main() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer func() {
		cancel()
		if _, err := exec.Command("pkill", "Chromium").Output(); err != nil {
			log.Println("[warn] Failed to kill Chromium processes", err)
		}
	}()

  // ...
}
```

It is not as chirurgical as I would like it to be as all the Chromium processes
on my given machine would die, but this works. Also I'm not using Chromium as my
main browser, so I'm not really impacted. But then I started to write this
blog post, and I was sure at some point someone would face this issue _and_
would also be using Chromium as its main browser. So I started digging.

As it turns out, `man pkill` gives us a path to explore. `pkill` (and `pgrep`
for that matters, which shares most of their options) does support a flag allowing
to restrict the processes receiving the signal to only the
descendants of a specific PID (or said otherwise: all the processes whose
parent is PID). This is done by providing the `-P <pid>` flag.

Once the code is adjusted as below, only the Chromium processes started by the
Go process will be killed:

```go
_, err := exec.Command("pkill", "-P", strconv.Itoa(os.Getpid()), "Chromium").Output()
```

Or so I thought. This actually doesn't work. As it turns out, the Chrome
processes are not directly attached to the Go process as there are intermediate
forks. So trying to match the parent process will not work.

While looking at the activity monitor, I noticed there was something else than
the parent PID mentionned: the process group PID. A quick look on the [Wikipedia
page](https://en.wikipedia.org/wiki/Process_group) encouraged me to continue
down that path. Reading `man ps` taught me the `ps -g` flag, which allows to
list all the processes belonging to a given process group (in this case of the
Go process group PID _46499_):

```bash
$ ps -g 46499
  PID TTY           TIME CMD
46499 ttys001    0:00.77 go run .
46518 ttys001    0:38.43 /var/folders/dg/3zgc8tkd0wg7d0zc0mst6jc00000gn/T/go-build917574381/b001/exe/scraper
46520 ttys001    0:01.72 /Applications/Chromium.app/Contents/MacOS/Chromium --disable-popup-blocking --safebr
46521 ttys001    0:00.80 /Applications/Chromium.app/Contents/Frameworks/Chromium Framework.framework/Versions
46522 ttys001    0:08.18 /Applications/Chromium.app/Contents/Frameworks/Chromium Framework.framework/Versions
```

This properly lists all the Chromium processes created by the Go process! We are
getting close to what we want. As it turns out, `pkill` also supports the `-g`
flag. So changing the code as follows should behave as expected:

```go
_, err := exec.Command("pkill", "-g", strconv.Itoa(os.Getpid()), "Chromium").Output()
```

But it doesn't. If you look carefully at the `ps` command above, you can see
there is the actual `scraper` process, but above it you can see the `go run .`
process. This is the process that actually created the group. So we should be
careful to use its PID instead. In Go, you can get the PID of the parent process
with [os.Getppid()](https://golang.org/pkg/os/#Getppid), which gives us:

```go
_, err := exec.Command("pkill", "-g", strconv.Itoa(os.Getppid()), "Chromium").Output()
```

And finally, it works as expected, at least! Well, it works when we `go run .`.
What happens when we `go build`? I will let you try, but I can tell you it
doesn't work. The reason is because the group process is no longer the one
created by _go run_, but the one created by the binary itself as we run it directly. So
we need to account for that when we infer the group process PID from the code.

An easy solution is to try to `pkill` both for the current pid
_and_ the parent pid. As long as they don't both fail, it means we have
succeeded to kill all the zombie processes:

```go
_, errA := exec.Command("pkill", "-g", strconv.Itoa(os.Getppid()), "Chromium").Output()
_, errB := exec.Command("pkill", "-g", strconv.Itoa(os.Getpid()), "Chromium").Output()
}
```

This works. But I don't really find this elegant as we are expecting at least half of the `pkill` commands to fail.
Can we take it one step further? Let's have a look at `man pkill`:

```
-g pgrp     Restrict matches to processes with a process group ID in the comma-separated list
            pgrp.  The value zero is taken to mean the process group ID of the running pgrep
            or pkill command.
```

Reading this carefully teaches us we could actually pass a comma-separated list
of PID to `-g`, which enables to only call `pkill` once by passing both the PPID and the PID to `-g`, only separating them by a comma. But the second part of
the description is actually much more interesting: by passing `0` we can actually ask
`pkill` to infer for us what is the current process group PID. That greatly
simplifies the code by moving this responsability out of the Go code:

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

And here it is. This is the snippet I'm currently using in my project. I hope
you enjoyed the journey we took to get there. It is funny how sometime a simple
problem will lead you into challenging your knowledge on something you thought
was well inside your comfort zone. Only to remind you you can always get
further.
