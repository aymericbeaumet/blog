---
title: "Gors: an experimental Go compiler"
category: project
tags: [rust, go, parser, compiler]
date: 2021-01-01
github: aymericbeaumet/gors
---

I'm a big fan of Go. I find that its pragmatism makes it extremely pleasant to
use. Its expressiveness and simplicity enable me to project the way I think into
an implementation that just works.

I'm also a huge fan of Rust for different reasons, but mostly performance and
robustness. And while the Rust compiler has immensely improved over the last few
years, I sometimes feel like I'm fighting it (but somehow I like it).

I've always wanted to have a better understanding of the Go internals. I've read
the language specification, but I wanted to go further. And what would be a
better way to do it than actually implementing a Go compiler?

This is why I have started to work on
[gors](https://github.com/aymericbeaumet/gors). Gors is a Go to Rust compiler.
The ultimate goal would be to allow accessing the rich Go ecosystem from Rust.

I don't have the pretension (nor the time, nor the skills) to write a full-blown
Go compiler alone, but that is still a tremendous educative means.

The project is currently at a state where it has a 100% compliant lexer
(including compiler directives), a mostly compliant parser, and working code
generation. The generated AST allows running passes to perform various code
optimizations and inlining.

The whole project can run in the browser, this is done by compiling the compiler
to a WASM target. You can give it a try in the
[experimental editor](https://aymericbeaumet.github.io/gors/).
