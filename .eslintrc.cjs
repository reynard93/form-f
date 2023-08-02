// https://typescript-eslint.io/getting-started/
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  "globals": {
    "describe": "readonly",
    "it": "readonly",
    "expect": "readonly",
    "beforeEach": "readonly",
    test: "readonly",
    // ... add any other global functions you are using
  },
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:vitest/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
