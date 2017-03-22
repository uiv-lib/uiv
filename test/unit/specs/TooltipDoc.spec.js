import Vue from 'vue'
import TooltipDoc from '@/docs/TooltipDoc.vue'

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
