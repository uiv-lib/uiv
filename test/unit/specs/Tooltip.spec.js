import Vue from 'vue'
import $ from 'jquery'
import Tooltip from '@src/components/tooltip/Tooltip.vue'
import TooltipDoc from '@docs/pages/components/Tooltip.md'
import utils from './../utils'

describe('Tooltip', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(TooltipDoc)
    vm = new Constructor().$mount()
    $('body').css('text-align', 'center').css('padding-top', '200px')
    $el = $(vm.$el).appendTo('body')
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
    $('.tooltip').remove()
    $('body').css('text-align', '').css('padding-top', '')
  })

  it('should be able to append to custom tags', async () => {
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
    }).$mount()
    let $el = $(vm.$el)
    $el.appendTo('body')
    await vm.$nextTick()
    vm.$el.querySelector('button').focus()
    await utils.sleep(200)
    expect(tag.querySelector('.tooltip')).to.exist
    $el.remove()
    vm.$destroy()
    $(tag).remove()
  })

  it('should be able to render with no content', async () => {
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
    }).$mount()
    let $el = $(vm.$el)
    $el.appendTo('body')
    await vm.$nextTick()
    $el.remove()
    vm.$destroy()
  })

  it('should be able to show tooltip on init', async () => {
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
    }).$mount()
    let $el = $(vm.$el)
    $el.appendTo('body')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    $el.remove()
    vm.$destroy()
  })

  it('should not show tooltip with empty text', async () => {
    let res = Vue.compile('<tooltip v-model="show"><button></button></tooltip>')
    let vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el)
    $el.appendTo('body')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    $el.remove()
    vm.$destroy()
  })

  it('should be able to use custom target', async () => {
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
    }).$mount()
    let $el = $(vm.$el)
    $el.appendTo('body')
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    vm.btn.focus()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    $el.remove()
    vm.$destroy()
  })

  it('should be able to show tooltip', async () => {
    let _vm = vm.$refs['tooltip-example']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    let trigger = _vm.$el.querySelector('button')
    // matches don't work in here
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    trigger.focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to manual', async () => {
    let _vm = vm.$refs['tooltip-manual-trigger']
    _vm.show = true
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    _vm.show = false
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to keep tooltip show on hover if using hover trigger', async () => {
    let _vm = vm.$refs['tooltip-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[1]
    utils.triggerEvent(trigger, 'mouseenter')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    utils.triggerEvent(trigger, 'mouseleave')
    utils.triggerEvent(document.querySelector('.tooltip'), 'mouseenter')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    utils.triggerEvent(document.querySelector('.tooltip'), 'mouseleave')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to toggle correctly on fast click', async () => {
    let _vm = vm.$refs['tooltip-triggers']
    let button = _vm.$el.querySelectorAll('button')[3]
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    button.click()
    button.click()
    button.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    button.click()
    button.click()
    button.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to click', async () => {
    let _vm = vm.$refs['tooltip-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    _vm.$el.querySelectorAll('button')[3].click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    _vm.$el.querySelectorAll('button')[3].click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to outside-click', async () => {
    let _vm = vm.$refs['tooltip-triggers']
    let button = _vm.$el.querySelectorAll('button')[4]
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    button.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    document.body.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to disable', async () => {
    let _vm = vm.$refs['tooltip-disable']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    _vm.$el.querySelector('button').focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to top', async () => {
    let _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[1]
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    trigger.focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    let tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('top')
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to bottom', async () => {
    let _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[2]
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    trigger.focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    let tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('bottom')
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to left', async () => {
    let _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[0]
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    trigger.focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    let tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('left')
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to right', async () => {
    let _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[3]
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    trigger.focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    let tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('right')
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger in runtime', async () => {
    let res = Vue.compile('<tooltip text="test" :trigger="trigger"><button></button></tooltip>')
    let vm = new Vue({
      data () {
        return {
          trigger: 'focus'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el).appendTo('body')
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    let trigger = vm.$el.querySelector('button')
    trigger.focus()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    vm.trigger = 'click'
    await vm.$nextTick()
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    $el.remove()
    vm.$destroy()
  })
})
