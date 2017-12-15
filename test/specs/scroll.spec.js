import scroll from '@src/directives/scroll'
import Vue from 'vue'

const HANDLER = '_uiv_scroll_handler'

describe('scroll directive', () => {
  it('should be able to bind scroll function', async () => {
    const res = Vue.compile('<div v-scroll="onScroll"></div>')
    const vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      directives: {scroll},
      methods: {
        onScroll () {
          // TODO
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).to.equal(vm.onScroll)
    vm.$destroy()
  })

  it('should not bind non-function value', async () => {
    const res = Vue.compile('<div v-scroll="msg"></div>')
    const vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      directives: {scroll},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).not.exist
    vm.$destroy()
  })

  it('should be able to get with fail callback', async () => {
    const res = Vue.compile('<div v-scroll="msg"></div>')
    const vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      directives: {scroll},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).not.exist
    vm.msg = 'test'
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).not.exist
    vm.$destroy()
  })
})
