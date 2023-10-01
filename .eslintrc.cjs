module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    greasemonkey: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:wc/recommended',
    'plugin:lit/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'no-console': 'warn',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'off',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  ignorePatterns: ['node_modules', 'dist'],
};
