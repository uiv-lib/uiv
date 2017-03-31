import Vue from 'vue'
import Alert from '@/components/alert/Alert.vue'

describe('Alert', () => {
  it('can add a alert has no type', (done) => {
    let res = Vue.compile('<Alert>{{ msg }}</Alert>')
    let vm = new Vue({
      data () {
        return {
          msg: 'This is a alert!'
        }
      },
      components: {Alert},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$nextTick(() => {
      expect(vm.$el.className).to.equal('alert alert-success')
      done()
    })
  })
})
