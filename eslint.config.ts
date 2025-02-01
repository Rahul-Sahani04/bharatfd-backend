import { Linter } from "eslint";

const config: Linter.Config = {
  settings: {
    env: {
      browser: true,
      es2021: true,
      node: true,
      mocha: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
    ignorePatterns: ["node_modules/", "dist/"],
  },
};

export default config;
