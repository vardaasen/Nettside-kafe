import { FlatCompat } from '@eslint/eslintrc';
import * as path from 'path';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import js from '@eslint/js'; // Import default export

const { configs: eslintConfigs } = js; // Destructure configs

const compat = new FlatCompat({
  baseDirectory: path.resolve(),
  recommendedConfig: eslintConfigs.recommended, // Use the recommended config
});

export default [
  {
    // Specify folders to ignore
    ignores: ['node_modules/**', 'scratch/**', 'src/version.js'],

    // Include browser globals if needed
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  // Extend 'google' and 'plugin:prettier/recommended'
  ...compat.extends(
    'eslint:recommended',
    'google',
    'plugin:prettier/recommended',
  ),
  // Override rules and include custom ESLint rules
  {
    rules: {
      // Disable deprecated rules from Google config
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',

      // Custom ESLint rules
      curly: ['error', 'all'], // Require curly braces for all control statements
      'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multiline object literals
      'linebreak-style': ['error', 'unix'], // Unix-style line breaks (LF)
      'no-unused-vars': ['off'], // Warn on unused variables
      'no-undef': ['off'],
      'no-var': 'error', // Disallow var, use let and const instead
      'prefer-const': 'error', // Prefer const over let where possible
      'arrow-spacing': ['error', { before: true, after: true }], // Enforce spaces around arrow functions
      'brace-style': ['error', '1tbs', { allowSingleLine: true }], // K&R style (1tbs)

      // Include Prettier settings
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          printWidth: 80,
          proseWrap: 'preserve',
          parser: 'flow',
        },
      ],
    },
  },
];
