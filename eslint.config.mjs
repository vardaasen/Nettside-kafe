import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      'comma-dangle': ['error', 'always-multiline'], // ikke klag på komma, men klag på at det mangler
      indent: ['error', 2], // Indentation with 2 spaces
      'linebreak-style': ['error', 'unix'], // Unix-style line breaks (LF)
      quotes: ['error', 'single'], // Use double quotes for strings
      semi: ['error', 'always'], // Always use semicolons
      'no-unused-vars': ['warn'], // Warn on unused variables
      'no-console': 'off', // Allow console statements
      eqeqeq: ['error', 'always'], // Require === and !==
      curly: ['error', 'all'], // Require curly braces for all control statements
      'no-var': 'error', // Disallow var, use let and const instead
      'prefer-const': 'error', // Prefer const over let where possible
      'arrow-spacing': ['error', { before: true, after: true }], // Enforce spaces around arrow function
      // 'comma-dangle': ['error', 'never'], // Disallow trailing commas
      'space-before-blocks': ['error', 'always'], // Require space before blocks
      'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Require spaces after colons in object literals
      'brace-style': ['error', '1tbs', { allowSingleLine: true }], // K&R style (1tbs)
    },
  },
];
