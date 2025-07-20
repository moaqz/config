## What's Inside?

The project is organized into directories, each serving a specific purpose:

- **`.dotfiles/`**: Contains essential configuration files (`dotfiles`) tailored to my Debian system.

- **`packages/`**:
  - **`eslint-config-moaqz`**: My personal ESLint configuration. You can see a list of all included rules [Here](https://moaqz-eslint-config.vercel.app/).
  - **`registry`**: Holds a collection of common development packages, their dependencies, and associated scripts.
  - **`cli`**: A command-line utility that reads the `registry`. It automates the process of installing necessary dependencies and copying configuration files to their respective locations simplifying project setup.

## Quick Start: Install the CLI

```sh
sudo curl -s https://raw.githubusercontent.com/moaqz/config/main/packages/cli/index.js -o /usr/local/bin/moaqz-config
sudo chmod ugo+rx /usr/local/bin/moaqz-config
```
