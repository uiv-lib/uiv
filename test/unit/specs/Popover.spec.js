import Vue from 'vue'
import $ from 'jquery'
import Popover from '@src/components/popover/Popover.vue'
import PopoverDoc from '@docs/pages/components/Popover.md'
import utils from '../utils'

describe('Popover', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(PopoverDoc)
    vm = new Constructor().$mount()
    $('body').css('text-align', 'center').css('padding-top', '200px')
    $el = $(vm.$el).appendTo('body')
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
    $('.popover').remove()
    $('body').css('text-align', '').css('padding-top', '')
  })

  it('should be ok to render if no trigger present', async () => {
    const Constructor = Vue.extend(Popover)
    const vm = new Constructor().$mount()
    await vm.$nextTick()
    $(vm.$el).remove()
    vm.$destroy()
  })

  it('should be able to show popover on init', async () => {
    const res = Vue.compile('<popover v-model="show" title="123"><button data-role="trigger"></button></popover>')
    const _vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Popover},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    $(_vm.$el).remove()
    $('.popover').remove()
    _vm.$destroy()
  })

  it('should be able to use popover directive', async () => {
    const res = Vue.compile('<btn v-popover="msg"></btn>')
    const _vm = new Vue({
      data () {
        return {
          msg: {title: 'title', content: 'content'}
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await _vm.$nextTick()
    const trigger = _vm.$el
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // this should work
    _vm.msg = {title: 'title2', content: 'content2'}
    await _vm.$nextTick()
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title2')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content2')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // this should not work
    _vm.$set(_vm.msg, 'title', 'title3')
    await _vm.$nextTick()
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title2')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content2')
    _vm.$destroy()
  })

  it('directive with invalid modifiers should be ok', async () => {
    // invalid modifier should be ok
    const res = Vue.compile('<btn v-popover.test1.test2="msg"></btn>')
    const _vm = new Vue({
      data () {
        return {
          msg: {title: 'title', content: 'content'}
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await _vm.$nextTick()
    const trigger = _vm.$el
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    _vm.$destroy()
  })

  it('should not show popover with no title and content', async () => {
    const res = Vue.compile('<popover v-model="show"><button data-role="trigger"></button></popover>')
    const _vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Popover},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    $(_vm.$el).remove()
    $('.popover').remove()
    _vm.$destroy()
  })

  it('should be able to use custom target', async () => {
    const res = Vue.compile('<div><button ref="btn" type="button">btn</button><popover :target="btn" trigger="focus" title="123"></popover></div>')
    const _vm = new Vue({
      data () {
        return {
          btn: null
        }
      },
      mounted () {
        this.btn = this.$refs.btn
      },
      components: {Popover},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(_vm.$el).appendTo('body')
    await _vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    utils.triggerEvent(_vm.btn, 'focus')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    $el.remove()
    $('.popover').remove()
    _vm.$destroy()
  })

  it('should be able to show popover on click', async () => {
    const _vm = vm.$refs['popover-example']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    utils.triggerEvent(_vm.$el.querySelector('button'), 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    utils.triggerEvent(_vm.$el.querySelector('button'), 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to manual', async () => {
    const _vm = vm.$refs['popover-manual-trigger']
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    _vm.show = true
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    _vm.show = false
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able change trigger to hover-focus', async () => {
    const _vm = vm.$refs['popover-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    const trigger = _vm.$el.querySelectorAll('button')[3]
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to click', async () => {
    const _vm = vm.$refs['popover-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[4]
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to hover', async () => {
    const _vm = vm.$refs['popover-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[1]
    utils.triggerEvent(trigger, 'mouseenter')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    utils.triggerEvent(trigger, 'mouseleave')
    utils.triggerEvent(document.querySelector('.popover'), 'mouseenter')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    utils.triggerEvent(document.querySelector('.popover'), 'mouseleave')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to toggle correctly on fast click', async () => {
    const _vm = vm.$refs['popover-triggers']
    const button = _vm.$el.querySelectorAll('button')[4]
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    utils.triggerEvent(button, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to outside-click', async () => {
    const _vm = vm.$refs['popover-triggers']
    const button = _vm.$el.querySelectorAll('button')[0]
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    utils.triggerEvent(button, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    document.body.click() // utils.triggerEvent() doesn't work here...
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to disable', async () => {
    const _vm = vm.$refs['popover-disable']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    utils.triggerEvent(_vm.$el.querySelector('button'), 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to hide title', async () => {
    const _vm = vm.$refs['popover-with-empty-title']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelector('button')
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    expect(document.querySelector('.popover .popover-title').style.display).to.equal('none')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to top', async () => {
    const _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[1]
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('top')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to bottom', async () => {
    const _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[2]
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('bottom')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to left', async () => {
    const _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[0]
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('left')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to right', async () => {
    const _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = _vm.$el.querySelectorAll('button')[3]
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('right')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger in runtime', async () => {
    const res = Vue.compile('<popover title="123" :trigger="trigger"><button data-role="trigger"></button></popover>')
    const _vm = new Vue({
      data () {
        return {
          trigger: 'focus'
        }
      },
      components: {Popover},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $el = $(_vm.$el).appendTo('body')
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    await _vm.$nextTick()
    const trigger = _vm.$el.querySelector('button')
    utils.triggerEvent(trigger, 'focus')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    _vm.trigger = 'click'
    await _vm.$nextTick()
    utils.triggerEvent(trigger, 'blur')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    $el.remove()
    _vm.$destroy()
  })
})
