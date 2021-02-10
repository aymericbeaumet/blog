---
title: Bitten by lowercase path
tags: []
---

This:

```
v() {
  if (( $# == 0 )); then
    local path=$(fd --type file --hidden --exclude .git | fzf -0)
    if [ -z "$path" ]; then
      echo 'wow such empty' 1>&2
      return
    fi
    command nvim "$path"
  else
    command nvim "$@"
  fi
}
compdef v=nvim

```

Removed the `local` because of a shellcheck warning.

```
v() {
  if (( $# == 0 )); then
    path=$(fd --type file --hidden --exclude .git | fzf -0)
    if [ -z "$path" ]; then
      echo 'wow such empty' 1>&2
      return
    fi
    command nvim "$path"
  else
    command nvim "$@"
  fi
}
compdef v=nvim
```

But this overrides `$PATH`.

Renaming fixed:

```
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
