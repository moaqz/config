import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "cli/cli.js",
  output: {
    file: "cli/index.js",
    format: "es",
    compact: true,
  },
  plugins: [nodeResolve()]
};
