import Vue from 'vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'

describe('Tabs', () => {
  it('should not be able to work if not using <tabs><tab>...</tab></tabs>', () => {
    let _error = window.console.error
    try {
      let spy = sinon.spy(window.console, 'error')
      let res = Vue.compile('<tabs><tab><tab>{{ msg }}</tab></tab></tabs>')
      let vm = new Vue({
        data () {
          return {
            msg: 'hello'
          }
        },
        components: {Tab, Tabs},
        render: res.render,
        staticRenderFns: res.staticRenderFns
      })
      vm.$mount()
      sinon.assert.called(spy)
    } finally {
      window.console.error = _error
    }
  })

  it('should be ok if not <tab> present in <tabs>', () => {
    let res = Vue.compile('<tabs>{{msg}}</tabs>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tab, Tabs},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$destroy()
  })
})
