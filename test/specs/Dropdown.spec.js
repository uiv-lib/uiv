import Vue from 'vue'
import $ from 'jquery'
import DropdownDoc from '@docs/pages/components/Dropdown.md'
import utils from '../utils'

describe('Dropdown', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(DropdownDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to open dropdown on trigger click', async () => {
    const _vm = vm.$refs['dropdown-examples']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close dropdown on trigger click', async () => {
    const _vm = vm.$refs['dropdown-examples']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to close dropdown on window click', async () => {
    const _vm = vm.$refs['dropdown-examples']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    // Simulate a window click
    vm.$refs['dropdown-examples'].$refs.dropdown.windowClicked({target: document.body})
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to open dropdown append to body on trigger click', async () => {
    const _vm = vm.$refs['dropdown-append-to-body']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).not.exist
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to use dropup style', async () => {
    const _vm = vm.$refs['dropdown-dropup']
    await vm.$nextTick()
    const dropup = _vm.$el.querySelector('.dropup')
    expect(dropup.className).to.not.contain('open')
    expect(dropup.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to use menu-right style', async () => {
    const _vm = vm.$refs['dropdown-menu-right']
    await vm.$nextTick()
    const menuRight = _vm.$el.querySelector('.dropdown')
    expect(menuRight.querySelector('.dropdown-menu').className).to.contain('dropdown-menu-right')
  })

  it('should be able to open dropdown append to body & menu-right on trigger click', async () => {
    const _vm = vm.$refs['dropdown-append-to-body']
    const dropdown = _vm.$el.querySelectorAll(`.dropdown`)[1]
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu-right')).to.exist
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelector('.dropdown-menu-right')).not.exist
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu-right')).to.exist
  })

  it('should be able to open dropdown append to body & dropup on trigger click', async () => {
    const _vm = vm.$refs['dropdown-append-to-body']
    const dropdown = _vm.$el.querySelector('.dropup')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).not.exist
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to open dropdown on init', async () => {
    const res = Vue.compile('<dropdown v-model="show"><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template slot="dropdown"><li><a href="#">Action</a></li></template></dropdown>')
    const vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    const dropdown = vm.$el
    expect(dropdown.className).to.contain('open')
    vm.$destroy()
  })

  it('should be able to init with no trigger', async () => {
    const res = Vue.compile('<dropdown/>')
    const vm = new Vue({
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    vm.$destroy()
  })
})
