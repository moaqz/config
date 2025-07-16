import moaqz from "eslint-config-moaqz";

export default [
  ...moaqz,
  {
    "ignores": [
      "packages/cli/index.js",
      ".eslint-config-inspector",
      ".dotfiles"
    ],
  }
];
