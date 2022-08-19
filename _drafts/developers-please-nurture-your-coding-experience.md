---
title: Developers, please nurture your coding experience
tags: [productivity, workstation, mindset]
date: 2022-08-17
unsplash: https://unsplash.com/photos/Nw1Y7EAsrQk
---

Whether you are writing code for a living, or just enjoying it as a hobby, it is very likely you are spending a good portion of your day on a computer if you are reading this article. Actually, what I'm describing here not only applies to code, so keep going even if you are not a programmer.

I see writing code as an art. An art where we would each approach it from a different perspective, playing with the tools we are being offered. We all evolve at a different level of the stack. And yet, we conceptually all work very similarly: editing some code in a form or another to make the machines behave as we expect.

What is the only interface between you and the code you write? Your machine. Your workstation. Your work environment. That's what enabling you to write code.

I believe taking ownership of one's environment is a key facet of becoming a better engineer. Some people would argue it brings a productivity boost. While that might be true, I believe the main reason to get to know your environment is to move potential obstacles out of the way. And let your thoughts flow as efficiently as possible from your brain to your code. The productivity boost is a consequence, not a mean in itself.

We should all get to know our environments. Caring about it is not only beneficial for you. It is also beneficial for your coworkers and any person you will work with. Not only that, but it will give you a better intuition of what represents a good or bad environment, and that always comes handy.

Your journey has already begun. You already have a work environment. You already took inspiration from your peers. You are already using tools developed by people that happen to be improving their environment in a way that suits your needs.

I usually start by introspecting my workflow to identify pain points. Where are you wasting your time? Look at the tasks you are doing the most frequently, and try to optimize them. Look at the chores that feel the most daunting to you, and automate them away.

## Practical advices

**Don't make your stack complicated.** When you can, [choose simplicity over complexity](https://www.youtube.com/watch?v=SxdOUGdseq4). Find the smallest set of tools required to do the job. Remove the tools you don't need.

**Find ways to integrate your tools together.** Having a small set of tools that you master and know how to make them talk to each other is immensely useful, and very satisfying. The [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) applies here.

**Challenge your existing stack on a regular basis.**

**Keep digging for ways to improve it.**

**Know when to stop, but understand the limitations of your workflow.**

Get to know these tools really well, and find ways to integrate them together.

## My experience

I've started to code back in 2005. I was using Windows XP with Firefox and [Notepad++](https://notepad-plus-plus.org/) at the time. Over the years, I've gathered a lot of diverse experiences on various work environments. And I want to talk about a few situations which I've identified as problematic and improved in my workflow.

The first one I want to mention is about my keyboard. I found myself doing a lot of typos when typing, so I looked it up and tried to find a solution. The first thing that comes up on the topic is to learn to touch type (I couldn't recommend [keybr.com](https://www.keybr.com/) enough). But then my brain my tickled, if I'm ready to spend time to improve my typing skills, is there more I could do? It turns out you can, and long story short, I ultimately settled on using the [Colemak layout](https://colemak.com/).

The second one is about the feedback loop when working on Go and Rust projects. I was used to working with the Node.js ecosystem ([jest](https://jestjs.io/), [nodemon](https://github.com/remy/nodemon), [webpack](https://webpack.js.org/), etc) that natively integrates many ways to optimize the feedback loops (watching, reloading, hot-reloading, etc). I was missing this when I moved on working on different stacks, so I tried to find a way to replicate this. I have currently settled on using [watchexec](https://github.com/watchexec/watchexec) for this. And I've [aliased it to `w`](https://github.com/aymericbeaumet/dotfiles/blob/0d8dc7488ceae7262934ba17a5bf31b77a7264ff/.zshrc#L81) to make it convenient to use.

The third one is my shell. That is a piece of software I'm spending a good chunk of my day working with. I'm expecting it to be _blazingly_ fast. And a shell is actually fast by default. Just try for yourself and start zsh [without loading the configuration files](https://unix.stackexchange.com/a/585012/38682) to see how fast it is. I didn't want to compromise a rich prompt, but on the other hand, my shell was slow. So what to do? I began with an empty configuration file and only added the bits I needed. My [`~/.zshrc`](https://github.com/aymericbeaumet/dotfiles/blob/master/.zshrc) is only 200 lines of code and loading 3 plugins. I have also made the switch to [powerlevel10k](https://github.com/romkatv/powerlevel10k). And I'm now satisfied with my shell user experience.

The last one is about my current job. I'm working for [REKKI](https://rekki.com) as a Lead Platform Engineer, and part of my job is to design and improve the Developer Experience. In doing so, I'm letting the vision shared in this blog post infuse in my every day tasks. We've for example recently released an [in-house CLI](https://cli.rekki.team/) installed by default on all the engineers machines. It aims at solving several problems: including setting up the stack across all the machines (linux, macOS), making it easier to access and manipulate the cluster, and many other things.

I tried to keep them succinct, but each of those could be a blog post in itself. And I could continue over and over on other topics: learning how to debug and instrument my code, learning how not to use the mouse, learning how to master my editor ([nvim/init.lua](https://github.com/aymericbeaumet/dotfiles/blob/master/.config/nvim/init.lua)), learning how to use snippets, learning how to take notes efficiently, learning how to create impactful slides, etc. But it's not the point.

The point here is to show you the mindset: identify issues, find which one would have the biggest impact if fixed, and address them.

## Final words

We've seen why spending time on your work environment is important, along with some practical advices to help you shape it according to your own needs. We've also looked at some examples of how I applied these advices to improve my workflow over the past few years.

This is in the end a very personal experience, and is all about getting to know yourself. Introspection is key here: what works for you might not work for someone else, and vice versa. This is _your_ journey.

Give it time and you will be rewarded.