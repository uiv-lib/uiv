import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    // app.component('MyGlobalComponent' /* ... */)
  }
}