---
title: The one letter aliases I cannot live without
tags: [shell, productivity, fzf]
---

I spend the biggest part of my day working in a terminal. I find the terminal to
be a fantastic way to maximize your efficiency. The limitations you face are
constraints that push you towards ... In this quest to find the work environment
that suits you best you might sometimes find yourself into a "gluttony" of new
tools, and getting a hard time actually deeply apprehending what they offer.

While I like to optimize my environment, my mindset is always to minimize the
number of tools I use. A restricted set of tools that are greatly integrated is
more powerful in the long run than some specialized tools that harly integrate
into your workflow.

In this post I'm not going to sell you dozens of new tools that will magically
improve your workflow. Instead I will recommend you one tool and give you a few
ways to actually integrate it within your environment.

Needless to say integrating a new tool in my workflow is not something that
happens regularly. And after years and years the number of tools I use is in the
end very limited. That being said, I try to get the most out of the tools I have
selected.

In these case, the snippets below are built around
[fzf](https://github.com/junegunn/fzf). fzf is a _command-line fuzzy finder_
that is both fast and easy to use. When it comes to this kind of tools I'm
usually leaning toward using Rust implementations, but in this case the benefits
outweight the performance impact of staying with Go considering the size of my
file system.

In order to use these snippets, just copy them into your shell configuration
file and source it ([_"A little copying is better than a little
dependency."](https://www.youtube.com/watch?v=PAAkCSZUG1c&t=9m28s)). For example
if you use zsh, you might append those at the end of your `~/.zshrc`. Note that
these have been written for and tested in zsh, but they should work without any
issue in bash.

## `d`

```shell
d() {
  dirpath=$(fd --type directory --hidden --exclude .git | fzf -0)
  if [ -z "$dirpath" ]; then
    echo 'wow such empty' 1>&2
    return
  fi
  cd "$dirpath" || exit 1
}
```

## `f`

```shell
f() {
  filepath=$(fd --type file --hidden --exclude .git | fzf -0)
  if [ -z "$filepath" ]; then
    echo 'wow such empty' 1>&2
    return
  fi
  echo "$filepath"
}
```

## `g`

```shell
g() {
  if (( $# == 0 )); then
    command hub status -sb
  else
    command hub "$@"
  fi
}
compdef g=git
```

## `v`

```shell
v() {
  if (( $# == 0 )); then
    filepath=$(fd --type file --hidden --exclude .git | fzf -0)
    if [ -z "$filepath" ]; then
      echo 'wow such empty' 1>&2
      return
    fi
    command nvim "$filepath"
  else
    command nvim "$@"
  fi
}
compdef v=nvim
```

## Bonus: `z`

I've already talked about z in a [previous
article](https://aymericbeaumet.com/behold-z-the-unsung-jewel-that-rethinks-shell-navigation).

```shell
unalias z &> /dev/null
z() {
  [ $# -gt 0 ] && _z "$*" && return
  cd "$(_z -l 2>&1 | fzf --nth 2.. +s --tac --query "${*##-* }" | sed 's/^[0-9,.]* *//')" || exit 1
}
```

_All these snippets are from my
[`.zshrc`](https://github.com/aymericbeaumet/dotfiles/blob/master/src/.zshrc).
Also, I keep all my dotfiles synced on
[GitHub](https://github.com/aymericbeaumet/dotfiles), feel free to wondew there,
you might find a few things you could grab for your own configs._

I hope you enjoyed it and that some of these tips will get into your day-to-day
workflow. Am I missing anything that you consider is your best tip for
productivity in the terminal? Please get in touch, I'm always looking forward
adjusting my workflow.
