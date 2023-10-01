module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    greasemonkey: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
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
  plugins: ['import', '@typescript-eslint', 'react-refresh'],
  rules: {
    'no-console': 'warn',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
  },
  ignorePatterns: ['node_modules', 'dist'],
};
