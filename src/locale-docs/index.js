import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zhLocale from './../locale/lang/zh-CN'
import enLocale from './../locale/lang/en-US'

Vue.use(VueI18n)

const messages = {
  'zh-CN': zhLocale,
  'en-US': enLocale
}

const i18n = new VueI18n({
  locale: 'en-US',
  messages
})

export default i18n
