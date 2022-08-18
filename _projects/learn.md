---
title: "Learn: teaching programming via JavaScript"
category: project
tags: [javascript, svelte, sveltekit, vscode]
date: 2022-01-01
website: https://learn.aymericbeaumet.com
---

I was wondering how hard it would be to setup a basic teaching environment so I can write lessons to teach my relatives how to code. This website is an experimental result.

The code is parsed, the AST is manipulated to prepare the code, and then serialized so it can be evaluated in the context of the browser. The live state of the variables is available in an inspector so it is easier to understand what is happening.