import DefaultTheme from 'vitepress/theme'
import * as uiv from '../../../src/index'
import './theme.less'
import RouterLink from '../stubs/RouterLink.vue'

const modules = import.meta.globEager('../components/**/*.vue')
const components = []

for (const path in modules) {
  const component = modules[path].default
  const split = path.split('/')
  component.name = `${split[2]}-${split[3].replace('.vue', '')}`
  components.push(modules[path].default)
}

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(uiv)
    // register example components
    components.forEach((component) => {
      app.component(component.name, component)
    })

    app.component('RouterLink', RouterLink)
  },
}
