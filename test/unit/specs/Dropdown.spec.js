import Vue from 'vue'
import $ from 'jquery'
import Dropdown from '@src/components/dropdown/Dropdown.vue'
import DropdownDoc from '@docs/pages/components/Dropdown.md'
import utils from './../utils'

describe('Dropdown', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(DropdownDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to open dropdown on trigger click', async () => {
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close dropdown on trigger click', async () => {
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
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
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
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
    let dropdown = vm.$el.querySelectorAll(`.dropdown`)[2]
    let trigger = dropdown.querySelector('button')
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

  it('should be able to use dropup & menu-right style', async () => {
    vm.$refs['dropdown-examples'].dropup = true
    vm.$refs['dropdown-examples'].menuRight = true
    await vm.$nextTick()
    let dropdown = vm.$el.querySelector(`.dropup`)
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
    expect(dropdown.querySelector('.dropdown-menu').className).to.contain('dropdown-menu-right')
  })

  it('should be able to open dropdown on init', async () => {
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
    }).$mount()
    await vm.$nextTick()
    let dropdown = vm.$el
    expect(dropdown.className).to.contain('open')
    let $el = $(vm.$el)
    vm.$destroy()
    $el.remove()
  })
})
