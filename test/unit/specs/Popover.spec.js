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
    let res = Vue.compile('<popover v-model="show" title="123"><button data-role="trigger"></button></popover>')
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

  it('should be able to use popover directive', async () => {
    let res = Vue.compile('<btn v-popover="msg"></btn>')
    let vm = new Vue({
      data () {
        return {
          msg: {title: 'title', content: 'content'}
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    let trigger = vm.$el
    trigger.click()
    await utils.sleep(200)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // this should work
    vm.msg = {title: 'title2', content: 'content2'}
    await vm.$nextTick()
    trigger.click()
    await utils.sleep(200)
    popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title2')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content2')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // this should not work
    vm.$set(vm.msg, 'title', 'title3')
    await vm.$nextTick()
    trigger.click()
    await utils.sleep(200)
    popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title2')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content2')
    vm.$destroy()
  })

  it('directive with invalid modifiers should be ok', async () => {
    // invalid modifier should be ok
    let res = Vue.compile('<btn v-popover.test1.test2="msg"></btn>')
    let vm = new Vue({
      data () {
        return {
          msg: {title: 'title', content: 'content'}
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    let trigger = vm.$el
    trigger.click()
    await utils.sleep(200)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content')
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    vm.$destroy()
  })

  it('should not show popover with no title and content', async () => {
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
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    $(vm.$el).remove()
    $('.popover').remove()
    vm.$destroy()
  })

  it('should be able to use custom target', async () => {
    let res = Vue.compile('<div><button ref="btn" type="button">btn</button><popover :target="btn" trigger="focus" title="123"></popover></div>')
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
    let _vm = vm.$refs['popover-example']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    _vm.$el.querySelector('button').click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    _vm.$el.querySelector('button').click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to manual', async () => {
    let _vm = vm.$refs['popover-manual-trigger']
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    _vm.show = true
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    _vm.show = false
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able change trigger to hover-focus', async () => {
    let _vm = vm.$refs['popover-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // matches don't work in here
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    let trigger = _vm.$el.querySelectorAll('button')[3]
    trigger.focus()
    await utils.sleep(200)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    trigger.blur()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to click', async () => {
    let _vm = vm.$refs['popover-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[4]
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    trigger.click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to hover', async () => {
    let _vm = vm.$refs['popover-triggers']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[1]
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
    let _vm = vm.$refs['popover-triggers']
    let button = _vm.$el.querySelectorAll('button')[4]
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
    let _vm = vm.$refs['popover-triggers']
    let button = _vm.$el.querySelectorAll('button')[0]
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
    let _vm = vm.$refs['popover-disable']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    _vm.$el.querySelector('button').click()
    await utils.sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to hide title', async () => {
    let _vm = vm.$refs['popover-with-empty-title']
    await vm.$nextTick()
    let trigger = _vm.$el.querySelector('button')
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
    let _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[1]
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
    let _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[2]
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
    let _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[0]
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
    let _vm = vm.$refs['popover-placements']
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    let trigger = _vm.$el.querySelectorAll('button')[3]
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
    let res = Vue.compile('<popover title="123" :trigger="trigger"><button data-role="trigger"></button></popover>')
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
    await vm.$nextTick()
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
