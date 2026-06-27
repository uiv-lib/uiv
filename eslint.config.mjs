import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default [
  {
    ignores: ['**/*.md', 'docs/.vitepress/dist/**'],
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettierRecommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-empty': 'off',
    },
  },
  {
    files: ['src/**/*', 'build/**/*', 'docs/.vitepress/**/*'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  },
  {
    files: ['**/*.spec.js', 'src/__test__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
