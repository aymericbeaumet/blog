---
title: The one letter aliases I cannot live without
tags: [shell, productivity, fzf]
---

I spent most of my days working in a terminal. And I've always spent time to
optimize my environment.

The direction in which I go is always to minimize the number of tools I use, but
to maximize their.

I try to identify what are the most efficient tools that can act as a
foundation, then combine these tools with some glue code.

In these case, the snippets of code below are built around
[fzf](https://github.com/junegunn/fzf). fzf is a _command-line fuzzy finder_
that is both fast and easy to use. When it comes to this kind of tools I'm
usually leaning toward using Rust implementations, but in this case the benefits
outweight the performance impact of staying with Go considering the size of my
file system.

_All these snippets are from my
[`.zshrc`](https://github.com/aymericbeaumet/dotfiles/blob/master/src/.zshrc). I
keep all my dotfiles on [GitHub](https://github.com/aymericbeaumet/dotfiles)._

In order to install these snippets, just copy them into your shell configuration
file. These have been written for and tested in zsh, but they should work
without any issue in bash.

# `d`

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

# `f`

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

# `g`

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

# `v`

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

# Bonus: `z`

I've already talked about z in a [previous
article](https://aymericbeaumet.com/behold-z-the-unsung-jewel-that-rethinks-shell-navigation).

```shell
unalias z &> /dev/null
z() {
  [ $# -gt 0 ] && _z "$*" && return
  cd "$(_z -l 2>&1 | fzf --nth 2.. +s --tac --query "${*##-* }" | sed 's/^[0-9,.]* *//')" || exit 1
}
```
