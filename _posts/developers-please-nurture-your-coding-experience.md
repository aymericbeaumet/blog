---
title: Developers, please nurture your coding experience
tags: [productivity, workstation, mindset]
date: 2022-08-19
unsplash: https://unsplash.com/photos/Nw1Y7EAsrQk
---

I see writing code as an art. An art where we would each approach from a
different perspective, playing with the tools we are being offered. We all
evolve at a different level of the stack. And yet, we all conceptually work very
similarly: editing some code in a form or another to make the machines behave as
we expect.

What is the only interface between you and the code you write? Your machine.
Your workstation. Your work environment. Your workflow. There are different ways
to name it, but ultimately that's what enabling you to write code.

I believe taking complete ownership of one's environment is a key attribute of
becoming a better engineer. Some people would argue it brings a productivity
boost. While that might be true, I think the main reason to get to know your
environment is to move potential obstacles out of the way. To let your thoughts
flow efficiently from your brain to code. The productivity boost is a
_consequence_, not a mean in itself.

We should all get to know our environments. Caring about it is not only
beneficial for you. It is also beneficial for your coworkers and any person you
work with. Not only that, but it will give you a better intuition of what
represents a good or bad environment, and that always comes handy.

The good news is: your journey has already begun. You already have a work
environment. You already took inspiration from your peers. You are already using
tools developed by people that happen to be improving their environment in a way
that suits your needs. So where should you go next?

## Pursue your journey

I usually start by introspecting my workflow to identify pain points. It is
often harder said than done, especially because our brain is excellent at
_accepting_ a current situation as long as we've been exposed to it long enough.
And that's still the case even if there are significant improvements waiting for
us down the road.

Introspection could happen in the form of self-assessing questions like:

- what are my most frequent tasks?
- where am I wasting my time?
- what are the most tedious tasks I have to do on a regular basis?
- which inconsistencies can I find in my workflow?
- what is slowing me down?

All of these questions will help you find potential directions for improvements.

While working on this article, I was wondering about what would be the
fundamental concepts if I were to distillate my mindset into key points. I found
5 of them:

1. **Keep your stack simple.** When you can,
   [choose simplicity over complexity](https://www.youtube.com/watch?v=SxdOUGdseq4).
   Find the smallest set of tools required to do the job and consolidate your
   workflow around them. Remove the tools you don't need.

2. **Don't let your stack get obsolete.** Challenge your existing stack on a
   regular basis. Make sure you keep your tools up-to-date. Do not miss out on
   the latest opportunities brought by modern tooling.

3. **Integrate your tools together.** Having a small set of tools that you
   master and make them talk to each other is immensely useful. The
   [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) applies
   here. By design, it is easier to follow this principle when working in a
   terminal.

4. **Practice is essential.** Getting to know your tooling is all down to
   practice. Learn the shortcuts. Learn how they behave. You need to deeply
   understand these tools, so they become an extension of yourself.

5. **Stability is key.** This is a never ending journey, and you should always
   keep digging for ways to improve. But also know when to pause. Your habits
   and muscular memory will be impacted if you change your stack too often.

Applying these concepts has been my rock over all these years. Sticking to this
will slowly but steadily bring you to a better place.

## Concrete examples

I've started to code back in 2005. I was using Windows XP, Firefox, and
[Notepad++](https://notepad-plus-plus.org/) at the time. At that time the
concept of productivity didn't even cross my mind. Over the years, I've gathered
experiences in various environments (mainly Linux and macOS). I want to talk
about a few situations which I've identified as problematic and improved in my
workflow.

The first one I want to mention is about my keyboard. _What is slowing me down?_
Well, I found myself doing a lot of typos when typing. I had to stop my flow,
correct the error, and start typing again. So I looked it up and tried to find
solutions. The first thing that comes up on the topic is to learn how to touch
type (I couldn't recommend [keybr.com](https://www.keybr.com/) enough). But then
my brain was tickled: if I'm ready to spend time to improve my typing skills, is
there more I could do? It turns out I could, and long story short, I ultimately
settled on learning to touch type with the [Colemak](https://colemak.com/)
layout. It's been so since 2015, and I couldn't be happier.

The second one is about the feedback loop when working on Go and Rust projects.
_Where am I wasting my time?_ I was used to working with the Node.js ecosystem
([jest](https://jestjs.io/), [nodemon](https://github.com/remy/nodemon),
[webpack](https://webpack.js.org/), etc) that natively integrates many ways to
optimize the feedback loop (watching, reloading, hot-reloading, etc). I was
manually restarting my programs and tests when working on Go and Rust projects,
so I tried to find a way to replicate this. I have currently settled on using
[watchexec](https://github.com/watchexec/watchexec) that is a general purpose
watcher. And I've
[aliased it to `w`](https://github.com/aymericbeaumet/dotfiles/blob/0d8dc7488ceae7262934ba17a5bf31b77a7264ff/.zshrc#L81)
to make it convenient to use.

The third one is my shell. _What are my most frequent tasks?_ Well that is a
software I'm using all day long, so I have high performance expectation. I want
it to be _blazingly_ fast, and it was not the case. Startup time as well as
printing the prompt was slow. A basic shell is actually fast by default. Just
try for yourself: start zsh
[without loading the configuration files](https://unix.stackexchange.com/a/585012/38682)
to see how fast it is. I didn't want to compromise on a rich prompt, but on the
other hand, my shell was slow. So what to do? I began with an empty
configuration file and only added the bits I needed. My
[`~/.zshrc`](https://github.com/aymericbeaumet/dotfiles/blob/master/.zshrc) is
200 lines of code and loading 4 plugins. I have also made the switch to
[powerlevel10k](https://github.com/romkatv/powerlevel10k). And I'm now satisfied
with my shell user experience.

The last one is a story happening at my current job. I'm working for
[REKKI](https://rekki.com) as a Lead Platform Engineer, and part of my team's
mission is to design and improve the Developer Experience. In doing so, I'm
letting the vision shared in this blog post infuse in my every day work. _What
are the most tedious tasks I have to do on a regular basis?_ Well, setting up
the stack for all the engineers working at REKKI was getting more and more
painful. So we've released an [internal CLI](https://cli.rekki.team/) that does
this for us, installed by default on all the engineers machines.

Each of those examples could be a blog post in itself. And I could continue over
and over on other topics: learning how to debug and instrument my code, learning
how not to use the mouse, learning how to master my editor
([nvim/init.lua](https://github.com/aymericbeaumet/dotfiles/blob/master/.config/nvim/init.lua)),
learning how to use snippets, learning how to take notes efficiently, learning
how to create impactful slides, etc. But it's not the point.

The point here is to show you the mindset: identify issues, find which one would
have the biggest impact if fixed, and address them.

## Final words

We've seen why spending time on your work environment is important, along with
some practical advices to help you shape it according to your own needs. We've
also looked at some examples of how I applied these advices to improve my
workflow over the past few years.

This is in the end a very personal experience, and is all about getting to know
yourself. Introspection is key here: what works for you might not work for
someone else, and vice versa. This is _your_ journey, and I hope this post
inspired you to revisit your work environment. I'd love to hear how you improved
your workflow.

Give it time, and you will be rewarded.
