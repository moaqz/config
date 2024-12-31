This repository stores all my configuration files, making it easy to copy settings between projects.

## What’s Inside?

- A **registry** (`config/registry.json`) that links all configurations and their dependencies, like ESLint.
- A **CLI tool** you can install to manage and apply configurations quickly.

## Motivation

I wanted an easy way to:

- Keep all my configurations in one place.
- Copy and apply settings across different projects.
- Save time when setting up new environments.

# How to Install

```sh
sudo curl -s https://raw.githubusercontent.com/moaqz/config/main/src/index.js -o /usr/local/bin/moaqz-config
sudo chmod ugo+rx /usr/local/bin/moaqz-config
```
