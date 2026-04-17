import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      import: (await import("eslint-plugin-import")).default,
      "simple-import-sort": (await import("eslint-plugin-simple-import-sort"))
        .default,
      "sort-destructure-keys": (
        await import("eslint-plugin-sort-destructure-keys")
      ).default,
      prettier: (await import("eslint-plugin-prettier")).default,
    },

    rules: {
      // ✅ Sorts import declarations between groups
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "never",
        },
      ],

      // ✅ Sorts export statements (e.g., export * from or export { Foo })
      "simple-import-sort/exports": "error",

      // ✅ Sorts members inside curly braces (e.g., { A, B, C })
      "sort-destructure-keys/sort-destructure-keys": [
        "error",
        { caseSensitive: false },
      ],

      // ✅ Enforces Prettier rules as errors
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          endOfLine: "auto",
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
  },
];

export default eslintConfig;
