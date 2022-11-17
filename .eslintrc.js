module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  globals: {
    browser: true,
    dappPage: true,
    extensionPage: true,
    AlgoSigner: true,
    algorand: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'error',
    'no-var': 'warn',
    'no-prototype-builtins': 'warn',
    '@typescript-eslint/no-this-alias': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          'Function': false,
          'Object': false,
          'object': false,
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
  },
  overrides: [
    {
      files: ['packages/**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
