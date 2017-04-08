import Vue from 'vue'
import TooltipDoc from '@/docs/pages/TooltipDoc.vue'

describe('TooltipDoc', () => {
  it('should be able to destroy', () => {
    const Constructor = Vue.extend(TooltipDoc)
    const vm = new Constructor().$mount()
    vm.$destroy()
  })

  it('should be able to show tooltip', (done) => {
    const Constructor = Vue.extend(TooltipDoc)
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].focus()
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        vm.$el.querySelectorAll('button')[1].blur()
        setTimeout(() => {
          expect(document.querySelectorAll('.tooltip').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to change trigger to hover-focus', (done) => {
    const Constructor = Vue.extend(TooltipDoc)
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'hover-focus'
    let button = vm.$el.querySelectorAll('button')[1]
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      // matches don't work in here
      let savedMatches = Element.prototype.matches
      Element.prototype.matches = () => true
      button.focus()
      setTimeout(() => {
        // reset this function
        Element.prototype.matches = savedMatches
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        button.blur()
        setTimeout(() => {
          expect(document.querySelectorAll('.tooltip').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to keep tooltip show on hover if using hover trigger', (done) => {
    const Constructor = Vue.extend(TooltipDoc)
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'hover'
    let tooltip = vm.$refs.tooltip
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      tooltip.show() // trigger hover
      tooltip.hide() // trigger leave
      tooltip.showOnHover() // tooltip hover
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        tooltip.hideOnLeave() // tooltip leave
        setTimeout(() => {
          expect(document.querySelectorAll('.tooltip').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to not keep tooltip show on hover if not using hover trigger', (done) => {
    const Constructor = Vue.extend(TooltipDoc)
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    let tooltip = vm.$refs.tooltip
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      tooltip.show() // trigger focus
      tooltip.hide() // trigger blur
      tooltip.hideOnLeave() // tooltip leave
      tooltip.showOnHover() // tooltip hover
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(0)
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to toggle correctly on fast click', (done) => {
    const Constructor = Vue.extend(TooltipDoc)
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'click'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].click()
      vm.$el.querySelectorAll('button')[1].click()
      vm.$el.querySelectorAll('button')[1].click()
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        vm.$el.querySelectorAll('button')[1].click()
        vm.$el.querySelectorAll('button')[1].click()
        vm.$el.querySelectorAll('button')[1].click()
        setTimeout(() => {
          expect(document.querySelectorAll('.tooltip').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to change trigger to click', (done) => {
    const Constructor = Vue.extend(TooltipDoc)
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'click'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].click()
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        vm.$el.querySelectorAll('button')[1].click()
        setTimeout(() => {
          expect(document.querySelectorAll('.tooltip').length).to.equal(0)
          app.remove()
          done()
        }, 200)
      }, 200)
    })
  })

  it('should be able to change trigger to outside-click', (done) => {
    const Constructor = Vue.extend(TooltipDoc)
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'outside-click'
    let tooltip = vm.$refs.tooltip
    let button = vm.$el.querySelectorAll('button')[1]
    let otherButton = vm.$el.querySelectorAll('button')[2]
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      button.click()
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        let event = {target: otherButton}
        tooltip.windowClicked(event) // other button clicked
        setTimeout(() => {
          expect(document.querySelectorAll('.tooltip').length).to.equal(0)
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
    const Constructor = Vue.extend(TooltipDoc)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    vm.enable = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].focus()
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(0)
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change text', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const Constructor = Vue.extend(TooltipDoc)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    vm.text = 'test test test'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].focus()
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        expect(document.querySelector('.tooltip .tooltip-inner').textContent).to.equal('test test test')
        document.querySelector('.tooltip').remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to top', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const Constructor = Vue.extend(TooltipDoc)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    vm.placement = 'top'
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].focus()
      setTimeout(() => {
        let tooltip = document.querySelector('.tooltip')
        expect(tooltip).to.exist
        expect(tooltip.className).to.contain('top')
        tooltip.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to bottom', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const Constructor = Vue.extend(TooltipDoc)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    vm.placement = 'bottom'
    vm.autoPlacement = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].focus()
      setTimeout(() => {
        let tooltip = document.querySelector('.tooltip')
        expect(tooltip).to.exist
        expect(tooltip.className).to.contain('bottom')
        tooltip.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to left', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const Constructor = Vue.extend(TooltipDoc)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    vm.placement = 'left'
    vm.autoPlacement = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].focus()
      setTimeout(() => {
        let tooltip = document.querySelector('.tooltip')
        expect(tooltip).to.exist
        expect(tooltip.className).to.contain('left')
        tooltip.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to change placement to right', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const Constructor = Vue.extend(TooltipDoc)
    const vm = new Constructor().$mount('#app')
    vm.trigger = 'focus'
    vm.placement = 'right'
    vm.autoPlacement = false
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.$el.querySelectorAll('button')[1].focus()
      setTimeout(() => {
        let tooltip = document.querySelector('.tooltip')
        expect(tooltip).to.exist
        expect(tooltip.className).to.contain('right')
        tooltip.remove()
        app.remove()
        done()
      }, 200)
    })
  })
})
