import Vue from 'vue'
import CarouselDoc from '@docs/components/pages/CarouselDoc.vue'
import i18n from '@docs/locale'

describe('CarouselDoc', () => {
  let app

  beforeEach(() => {
    app = new Vue({
      i18n,
      template: '<CarouselDoc ref="doc"/>',
      components: {CarouselDoc}
    })
    app.$i18n.locale = 'en-US'
  })

  afterEach(() => {
    try {
      app.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to render correct contents on init', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.carousel-inner .item').length).to.equal(4)
      expect(vm.$el.querySelectorAll('.carousel-indicators li').length).to.equal(4)
      expect(vm.$el.querySelectorAll('.carousel-control').length).to.equal(2)
      expect(vm.$el.querySelectorAll('.carousel-inner .item')[0].className).to.contain('active')
      done()
    })
  })

  it('should be able to go next on right control click', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelector('.carousel-control.right').click()
      setTimeout(() => {
        expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
        expect(vm.$el.querySelectorAll('.carousel-inner .item')[1].className).to.contain('active')
        done()
      }, 700)
    })
  })

  it('should be able to go prev on left control click', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelector('.carousel-control.left').click()
      setTimeout(() => {
        expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
        expect(vm.$el.querySelectorAll('.carousel-inner .item')[3].className).to.contain('active')
        vm.$el.querySelector('.carousel-control.left').click()
        setTimeout(() => {
          expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$el.querySelectorAll('.carousel-inner .item')[2].className).to.contain('active')
          done()
        }, 700)
      }, 700)
    })
  })

  it('should be able to go index on indicator click', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelectorAll('.carousel-indicators li')[1].click()
      setTimeout(() => {
        expect(vm.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
        expect(vm.$el.querySelectorAll('.carousel-indicators li')[1].className).to.contain('active')
        expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
        expect(vm.$el.querySelectorAll('.carousel-inner .item')[1].className).to.contain('active')
        vm.$el.querySelectorAll('.carousel-indicators li')[0].click()
        setTimeout(() => {
          expect(vm.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
          expect(vm.$el.querySelectorAll('.carousel-indicators li')[0].className).to.contain('active')
          expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$el.querySelectorAll('.carousel-inner .item')[0].className).to.contain('active')
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
        expect(vm.$el.querySelector('.carousel-indicators')).not.exist
        done()
      })
    })
  })

  it('should be able to hide controls', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelectorAll('form button')[1].click()
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.carousel-control')).not.exist
        done()
      })
    })
  })

  it('should be able to push slide', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$el.querySelectorAll('form button')[2].click()
      vm.$nextTick(() => {
        expect(vm.$el.querySelectorAll('.carousel-indicators li').length).to.equal(5)
        expect(vm.$el.querySelectorAll('.carousel-inner .item').length).to.equal(5)
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
          expect(vm.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
          expect(vm.$el.querySelectorAll('.carousel-indicators li')[1].className).to.contain('active')
          expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$el.querySelectorAll('.carousel-inner .item')[1].className).to.contain('active')
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
          expect(vm.$el.querySelectorAll('.carousel-indicators .active').length).to.equal(1)
          expect(vm.$el.querySelectorAll('.carousel-indicators li')[0].className).to.contain('active')
          expect(vm.$el.querySelectorAll('.carousel-inner .item.active').length).to.equal(1)
          expect(vm.$el.querySelectorAll('.carousel-inner .item')[0].className).to.contain('active')
          done()
        }, 1200) // > 500 + 600
      })
    })
  })
})
