import neostandard from "neostandard";
import unicorn from "eslint-plugin-unicorn";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";

/**
 * @see https://eslint.style/packages/default
 */
const STYLISTIC_RULES = {
  "@stylistic/quotes": ["error", "double"],
  "@stylistic/semi": ["error", "always"],
  "@stylistic/quote-props": ["error", "consistent"],
};

/**
 * @see https://eslint.org/play/
 */
const ESLINT_RULES = {
  "prefer-template": "error",
};

/**
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
 */
const UNICORN_CONFIG = {
  ...unicorn.configs["flat/recommended"],
  "plugins": { unicorn },
  "rules": {
    "unicorn/consistent-empty-array-spread": "error",
    "unicorn/error-message": "error",
    "unicorn/number-literal-case": "error",
    "unicorn/prefer-includes": "error",
    "unicorn/prefer-node-protocol": "error",
    "unicorn/prefer-number-properties": "error",
    "unicorn/prefer-string-starts-ends-with": "error",
    "unicorn/prefer-type-error": "error",
    "unicorn/throw-new-error": "error",

    /** DOM */
    "unicorn/prefer-dom-node-text-content": "error",
    "unicorn/prefer-modern-dom-apis": "error",
    "unicorn/prefer-query-selector": "error",

    /** Avoid */
    "unicorn/no-nested-ternary": "off",
    "unicorn/no-array-push-push": "error",
    "unicorn/no-for-loop": "error",
    "unicorn/no-instanceof-array": "error",
    "unicorn/new-for-builtins": "error",
    "unicorn/no-new-array": "error",
    "unicorn/no-new-buffer": "error",
    "unicorn/no-invalid-fetch-options": "error",
    "unicorn/no-this-assignment": "error",
    "unicorn/no-unnecessary-await": "error",
    "unicorn/no-negation-in-equality-check": "error",
  }
};

/**
 * @see https://html-eslint.org/
 */
const HTML_CONFIG = {
  ...html.configs["flat/recommended"],
  files: ["**/*.html"],
  plugins: {
    "@html-eslint": html,
  },
  languageOptions: {
    parser: htmlParser,
  },
  rules: {
    ...html.configs["flat/recommended"].rules,
    "@html-eslint/indent": ["error", 2],
    "@html-eslint/no-inline-styles": "error",
    "@html-eslint/no-target-blank": "error",
    "@html-eslint/require-attrs": [
      "error",
      { tag: "img", attr: "alt" },
      { tag: "svg", attr: "viewBox" },
    ],
  }
};

export default [
  ...neostandard(),
  UNICORN_CONFIG,
  HTML_CONFIG,
  {
    "rules": {
      ...STYLISTIC_RULES,
      ...ESLINT_RULES,
    },
  },
];
