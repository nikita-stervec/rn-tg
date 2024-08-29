// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "prettier",
    "react-native",
    "eslint-plugin-react-compiler",
    "@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/ban-types": "off",
    "react/prop-types": "off",
    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin", "object"],
      },
    ],
  },
};
