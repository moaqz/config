import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "cli.js",
  output: {
    file: "index.js",
    format: "es",
    compact: true,
  },
  plugins: [nodeResolve()]
};
