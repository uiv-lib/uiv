module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  plugins: ['html'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
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
    'vue/multi-word-component-names': 0,
    'vue/no-v-html': 0,
  },
};
