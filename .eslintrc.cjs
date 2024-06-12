module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    indent: ["off"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "class-methods-use-this": "off",
    "object-curly-spacing": ["error", "always"],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "off",
      {
        accessibility: "explicit",
        overrides: {
          constructors: "no-public",
        },
      },
    ],
    "react/react-in-jsx-scope": "off",
  },
};  
