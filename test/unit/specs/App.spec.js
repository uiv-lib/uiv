import Vue from 'vue'
import App from '@/App.vue'

describe('App', () => {
  it('should be able to render', () => {
    const Constructor = Vue.extend(App)
    let error = null
    try {
      new Constructor().$mount()
    } catch (e) {
      error = e
    } finally {
      expect(error).not.exist
    }
  })
})
