import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhLocale from './lang/zh-CN'
import enLocale from './lang/en-US'
import frLocale from './lang/fr-FR'

Vue.use(VueI18n)

const messages = {
  'zh-CN': zhLocale,
  'en-US': enLocale,
  'fr-FR': frLocale
}

let defaultLocale = 'en-US'
for (let key in messages) {
  if (navigator && navigator.language === key) {
    defaultLocale = key
    break
  }
}

const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  messages
})

// Hot updates
if (module.hot) {
  module.hot.accept(['./lang/en-US', './lang/zh-CN', './lang/fr-FR'], function () {
    i18n.setLocaleMessage('zh-CN', require('./lang/zh-CN').default)
    i18n.setLocaleMessage('en-US', require('./lang/en-US').default)
    i18n.setLocaleMessage('fr-FR', require('./lang/fr-FR').default)
  })
}

export default i18n
