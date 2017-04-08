import Vue from 'vue'
import Popover from '@/components/popover/Popover.vue'

describe('Popover', () => {
  it('should be ok if no trigger present', (done) => {
    const Constructor = Vue.extend(Popover)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$destroy()
      done()
    })
  })

  it('should throw error if trigger invalid', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let res = Vue.compile('<popover trigger="xxx"><button data-role="trigger"></button></popover>')
    let vm = new Vue({
      components: {Popover},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    try {
      vm.$mount('#app')
    } catch (e) {
      expect(e).to.exist
    } finally {
      app.remove()
      done()
    }
  })
})
