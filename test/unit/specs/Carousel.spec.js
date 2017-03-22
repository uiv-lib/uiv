import Vue from 'vue'
import Carousel from '@/components/carousel/Carousel.vue'
import Slide from '@/components/carousel/Slide.vue'

describe('Carousel', () => {
  it('should not be able to work if not using <carousel><slide>...</slide></carousel>', () => {
    let _error = window.console.error
    window.console.error = () => {
      // Silent to remove out logs in terminal
    }
    try {
      let spy = sinon.spy(window.console, 'error')
      let res = Vue.compile('<carousel><slide><slide>{{ msg }}</slide></slide></carousel>')
      let vm = new Vue({
        data () {
          return {
            msg: 'hello'
          }
        },
        components: {Carousel, Slide},
        render: res.render,
        staticRenderFns: res.staticRenderFns
      })
      vm.$mount()
      sinon.assert.called(spy)
    } finally {
      window.console.error = _error
    }
  })

  it('should be ok if no <slide> present in <carousel>', () => {
    let res = Vue.compile('<carousel>{{msg}}</carousel>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Carousel, Slide},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$destroy()
  })
})
