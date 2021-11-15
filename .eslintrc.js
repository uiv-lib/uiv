// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  // required to lint *.vue files
  plugins: ['html'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-expressions': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-v-html': 0,
  },
}
