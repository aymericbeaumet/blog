---
title: Prevent chromedp Chromium zombie processes from stacking
tags: [go, chromedp, chromium, macos]
date: 2021-02-13
unsplash: https://unsplash.com/photos/NMk1Vggt2hg
---

I have recently been playing with
[chromedp](https://github.com/chromedp/chromedp). Chromedp is a Go library that
enables you to control a Chromium browser programmatically. This can be used for
different tasks: from testing to scraping. I have some memories of implementing
a similar program in Node.js, and I was pleased to leverage a strongly typed
language for the job.

I was able to quickly start experimenting by following the
[examples](https://github.com/chromedp/examples) and browsing the
[documentation](https://pkg.go.dev/github.com/chromedp/chromedp). For the
record, this is what the chromedp hello world looks like:

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

## The problem

Not so long after I started getting results, I suddenly heard my MacBook Pro
fans running crazy. Similar to what's happening when a `brew install` is not
going as expected, and you feel like you are recompiling gcc from scratch. This
was accompanied by a weirdly unpleasant gentle warmth on my hands and an
increasing slowness on the macOS UI.

A quick look at the [activity monitor](/resources/chromium_zombies.png) revealed
that the Chromium processes were not terminated as expected. They were also
using a lot of RAM, and forced my computer to swap (hence the perceived
slowness).

Running `pkill Chromium` got me out of trouble. But now remains the question:
how to prevent this from happening in the future? A quick search on Google led
me to the chromedp issue tracker, were several
[resolved](https://github.com/chromedp/chromedp/issues/81)
[issues](https://github.com/chromedp/chromedp/issues/289) are reporting this
very problem. They were all closed, and I didn't have the same symptoms, so I
opened a [new one](https://github.com/chromedp/chromedp/issues/752) to keep
track of what I was facing.

_TLDR: if you are looking for the solution, jump to the
[end of this post](#the-solution)._

## The quick fix

This problem will at some point be fixed upstream, but in the meantime I was
looking for a temporary solution that would prevent the zombie processes from
stacking (and eating my RAM). As it happens, the Chromium processes are spawned
with the same user as the Go process. That means it should theoratically be
possible (permission wise) to kill them from within the Go process right before
it dies. I quickly tried to confirm this theory with the following code:

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

It is not as accurate as I would like it to be. All the Chromium processes on my
machine (whose my user has rights on) would die, but this works. That being
said, I'm not using Chromium as my primary browser, so I'm not really impacted.
But then came the time to write this blog post, and I was sure at some point
someone would face this issue _and_ would also be using Chromium as its primary
browser. So I started digging.

## Going down the rabbit hole

As it turns out, `man pkill` gives us some interesting leads to explore. `pkill`
(and `pgrep` for that matters, as they share most of their options) does support
a flag allowing to restrict the processes receiving the signal to only the
descendants of a specific PID (or said otherwise: all the processes whose parent
is PID). This is achieved by providing the `-P <PID>` flag.

Once the code is adjusted to leverage the
[`os.Getpid()`](https://golang.org/pkg/os/#Getpid) function, only the Chromium
processes started by the Go process will be killed:

```go
_, err := exec.Command("pkill", "-P", strconv.Itoa(os.Getpid()), "Chromium").Output()
```

Or so I thought, this doesn't work. As it turns out, the Chrome processes are
not directly attached to the Go process as there are intermediate forks. So
trying to match the parent process will not behave as you would expect.

While looking at the activity monitor, I noticed there was something else than
the process ID (PID) mentioned: the process group ID (PGID). I was not sure what
this was about. A quick look at the
[Wikipedia page](https://en.wikipedia.org/wiki/Process_group) reads:

> In a POSIX-conformant operating system, a process group denotes a collection
> of one or more processes. Among other things, a process group is used to
> control the distribution of a signal; when a signal is directed to a process
> group, the signal is delivered to each process that is a member of the group.

It felt like this was one way to go, so I decided to dig this whole process
group concept. Reading `man ps` helped me craft these two commands:

1. `ps -o pid,pgid,command`: which lists all the processes on the system, along
   with their PID, PGID, and the full command
2. `ps -g <PGID>`: which lists all the processes belonging to a specific process
   group ID

By using the first command, I found my Go process PGID (_46499_), and by using
the second one I was able to list all of the processes in this group:

```bash
$ ps -g 46499
  PID TTY           TIME CMD
46499 ttys001    0:00.77 go run .
46518 ttys001    0:38.43 /var/folders/dg/3zgc8tkd0wg7d0zc0mst6jc00000gn/T/go-build917574381/b001/exe/scraper
46520 ttys001    0:01.72 /Applications/Chromium.app/Contents/MacOS/Chromium --disable-popup-blocking --safebr
46521 ttys001    0:00.80 /Applications/Chromium.app/Contents/Frameworks/Chromium Framework.framework/Versions
46522 ttys001    0:08.18 /Applications/Chromium.app/Contents/Frameworks/Chromium Framework.framework/Versions
```

This lists all the processes belonging to the Go process group (including
Chromium's). We are getting close to what we want. As it turns out, `pkill` also
supports the `-g` flag (with the same semantic). So changing the code as follows
should behave as expected:

```go
_, err := exec.Command("pkill", "-g", strconv.Itoa(os.Getpid()), "Chromium").Output()
```

But it doesn't. If you look carefully at the `ps` command above, you can see the
actual `scraper` process, but above it is the `go run .` process, which is the
process that created the group. As we can see, the process group ID is the PID
of the process that created the group. So we should be careful to use the _go
run_ PID instead. In Go, you can get the PID of the parent process with
[os.Getppid()](https://golang.org/pkg/os/#Getppid), which gives us:

```go
_, err := exec.Command("pkill", "-g", strconv.Itoa(os.Getppid()), "Chromium").Output()
```

Does it work? Yes, finally! Well, it works when we `go run .`, but what happens
when we `go build` and directly run the binary? Well, it's not working. The
reason is that the process group is no longer the one created by _go run_, but
the one created by the binary itself as we run it directly. So we need to
account for that when we try to guess the PGID from the code.

An easy solution is to try to `pkill` both for the current pid _and_ the parent
pid. At least one of them will be the process group ID. So as long as they don't
both fail, it means we have succeeded to kill all the zombie processes:

```go
_, errA := exec.Command("pkill", "-g", strconv.Itoa(os.Getppid()), "Chromium").Output()
_, errB := exec.Command("pkill", "-g", strconv.Itoa(os.Getpid()), "Chromium").Output()
```

This works. But I don't find this elegant as we expect half of the `pkill`
commands to fail during a normal execution process. Can we take it one step
further? Let's have a look at `man pkill`:

```
-g pgrp     Restrict matches to processes with a process group ID in the comma-separated list
            pgrp.  The value zero is taken to mean the process group ID of the running pgrep
            or pkill command.
```

Reading this teaches us we could pass a comma-separated list of PID to `-g`,
which enables to only call _pkill_ once by passing both the PGID and the PID at
the same time. But the second part of the description is much more interesting:
by passing `-g 0` we ask _pkill_ to infer for us what is the current process
group ID. That greatly simplifies the code by moving this responsibility out of
Go.

### The solution

By applying this to our piece of code, we reach this solution:

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

This does exactly what we want: it kills all the Chromium processes that have
been started by the Go process without impacting any other Chromium process that
would be running on your machine. This is simple, elegant, and works on all
POSIX systems. It also has the advantage of being transposable to any other
stack you use. Bingo!

## Conclusion

You might be wondering: was it worth digging all the way through considering you
already had a working solution from the get-go? That's a good point. Well, first
it was not working the way I expected it to. And second, I strongly believe our
knowledge is always (and will always be) shallow, which makes me strive to take
the time to dig deeper whenever I have the opportunity.

It is enjoyable how sometimes a simple problem will challenge you on something
you thought was well outside your comfort zone.
