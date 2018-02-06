import Vue from 'vue'
import $ from 'jquery'
import NavbarDoc from '@docs/pages/components/Navbar.md'
import utils from '../utils'

describe('Navbar', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(NavbarDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render correct content', async () => {
    const _vm = vm.$refs['navbar-example']
    const nav = _vm.$el.querySelector('nav')
    expect(nav.className).to.equal('navbar navbar-default')
    expect(nav.querySelector('.navbar-brand')).to.exist
    expect(nav.querySelector('.navbar-brand').textContent).to.equal('Brand')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    expect(collapse).to.exist
    expect(collapse.querySelectorAll('.nav.navbar-nav').length).to.equal(2)
    expect(collapse.querySelectorAll('.nav.navbar-nav.navbar-right').length).to.equal(1)
    expect(collapse.querySelectorAll('.navbar-form.navbar-left').length).to.equal(1)
  })

  it('should be able to render nav-text', async () => {
    const _vm = vm.$refs['navbar-text']
    const nav = _vm.$el.querySelector('nav')
    expect(nav.querySelector('.navbar-text')).to.exist
    expect(nav.querySelector('.navbar-text').textContent).to.equal('Signed in as wxsm')
  })

  it('should be able to render static top', async () => {
    const _vm = vm.$refs['navbar-static-top']
    const nav = _vm.$el.querySelector('nav')
    expect(nav.className).to.contain('navbar-static-top')
  })

  it('should be able to render inverse', async () => {
    const _vm = vm.$refs['navbar-inverse']
    const nav = _vm.$el.querySelector('nav')
    expect(nav.className).to.contain('navbar-inverse')
  })

  it('should be able to toggle collapse content', async () => {
    const _vm = vm.$refs['navbar-example']
    const nav = _vm.$el.querySelector('nav')
    const trigger = nav.querySelector('.navbar-toggle')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    expect(collapse.className).not.contain('in')
    trigger.click()
    await utils.sleep(500)
    expect(collapse.className).to.contain('in')
    trigger.click()
    await utils.sleep(500)
    expect(collapse.className).not.contain('in')
  })

  it('should be able to use with v-model', async () => {
    const res = Vue.compile('<navbar v-model="show"/>')
    const _vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const nav = _vm.$el
    const trigger = nav.querySelector('.navbar-toggle')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    await utils.sleep(500)
    expect(collapse.className).to.contain('in')
    _vm.show = false
    await utils.sleep(500)
    expect(collapse.className).not.contain('in')
    trigger.click()
    await utils.sleep(500)
    expect(collapse.className).to.contain('in')
    _vm.$destroy()
  })

  it('should be able to render fixed-top', async () => {
    const res = Vue.compile('<navbar fixed-top/>')
    const _vm = new Vue({
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const nav = _vm.$el
    expect(nav.className).to.contain('navbar-fixed-top')
    _vm.$destroy()
  })

  it('should be able to render fixed-bottom', async () => {
    const res = Vue.compile('<navbar fixed-bottom/>')
    const _vm = new Vue({
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const nav = _vm.$el
    expect(nav.className).to.contain('navbar-fixed-bottom')
    _vm.$destroy()
  })
})
