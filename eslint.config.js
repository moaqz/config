import moaqz from "eslint-config-moaqz";

export default [
  ...moaqz,
  {
    rules: {
      "@stylistic/space-before-function-paren": "off",
      "no-console": "off"
    }
  }
];
