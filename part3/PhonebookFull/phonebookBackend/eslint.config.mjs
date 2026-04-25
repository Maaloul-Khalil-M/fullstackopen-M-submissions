import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2], // enforce 2-space indentation
      "@stylistic/js/linebreak-style": ["error", "unix"], // enforce LF (Unix) line endings
      eqeqeq: "error", // require strict equality
      "no-trailing-spaces": "error", // disallow spaces at the end of lines
      "object-curly-spacing": ["error", "always"], // require spaces inside object braces
      "arrow-spacing": ["error", { before: true, after: true }], // enforce spacing around arrow function =>
      "no-console": "off", // allow console.log and other console methods
      "@stylistic/js/semi": ["error", "never"], // disallow semicolons
    },
  },
  {
    ignores: ["dist/**"],
  },
];
