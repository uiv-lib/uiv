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
      vm.$destroy()
    } finally {
      window.console.error = _error
    }
  })

  it('should not be able to work with v-model', (done) => {
    let res = Vue.compile('<carousel v-model="index"><slide>1</slide><slide>2</slide></carousel>')
    let vm = new Vue({
      data () {
        return {
          index: 1
        }
      },
      components: {Carousel, Slide},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
      expect(vm.$el.querySelectorAll('.carousel-inner .item')[1].className).to.contain('active')
      vm.$el.querySelector('.carousel-control.right').click()
      setTimeout(() => {
        expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
        expect(vm.$el.querySelectorAll('.carousel-inner .item')[0].className).to.contain('active')
        expect(vm.index).to.equal(0)
        vm.$destroy()
        done()
      }, 700)
    })
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
