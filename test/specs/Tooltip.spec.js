import $ from 'jquery'
import { triggerEvent, sleep, createVm, destroyVm } from '../utils'

describe('Tooltip', () => {
  let vm

  beforeEach(() => {
    $('body')
      .css('display', 'flex')
      .css('justify-content', 'center')
      .css('align-items', 'center')
      .css('padding-top', '200px')
  })

  afterEach(() => {
    destroyVm(vm)
    $('.tooltip').remove()
    $('body').attr('style', '')
  })

  it('should be able to append to custom tags', async () => {
    const tag = document.createElement('div')
    tag.id = 'tag'
    document.body.appendChild(tag)
    vm = createVm('<tooltip trigger="focus" text="test" append-to="#tag"><button type="button">{{msg}}</button></tooltip>', {
      msg: 'hello'
    })
    await vm.$nextTick()
    triggerEvent(vm.$el.querySelector('button'), 'focus')
    await sleep(300)
    expect(tag.querySelector('.tooltip')).to.exist
    $(tag).remove()
  })

  it('should be able to render with no content', async () => {
    vm = createVm('<tooltip text="test"></tooltip>', {
      msg: 'hello'
    })
    await vm.$nextTick()
  })

  it('should be able to show tooltip on init', async () => {
    vm = createVm('<tooltip text="test" v-model="show"><button></button></tooltip>', {
      show: true
    })
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
  })

  it('should not show tooltip with empty text', async () => {
    vm = createVm('<tooltip v-model="show"><button></button></tooltip>', {
      show: true
    })
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to use custom target', async () => {
    vm = createVm('<div><button ref="btn" type="button">btn</button><tooltip text="test" :target="btn" trigger="focus"></tooltip></div>',
      { btn: null },
      {
        mounted () {
          this.btn = this.$refs.btn
        }
      })
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    triggerEvent(vm.btn, 'focus')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
  })

  it('should be able to use tooltip directive', async () => {
    vm = createVm('<btn v-tooltip.click="msg">{{test}}</btn>', {
      msg: 'title',
      test: 'test'
    })
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    let tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    // this should work
    vm.msg = 'title2'
    await vm.$nextTick()
    await vm.$nextTick()
    triggerEvent(trigger, 'click')
    await sleep(300)
    tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title2')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    // this should not work
    vm.test = 'test2'
    await vm.$nextTick()
    triggerEvent(trigger, 'click')
    await sleep(300)
    tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title2')
  })

  it('directive with invalid modifiers should be ok', async () => {
    // invalid modifier should be ok
    vm = createVm('<btn v-tooltip.test1.test2.click="msg"></btn>', {
      msg: 'title'
    })
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should handle being updated while hiding when directive', async () => {
    vm = createVm('<btn v-tooltip.hover="msg">{{test}}</btn>', {
      msg: 'title',
      test: 'test'
    })
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'mouseenter')
    await sleep(50)
    vm.msg = 'title2'
    triggerEvent(trigger, 'mouseleave')
    await sleep(100)
    triggerEvent(trigger, 'mouseenter')
    await sleep(150)
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title2')
  })

  it('should handle being updated while showing when directive', async () => {
    vm = createVm('<btn v-tooltip.hover="{ text: msg, showDelay: 150 }">{{test}}</btn>', {
      msg: 'title',
      test: 'test'
    })
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'mouseenter')
    await sleep(50)
    vm.msg = 'title2'
    vm.test = 'test2'
    await vm.$nextTick()
    triggerEvent(trigger, 'mouseenter')
    await sleep(150)
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.querySelector('.tooltip-inner').innerText).to.equal('title2')
  })

  it('should support show and hide delay when directive', async () => {
    vm = createVm('<btn v-tooltip.hover="{ text: msg, showDelay: 300, hideDelay: 400 }">test</btn>', {
      msg: 'title'
    })
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'mouseenter')
    // not shown yet
    await sleep(150)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await sleep(150)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    triggerEvent(trigger, 'mouseleave')
    await sleep(300)
    // not hidden yet
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    await sleep(400)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should clear timeouts correctly', async () => {
    vm = createVm('<tooltip ref=\'tooltip\' :text=\'msg\' trigger=\'hover\'><btn>test</btn></tooltip>', {
      msg: 'title'
    })
    await vm.$nextTick()
    const tooltip = vm.$refs.tooltip
    // handles empty timeoutids correctly
    tooltip.clearTimeouts()
    expect(tooltip.hideTimeoutId).to.equal(0)
    expect(tooltip.showTimeoutId).to.equal(0)
    expect(tooltip.transitionTimeoutId).to.equal(0)
    expect(tooltip.autoTimeoutId).to.equal(0)
    // handles populated timeoutids correctly
    tooltip.hideTimeoutId = setTimeout(() => 0, 500)
    tooltip.showTimeoutId = setTimeout(() => 0, 500)
    tooltip.transitionTimeoutId = setTimeout(() => 0, 500)
    tooltip.autoTimeoutId = setTimeout(() => 0, 500)
    tooltip.clearTimeouts()
    expect(tooltip.hideTimeoutId).to.equal(0)
    expect(tooltip.showTimeoutId).to.equal(0)
    expect(tooltip.transitionTimeoutId).to.equal(0)
    expect(tooltip.autoTimeoutId).to.equal(0)
  })

  it('should be able to show tooltip', async () => {
    vm = createVm(`
<div>
<btn type="primary" id="btn">Hover me!</btn>
<tooltip text="Static tooltip content goes here" target="#btn"/>
</div>
    `)
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = vm.$el.querySelector('button')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    triggerEvent(trigger, 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to manual', async () => {
    vm = createVm(`
  <section>
    <tooltip text="Static tooltip content goes here" trigger="manual" v-model="show">
      <btn>You Can't Trigger Tooltip Here...</btn>
    </tooltip>
    <hr/>
    <btn type="primary" @click="show = !show">Toggle Tooltip</btn>
  </section>
    `, {
      show: false
    })
    vm.show = true
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    vm.show = false
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to toggle correctly on fast click', async () => {
    vm = createVm('<btn v-tooltip.click="\'Static tooltip content\'" type="primary">Click</btn>')
    const button = vm.$el
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to click', async () => {
    vm = createVm('<btn v-tooltip.click="\'Static tooltip content\'" type="primary">Click</btn>')
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    triggerEvent(vm.$el, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    triggerEvent(vm.$el, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger to outside-click', async () => {
    vm = createVm('<btn v-tooltip.outside-click="\'Static tooltip content\'" type="primary">Outside-Click</btn>')
    const button = vm.$el
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    document.body.click()
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to disable', async () => {
    vm = createVm(`<tooltip text="Static tooltip content goes here" :enable="false">
  <btn type="primary">Disabled Tooltip</btn>
</tooltip>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    triggerEvent(vm.$el.querySelector('button'), 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to top', async () => {
    vm = createVm('<btn v-tooltip.top="\'Tooltip content on top\'" type="primary">Top</btn>')
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = vm.$el
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    triggerEvent(trigger, 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('top')
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to bottom', async () => {
    vm = createVm('<btn v-tooltip.bottom="\'Tooltip content on bottom\'" type="primary">Bottom</btn>')
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = vm.$el
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    triggerEvent(trigger, 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('bottom')
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to left', async () => {
    vm = createVm('<btn v-tooltip.left="\'Tooltip content on left\'" type="primary">Left</btn>')
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = vm.$el
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    triggerEvent(trigger, 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('left')
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change placement to right', async () => {
    vm = createVm('<btn v-tooltip.right="\'Tooltip content on right\'" type="primary">Right</btn>')
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    const trigger = vm.$el
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    triggerEvent(trigger, 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    const tooltip = document.querySelector('.tooltip')
    expect(tooltip).to.exist
    expect(tooltip.className).to.contain('right')
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change trigger in runtime', async () => {
    vm = createVm('<tooltip text="test" :trigger="trigger"><btn></btn></tooltip>', {
      trigger: 'focus'
    })
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'focus')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    vm.trigger = 'click'
    await vm.$nextTick()
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change text in runtime', async () => {
    vm = createVm('<tooltip :text="msg" trigger="click"><btn>123</btn></tooltip>', {
      msg: 'text'
    })
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    vm.msg = 'text2'
    await vm.$nextTick()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    expect(document.querySelector('.tooltip-inner').innerText).to.equal('text2')
    const topBefore = document.querySelector('.tooltip').style.top
    vm.msg = `This is a very very long text. This is a very very long text. This is a very very long text
    This is a very very long text. This is a very very long text. This is a very very long text`
    await vm.$nextTick()
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    expect(document.querySelector('.tooltip-inner').innerText).to.contain('This is a very very long text')
    await vm.$nextTick()
    const topAfter = document.querySelector('.tooltip').style.top
    expect(topAfter).not.equal(topBefore)
    vm.msg = ''
    await vm.$nextTick()
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })

  it('should be able to change enable in runtime', async () => {
    vm = createVm('<tooltip :text="msg" trigger="click" :enable="enable"><btn>123</btn></tooltip>', {
      msg: 'text',
      enable: true
    })
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(1)
    vm.enable = false
    await vm.$nextTick()
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
    await vm.$nextTick()
    vm.enable = true
    await vm.$nextTick()
    await sleep(300)
    expect(document.querySelectorAll('.tooltip').length).to.equal(0)
  })
})
