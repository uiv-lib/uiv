import Vue from 'vue'
import PopoverDoc from '@docs/components/pages/PopoverDoc.vue'
import i18n from '@docs/locale'

describe('PopoverDoc', () => {
  let root

  beforeEach(() => {
    root = new Vue({
      i18n,
      template: '<PopoverDoc ref="doc"/>',
      components: {PopoverDoc}
    })
    root.$i18n.locale = 'en-US'
  })

  afterEach(() => {
    try {
      root.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to destroy', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      vm.$destroy()
      done()
    })
  })

  it('should be able to show popover', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'focus'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        vm.$el.querySelectorAll('button')[0].blur()
        setTimeout(() => {
          expect(document.querySelectorAll('.popover').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to change trigger to manual', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'manual'
    vm.open1 = true
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(1)
      vm.open1 = false
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(0)
        app.remove()
        done()
      }, 500)
    })
  })

  it('should be able change trigger to hover-focus', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'hover-focus'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      // matches don't work in here
      let savedMatches = Element.prototype.matches
      Element.prototype.matches = () => true
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        Element.prototype.matches = savedMatches
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        vm.$el.querySelectorAll('button')[0].blur()
        setTimeout(() => {
          expect(document.querySelectorAll('.popover').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to change trigger to click', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'click'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].click()
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        vm.$el.querySelectorAll('button')[0].click()
        setTimeout(() => {
          expect(document.querySelectorAll('.popover').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to keep popover show on hover if using hover trigger', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'hover'
    let popover = vm.$refs.popover
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      popover.show() // popover hover
      popover.hide() // popover leave
      popover.showOnHover() // popover hover
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        popover.hideOnLeave() // popover leave
        setTimeout(() => {
          expect(document.querySelectorAll('.popover').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to keep popover show on hover if using hover-focus trigger', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'hover-focus'
    let popover = vm.$refs.popover
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      popover.show() // popover hover
      popover.hide() // popover leave
      popover.showOnHover() // popover hover
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        popover.hideOnLeave() // popover leave
        setTimeout(() => {
          expect(document.querySelectorAll('.popover').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to toggle correctly on fast click', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'click'
    let button = vm.$el.querySelectorAll('button')[0]
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      button.click()
      button.click()
      button.click()
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        button.click()
        button.click()
        button.click()
        setTimeout(() => {
          expect(document.querySelectorAll('.popover').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to change trigger to outside-click', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'outside-click'
    let popover = vm.$refs.popover
    let button = vm.$el.querySelectorAll('button')[0]
    let otherButton = vm.$el.querySelectorAll('button')[1]
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      button.click()
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        let event = {target: otherButton}
        popover.windowClicked(event)
        setTimeout(() => {
          expect(document.querySelectorAll('.popover').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to disable', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'focus'
    vm.enable = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(0)
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change title', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'focus'
    vm.title = 'test test test'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        expect(document.querySelectorAll('.popover').length).to.equal(1)
        expect(document.querySelector('.popover .popover-title').textContent).to.equal('test test test')
        document.querySelector('.popover').remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to top', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'focus'
    vm.placement = 'top'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        let popover = document.querySelector('.popover')
        expect(popover).to.exist
        expect(popover.className).to.contain('top')
        popover.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to bottom', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'focus'
    vm.placement = 'bottom'
    vm.autoPlacement = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        let popover = document.querySelector('.popover')
        expect(popover).to.exist
        expect(popover.className).to.contain('bottom')
        popover.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to left', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'focus'
    vm.placement = 'left'
    vm.autoPlacement = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        let popover = document.querySelector('.popover')
        expect(popover).to.exist
        expect(popover.className).to.contain('left')
        popover.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to right', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'focus'
    vm.placement = 'right'
    vm.autoPlacement = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.popover').length).to.equal(0)
      vm.$el.querySelectorAll('button')[0].focus()
      setTimeout(() => {
        let popover = document.querySelector('.popover')
        expect(popover).to.exist
        expect(popover.className).to.contain('right')
        popover.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to render with hover trigger', (done) => {
    let vm = root.$mount().$refs.doc
    vm.trigger = 'hover'
    vm.$nextTick(() => {
      done()
    })
  })
})
