This project stores all my configuration files and utilities to make it easy to copy settings between projects. It’s organized into directories, each serving a different purpose:

- **`config`**: Contains configuration files such as VSCode settings or ESLint configs. It also includes a registry.json file, which lists the dependencies required to install and use each configuration.

- **`cli`**: A utility tool that reads from registry.json, installs the necessary dependencies, and copies the configuration files where needed.

- **`eslint`**: My personal ESLint configuration, exported as an npm package.

## How to install the CLI

```sh
sudo curl -s https://raw.githubusercontent.com/moaqz/config/main/cli/index.js -o /usr/local/bin/moaqz-config
sudo chmod ugo+rx /usr/local/bin/moaqz-config
```
