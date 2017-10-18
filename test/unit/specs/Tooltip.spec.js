import Vue from 'vue'
import Tooltip from '@src/components/tooltip/Tooltip.vue'
import TooltipDoc from '@docs/pages/components/Tooltip.md'

describe('Tooltip', () => {
  let root

  beforeEach(() => {
    root = new Vue({
      template: '<TooltipDoc ref="doc"/>',
      components: {TooltipDoc}
    })
  })

  afterEach(() => {
    try {
      root.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to append to custom tags', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let tag = document.createElement('div')
    tag.id = 'tag'
    document.body.appendChild(tag)
    let res = Vue.compile('<tooltip trigger="focus" text="test" append-to="#tag"><button type="button">{{msg}}</button></tooltip>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount('#app')
    vm.$nextTick(() => {
      vm.$el.querySelector('button').focus()
      setTimeout(() => {
        expect(tag.querySelector('.tooltip')).to.exist
        vm.$destroy()
        tag.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to render with no content', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let res = Vue.compile('<tooltip text="test"></tooltip>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount('#app')
    vm.$nextTick(() => {
      vm.$destroy()
      app.remove()
      done()
    })
  })

  it('should be able to show tooltip on init', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let res = Vue.compile('<tooltip text="test" v-model="show"><button></button></tooltip>')
    let vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount('#app')
    setTimeout(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(1)
      vm.$destroy()
      app.remove()
      done()
    }, 200)
  })

  it('should be able to use custom target', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let res = Vue.compile('<div><button ref="btn" type="button">btn</button><tooltip text="test" :target="btn" trigger="focus"></tooltip></div>')
    let vm = new Vue({
      data () {
        return {
          btn: null
        }
      },
      mounted () {
        this.btn = this.$refs.btn
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount('#app')
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      vm.btn.focus()
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(1)
        vm.$destroy()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to destroy', () => {
    let vm = root.$mount().$refs.doc
    vm.$destroy()
  })

  it('should be able to show tooltip', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
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

  it('should be able to change trigger to manual', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'manual'
    vm.open1 = true
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(1)
      vm.open1 = false
      setTimeout(() => {
        expect(document.querySelectorAll('.tooltip').length).to.equal(0)
        app.remove()
        done()
      }, 500)
    })
  })

  it('should be able to change trigger to hover-focus', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
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
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
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

  it('should be able to keep tooltip show on hover if using hover-focus trigger', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
    vm.trigger = 'hover-focus'
    let tooltip = vm.$refs.tooltip
    vm.$nextTick(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(0)
      tooltip.show() // tooltip hover
      tooltip.hide() // tooltip leave
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

  it('should be able to toggle correctly on fast click', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
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
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
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
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let vm = root.$mount('#app').$refs.doc
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
    let vm = root.$mount('#app').$refs.doc
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
    let vm = root.$mount('#app').$refs.doc
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
    let vm = root.$mount('#app').$refs.doc
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
    let vm = root.$mount('#app').$refs.doc
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
    let vm = root.$mount('#app').$refs.doc
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
    let vm = root.$mount('#app').$refs.doc
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
