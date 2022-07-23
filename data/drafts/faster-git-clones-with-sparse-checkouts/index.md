---
title: Faster git clones with sparse checkouts
tags: [git]
date: 2022-07-23
---

We, at [REKKI](https://rekki.com), are working on a monorepo that contains all
the backend Go code for more than 100 services and jobs. As time goes by the
size of this repository increases, and the time it takes for an initial clone is
becoming noticeable.

While this is not really a problem on the engineers machines, this is impacting
automated systems that have to pull the codebase on a regular basis: like CIs,
CDs, or even our [local CLI](https://cli.rekki.team/).

## Shallow clones

The first approach you often take in a situation where the repository is too big
is shallow clone. The way you'd do a shallow clone is by specifying the
`--depth=1` option when invoking `git clone`.

```bash
git clone --depth=1 git@github.com:rekki/go.git
```

It is also possible to specify a _start date_ instead of a number of commits to
fetch. This is possible with the `--shallow-since=<date>` flag. `date` can
either be an absolute date or a relative date.

```bash
git clone --shallow-since='1 day' git@github.com:rekki/go.git
```

While shallow clones work well, they have the limitation to fetch all the files
in the working tree for the given commit.

## Sparse checkouts

Sparse checkouts solve that problem. They allow to partially checkout a working
tree. You can either specify a list of directories (called _cone mode_), or a
list of patterns. It is recommended to use the cone mode for performance
reasons.

This is what it looks like:

```bash
git clone --filter=blob:none --no-checkout --sparse git@github.com:rekki/go.git
cd go
git sparse-checkout set --cone go.mod go.sum cmd/rekki-cli pkg/rekki/errors
git checkout master
```

Let's go step by step:

1. `git clone`: initializes the git repository (but doesn't fetch any data)

   - `--filter=blob:none` instructs `git clone` not to fetch any blob object
     (the actual data)
   - `--no-checkout` instructs not to checkout _HEAD_
   - `--sparse` instructs to only checkout the top directory

2. `git sparse-checkout set`: enables the sparse settings, and specify which
   files should be tracked. In the example above, I'm only specifying the files
   that are required to build our internal CLI.

3. `git checkout master`: checkouts the actual branch or commit (in this case
   `master`), fetches the required objects and updates the filesystem
