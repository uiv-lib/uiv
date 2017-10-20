import Vue from 'vue'
import $ from 'jquery'
import Popover from '@src/components/popover/Popover.vue'
import PopoverDoc from '@docs/pages/components/Popover.md'
import utils from './../utils'

describe('Popover', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(PopoverDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el).appendTo('body')
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be ok to render if no trigger present', async () => {
    const Constructor = Vue.extend(Popover)
    const vm = new Constructor().$mount()
    await vm.$nextTick()
    $(vm.$el).remove()
    vm.$destroy()
  })

  it('should be able to show popover on init', async () => {
    let res = Vue.compile('<popover v-model="show"><button data-role="trigger"></button></popover>')
    let vm = new Vue({
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
    $(vm.$el).remove()
    $('.popover').remove()
    vm.$destroy()
  })

  it('should be able to use custom target', async () => {
    let res = Vue.compile('<div><button ref="btn" type="button">btn</button><popover :target="btn" trigger="focus"></popover></div>')
    let vm = new Vue({
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
    let $el = $(vm.$el).appendTo('body')
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    vm.btn.focus()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    $el.remove()
    $('.popover').remove()
    vm.$destroy()
  })

  it('should be able to show popover on click', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    vm.$el.querySelectorAll('button')[0].click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    vm.$el.querySelectorAll('button')[0].click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to manual', async () => {
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    vm.show = true
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    vm.show = false
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able change trigger to hover-focus', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // matches don't work in here
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    let trigger = vm.$el.querySelector('#hover-focus-trigger')
    trigger.focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to click', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = vm.$el.querySelector('#click-trigger')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to hover', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = vm.$el.querySelector('#hover-trigger')
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
    let button = vm.$el.querySelector('#click-trigger')
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    button.click()
    button.click()
    button.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    button.click()
    button.click()
    button.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to outside-click', async () => {
    let button = vm.$el.querySelectorAll('button')[0]
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    button.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    document.body.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to disable', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    vm.$el.querySelector('#disabled-trigger').click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to hide title', async () => {
    await vm.$nextTick()
    let trigger = vm.$el.querySelector('#empty-title-trigger')
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    expect(document.querySelector('.popover .popover-title').style.display).to.equal('none')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to top', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = vm.$el.querySelector('#top-trigger')
    trigger.click()
    await utils.sleep(200)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('top')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to bottom', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = vm.$el.querySelector('#bottom-trigger')
    trigger.click()
    await utils.sleep(200)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('bottom')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to left', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = vm.$el.querySelector('#left-trigger')
    trigger.click()
    await utils.sleep(200)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('left')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to right', async () => {
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = vm.$el.querySelector('#right-trigger')
    trigger.click()
    await utils.sleep(200)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('right')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger in runtime', async () => {
    let res = Vue.compile('<popover :trigger="trigger"><button data-role="trigger"></button></popover>')
    let vm = new Vue({
      data () {
        return {
          trigger: 'focus'
        }
      },
      components: {Popover},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el).appendTo('body')
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = vm.$el.querySelector('button')
    trigger.focus()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    vm.trigger = 'click'
    await vm.$nextTick()
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    $el.remove()
    vm.$destroy()
  })
})
