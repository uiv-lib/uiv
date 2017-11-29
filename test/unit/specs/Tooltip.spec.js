import Vue from 'vue'
import $ from 'jquery'
import Tooltip from '@src/components/tooltip/Tooltip.vue'
import TooltipDoc from '@docs/pages/components/Tooltip.md'
import utils from '../utils'

describe('Tooltip', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(TooltipDoc)
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
    const tag = document.createElement('div')
    tag.id = 'tag'
    document.body.appendChild(tag)
    const res = Vue.compile('<tooltip trigger="focus" text="test" append-to="#tag"><button type="button">{{msg}}</button></tooltip>')
    const vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(vm.$el)
    $el.appendTo('body')
    await vm.$nextTick()
    utils.triggerEvent(vm.$el.querySelector('button'), 'focus')
    await utils.sleep(200)
    expect(tag.querySelector('.tooltip')).to.exist
    $el.remove()
    vm.$destroy()
    $(tag).remove()
  })

  it('should be able to render with no content', async () => {
    const res = Vue.compile('<tooltip text="test"></tooltip>')
    const vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(vm.$el)
    $el.appendTo('body')
    await vm.$nextTick()
    $el.remove()
    vm.$destroy()
  })

  it('should be able to show tooltip on init', async () => {
    const res = Vue.compile('<tooltip text="test" v-model="show"><button></button></tooltip>')
    const vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(vm.$el)
    $el.appendTo('body')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    $el.remove()
    vm.$destroy()
  })

  it('should not show tooltip with empty text', async () => {
    const res = Vue.compile('<tooltip v-model="show"><button></button></tooltip>')
    const vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(vm.$el)
    $el.appendTo('body')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    $el.remove()
    vm.$destroy()
  })

  it('should be able to use custom target', async () => {
    const res = Vue.compile('<div><button ref="btn" type="button">btn</button><tooltip text="test" :target="btn" trigger="focus"></tooltip></div>')
    const vm = new Vue({
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
    const $el = $(vm.$el)
    $el.appendTo('body')
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    utils.triggerEvent(vm.btn, 'focus')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    $el.remove()
    vm.$destroy()
  })

  it('should be able to use tooltip directive', async () => {
    const res = Vue.compile('<btn v-tooltip.click="msg">{{test}}</btn>')
    const vm = new Vue({
      data () {
        return {
          msg: 'title',
          test: 'test'
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    const trigger = vm.$el
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    let tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    // this should work
    vm.msg = 'title2'
    await vm.$nextTick()
    await vm.$nextTick()
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title2')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    // this should not work
    vm.test = 'test2'
    await vm.$nextTick()
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title2')
    vm.$destroy()
  })

  it('directive with invalid modifiers should be ok', async () => {
    // invalid modifier should be ok
    const res = Vue.compile('<btn v-tooltip.test1.test2.click="msg"></btn>')
    const vm = new Vue({
      data () {
        return {
          msg: 'title'
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    const trigger = vm.$el
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    vm.$destroy()
  })

  it('should be able to show tooltip', async () => {
    const _vm = vm.$refs['tooltip-example']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = _vm.$el.querySelector('button')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to manual', async () => {
    const _vm = vm.$refs['tooltip-manual-trigger']
    _vm.show = true
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    _vm.show = false
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to keep tooltip show on hover if using hover trigger', async () => {
    const _vm = vm.$refs['tooltip-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[1]
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
    const _vm = vm.$refs['tooltip-triggers']
    const button = _vm.$el.querySelectorAll('button')[3]
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to click', async () => {
    const _vm = vm.$refs['tooltip-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    utils.triggerEvent(_vm.$el.querySelectorAll('button')[3], 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    utils.triggerEvent(_vm.$el.querySelectorAll('button')[3], 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to outside-click', async () => {
    const _vm = vm.$refs['tooltip-triggers']
    const button = _vm.$el.querySelectorAll('button')[4]
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    utils.triggerEvent(button, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    document.body.click() // utils.triggerEvent() doesn't work here...
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to disable', async () => {
    const _vm = vm.$refs['tooltip-disable']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    utils.triggerEvent(_vm.$el.querySelector('button'), 'focus')
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to top', async () => {
    const _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[1]
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('top')
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to bottom', async () => {
    const _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[2]
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('bottom')
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to left', async () => {
    const _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[0]
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('left')
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to right', async () => {
    const _vm = vm.$refs['tooltip-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[3]
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('right')
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger in runtime', async () => {
    const res = Vue.compile('<tooltip text="test" :trigger="trigger"><btn></btn></tooltip>')
    const vm = new Vue({
      data () {
        return {
          trigger: 'focus'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(vm.$el).appendTo('body')
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    vm.trigger = 'click'
    await vm.$nextTick()
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    $el.remove()
    vm.$destroy()
  })

  it('should be able to change text in runtime', async () => {
    const res = Vue.compile('<tooltip :text="msg" trigger="click"><btn>123</btn></tooltip>')
    const vm = new Vue({
      data () {
        return {
          msg: 'text'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(vm.$el).appendTo('body')
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    vm.msg = 'text2'
    await vm.$nextTick()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    expect(document.querySelector('.tooltip-inner').innerText).to.equal('text2')
    const topBefore = document.querySelector('.tooltip').style.top
    vm.msg = 'This is a very very long text. This is a very very long text. This is a very very long text'
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    expect(document.querySelector('.tooltip-inner').innerText).to.contain('This is a very very long text')
    await vm.$nextTick()
    const topAfter = document.querySelector('.tooltip').style.top
    expect(topAfter).not.equal(topBefore)
    vm.msg = ''
    await vm.$nextTick()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    $el.remove()
    vm.$destroy()
  })

  it('should be able to change enable in runtime', async () => {
    const res = Vue.compile('<tooltip :text="msg" trigger="click" :enable="enable"><btn>123</btn></tooltip>')
    const vm = new Vue({
      data () {
        return {
          msg: 'text',
          enable: true
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(vm.$el).appendTo('body')
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    vm.enable = false
    await vm.$nextTick()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    vm.enable = true
    await vm.$nextTick()
    await utils.sleep(200)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    $el.remove()
    vm.$destroy()
  })
})
