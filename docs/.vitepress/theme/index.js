import DefaultTheme from 'vitepress/theme'
import * as uiv from '../../../src/index'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(uiv)
    // register global components
    // app.component('MyGlobalComponent' /* ... */)
  }
}