import Vue from 'vue'
import Carousel from '@src/components/carousel/Carousel.vue'
import Slide from '@src/components/carousel/Slide.vue'
import CarouselDoc from '@docs/pages/components/Carousel.md'

describe('Carousel', () => {
  let app

  beforeEach(() => {
    app = new Vue({
      template: '<CarouselDoc ref="doc"/>',
      components: {CarouselDoc}
    })
  })

  afterEach(() => {
    try {
      app.$destroy()
    } catch (err) {
      // Silent
    }
  })

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

  it('should be able to render correct contents on init', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item').length).to.equal(4)
      expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li').length).to.equal(4)
      expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-control').length).to.equal(2)
      expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[0].className).to.contain('active')
      done()
    })
  })

  it('should be able to go next on right control click', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$refs.carousel.$el.querySelector('.carousel-control.right').click()
      setTimeout(() => {
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[1].className).to.contain('active')
        done()
      }, 700)
    })
  })

  it('should be able to go prev on left control click', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$refs.carousel.$el.querySelector('.carousel-control.left').click()
      setTimeout(() => {
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[3].className).to.contain('active')
        vm.$refs.carousel.$el.querySelector('.carousel-control.left').click()
        setTimeout(() => {
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[2].className).to.contain('active')
          done()
        }, 700)
      }, 700)
    })
  })

  it('should be able to go index on indicator click', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li')[1].click()
      setTimeout(() => {
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li')[1].className).to.contain('active')
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[1].className).to.contain('active')
        vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li')[0].click()
        setTimeout(() => {
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li')[0].className).to.contain('active')
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[0].className).to.contain('active')
          done()
        }, 700)
      }, 700)
    })
  })

  it('should be able to hide indicators', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelectorAll('form button')[0].click()
      vm.$nextTick(() => {
        expect(vm.$refs.carousel.$el.querySelector('.carousel-indicators')).not.exist
        done()
      })
    })
  })

  it('should be able to hide controls', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelectorAll('form button')[1].click()
      vm.$nextTick(() => {
        expect(vm.$refs.carousel.$el.querySelector('.carousel-control')).not.exist
        done()
      })
    })
  })

  it('should be able to push slide', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelectorAll('form button')[2].click()
      vm.$nextTick(() => {
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li').length).to.equal(5)
        expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item').length).to.equal(5)
        done()
      })
    })
  })

  it('should be able to change interval', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.interval = 500
      vm.$nextTick(() => {
        setTimeout(() => {
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li')[1].className).to.contain('active')
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[1].className).to.contain('active')
          done()
        }, 1200) // > 500 + 600
      })
    })
  })

  it('should be able to stop interval', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.interval = 0
      vm.$nextTick(() => {
        setTimeout(() => {
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-indicators li')[0].className).to.contain('active')
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$refs.carousel.$el.querySelectorAll('.carousel-inner .item')[0].className).to.contain('active')
          done()
        }, 1200) // > 500 + 600
      })
    })
  })
})
