#! /bin/bash

sudo apt update -y
sudo apt install -y bash sudo wget git locales build-essential \
  vim less catimg tldr curl man htop \
  unzip zip bzip2 woff2 file

tldr -u

# Node
curl -fsSL https://get.pnpm.io/install.sh | bash
source ~/.bashrc
pnpm env use --global lts

# Paths
{
  echo ''
  echo '# Paths'
  echo 'export PATH=$PATH:/usr/local/bin'
  echo 'export PATH=$PATH:$HOME/.local/bin'
} >> ~/.bashrc
source ~/.bashrc

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.bashrc
