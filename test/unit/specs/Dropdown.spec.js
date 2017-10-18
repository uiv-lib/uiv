import Vue from 'vue'
import Dropdown from '@src/components/dropdown/Dropdown.vue'
import DropdownDoc from '@docs/pages/components/Dropdown.md'
import utils from './../utils'

describe('Dropdown', () => {
  let app

  beforeEach(() => {
    app = new Vue({
      template: '<DropdownDoc ref="doc"/>',
      components: {DropdownDoc}
    })
  })

  afterEach(() => {
    try {
      app.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to open dropdown on trigger click', (done) => {
    let vm = app.$mount().$refs.doc
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerEvent(trigger, 'click')
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      done()
    })
  })

  it('should be able to close dropdown on trigger click', (done) => {
    let vm = app.$mount().$refs.doc
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerEvent(trigger, 'click')
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      utils.triggerEvent(trigger, 'click')
      vm.$nextTick(() => {
        expect(dropdown.className).to.not.contain('open')
        done()
      })
    })
  })

  it('should be able to close dropdown on window click', (done) => {
    let vm = app.$mount().$refs.doc
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerEvent(trigger, 'click')
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      // Simulate a window click
      vm.$refs.dropdown.windowClicked({target: document.body})
      vm.$nextTick(() => {
        expect(dropdown.className).to.not.contain('open')
        done()
      })
    })
  })

  it('should be able to open dropdown append to body on trigger click', (done) => {
    let appDom = document.createElement('div')
    appDom.id = 'app'
    document.body.appendChild(appDom)
    let vm = app.$mount('#app').$refs.doc
    let dropdown = vm.$el.querySelectorAll(`.dropdown`)[2]
    let trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
    utils.triggerEvent(trigger, 'click')
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      expect(dropdown.querySelector('.dropdown-menu')).not.exist
      utils.triggerEvent(trigger, 'click')
      vm.$nextTick(() => {
        expect(dropdown.className).not.contain('open')
        expect(dropdown.querySelector('.dropdown-menu')).to.exist
        appDom.remove()
        done()
      })
    })
  })

  it('should be able to use dropup & menu-right style', (done) => {
    let vm = app.$mount().$refs.doc
    vm.dropup = true
    vm.menuRight = true
    vm.$nextTick(() => {
      let dropdown = vm.$el.querySelector(`.dropup`)
      expect(dropdown.className).to.not.contain('open')
      expect(dropdown.querySelector('.dropdown-menu')).to.exist
      expect(dropdown.querySelector('.dropdown-menu').className).to.contain('dropdown-menu-right')
      done()
    })
  })

  it('should be able to open dropdown on init', (done) => {
    let res = Vue.compile('<dropdown v-model="show"><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template slot="dropdown"><li><a href="#">Action</a></li></template></dropdown>')
    let vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Dropdown},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$nextTick(() => {
      let dropdown = vm.$el
      expect(dropdown.className).to.contain('open')
      vm.$destroy()
      done()
    })
  })
})
