---
title: Faster git clones with sparse checkouts
tags: [git, performance]
thumbnail: ./thumbnail.jpg
date: 2022-07-23
---

We at [REKKI](https://rekki.com) are working on a monorepo that contains all the
backend Go code for dozens of services and jobs. As time goes by, the size of
this repository increases and the time it takes for an initial clone becomes
noticeable.

While this is not really a problem on the engineers' workstations, this is
impacting automated systems that have to download the codebase regularly: like
CIs, CDs, or even our in-house [CLI](https://cli.rekki.team/).

Our CLI often needs to pull a fresh version of a specific commit from the Go
codebase so that it can perform beta updates when our engineers request it
(e.g.: to test new features that are not yet released). Cloning the Go
repository entirely every time they want to install a beta update is not an
option as it takes more than a minute on a good connection.

## Shallow clones

The first approach you often take in a situation where the repository is too big
is to shallow clone. That is actually very common in the world of CIs
([GitHub Actions](https://github.com/actions/checkout) does it by default). The
way you'd do a shallow clone is by specifying the `--depth=<n>` flag to the
`git clone` command, hence limiting the number of commits to pull starting from
the HEAD:

```bash
# fetch the latest commit only
git clone --depth=1 git@github.com:rekki/go.git
```

It is also possible to specify a _start date_ instead of a number of commits to
fetch. This is possible with the `--shallow-since=<date>` flag (`date` can
either be an absolute date or a relative date):

```bash
# fetch the last day of commits only
git clone --shallow-since='1 day' git@github.com:rekki/go.git
```

While shallow clones work well in some contexts, they fall short by always
downloading all the files in the working tree for the given commit. So even
specifying a depth of 1 results in non-negligible clone times for massive
repositories (in the case of our Go monorepo, this still takes 30 seconds).

## Sparse checkouts

Sparse checkouts solve that problem by allowing to partially checkout a working
tree. You can either specify a list of directories (in what's called _cone
mode_) or a list of patterns (ala _.gitignore_). It is recommended to use the
cone mode for performance reasons.

This allows you only to download the files you need for the task you want to
perform. In our case, we wanted only to download the files required to build our
CLI. This is what it looks like:

```bash
git clone --filter=blob:none --no-checkout git@github.com:rekki/go.git
cd go
git sparse-checkout set --cone go.mod go.sum cmd/rekki-cli pkg/rekki/errors
git checkout master
```

Let's explain step by step:

1. `git clone`:

   - `--filter=blob:none`: instructs not to fetch any blob object (see the
     [git book](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects))
   - `--no-checkout`: instructs not to automatically checkout _HEAD_

2. `git sparse-checkout set`: enables the sparse checkout settings and specifies
   which files should be checked out.

3. `git checkout master`: checkouts the actual branch or commit (in this case,
   the `master` branch) and fetches the objects matching the sparse patterns.

This approach allowed us to reduce the end-to-end time to clone to less than 5
seconds.

## Conclusion

Using sparse checkouts is a bit more involved in commands you have to execute,
but it allows for more control over the files you will download on your local
filesystem. You don't always need the entirety of a git repository, and sparse
checkouts allow you to pick what you need granularly.
