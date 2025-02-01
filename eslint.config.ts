import { Linter } from 'eslint';

const config: Linter.Config = {
  root: true,
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // ES6+ best practices
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
    'prefer-template': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'no-var': 'error',

    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'prefix': ['I']
      },
      {
        'selector': 'typeAlias',
        'format': ['PascalCase'],
        'prefix': ['T']
      }
    ],

    // Code style
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'object-curly-spacing': ['error', 'always'],

    // Error prevention
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'no-return-await': 'error',
    'require-await': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

