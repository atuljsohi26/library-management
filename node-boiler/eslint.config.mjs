import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import'; // Import plugin for ES modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  // ...compat.extends('prettier'),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha
      },

      parser: babelParser,
      ecmaVersion: 2021,
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false
      }
    },
    plugins: {
      import: importPlugin // Properly define import plugin
    },
    rules: {
      // ESLint Recommended Rules
      ...js.configs.recommended.rules,
      // Custom Rules
      'no-console': '',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      curly: 'error',
      'no-debugger': 'error',
      'no-undef': 'error',
      'consistent-return': 'error',
      'no-redeclare': 'error',
      indent: ['error', 2],
      'arrow-parens': ['error', 'as-needed'],

      'max-len': [
        'error',
        {
          code: 200
        }
      ],

      'prefer-destructuring': [
        'error',
        {
          object: true,
          array: false
        }
      ],

      quotes: ['error', 'single'],
      'linebreak-style': 'off',
      'eol-last': ['error', 'always'],
      'lines-between-class-members': ['error', 'always'],
      'operator-linebreak': ['error', 'before'],
      'max-classes-per-file': ['error', 1],

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1
        }
      ],

      'function-paren-newline': ['error', 'consistent'],
      'function-call-argument-newline': ['error', 'consistent'],
      'implicit-arrow-linebreak': ['error', 'beside'],
      'no-nested-ternary': 'off',
      'no-useless-escape': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn'
    }
  }
];
