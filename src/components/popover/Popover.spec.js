import newLocale from '../../locale/lang/zh-CN'
import {
  createWrapper,
  keyCodes,
  nextTick,
  sleep,
  transition,
  triggerEvent,
} from '../../__test__/utils'
import { RouterLinkStub } from '@vue/test-utils'
import _ from 'lodash'

describe('Popover', () => {
  beforeEach(() => {
    document.body.style.display = 'flex'
    document.body.style.justifyContent = 'center'
    document.body.style.alignItems = 'center'
    document.body.style.paddingTop = '200px'
  })

  afterEach(() => {
    document.body.style.display = ''
    document.body.style.justifyContent = ''
    document.body.style.alignItems = ''
    document.body.style.paddingTop = ''
  })

  it('should be ok to render if no trigger present', async () => {
    const wrapper = createWrapper(
      '<popover v-model="show" title="123"><button data-role="trigger"></button></popover>',
      {
        show: true,
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
  })

  it('should clear all timeouts before destroy', async () => {
    const wrapper = createWrapper(
      '<popover ref="popover" v-model="show" title="123"></popover>',
      { show: false }
    )
    const vm = wrapper.vm
    vm.$refs.popover.hideTimeoutId = 1
    vm.$refs.popover.showTimeoutId = 2
    vm.$refs.popover.transitionTimeoutId = 3
    vm.$refs.popover.autoTimeoutId = 4
    await vm.$nextTick()
    vm.$refs.popover.$destroy()
    await vm.$nextTick()
    expect(vm.$refs.popover.hideTimeoutId).toEqual(0)
    expect(vm.$refs.popover.showTimeoutId).toEqual(0)
    expect(vm.$refs.popover.transitionTimeoutId).toEqual(0)
    expect(vm.$refs.popover.autoTimeoutId).toEqual(0)
  })

  it('should be able to show popover on init', async () => {
    const wrapper = createWrapper(
      '<popover v-model="show" title="123"><button data-role="trigger"></button></popover>',
      {
        show: true,
      }
    )
    const vm = wrapper.vm
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
  })

  it('should hide popover while enable set to false', async () => {
    const wrapper = createWrapper(
      '<popover v-model="show" title="123" :enable="enable"><button data-role="trigger"></button></popover>',
      {
        show: true,
        enable: true,
      }
    )
    const vm = wrapper.vm
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    vm.enable = false
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should hide popover while all content become empty', async () => {
    const wrapper = createWrapper(
      '<popover v-model="show" :title="title" :content="content"><button data-role="trigger"></button></popover>',
      {
        show: true,
        content: '123',
        title: '321',
      }
    )
    const vm = wrapper.vm
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    vm.content = ''
    vm.title = ''
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to use custom string append-to', async () => {
    const wrapper = createWrapper(
      `<div id="test">
<popover append-to="#test" v-model="show" title="123">
<button data-role="trigger"></button>
</popover>
</div>`,
      {
        show: true,
      }
    )
    const vm = wrapper.vm
    await sleep(300)
    expect(document.querySelectorAll('#test .popover').length).toEqual(1)
  })

  it('should be able to use custom element append-to', async () => {
    const wrapper = createWrapper(
      `<div id="test" ref="el">
<popover v-if="appendTo" :append-to="appendTo" v-model="show" title="123">
<button data-role="trigger"></button>
</popover>
</div>`,
      {
        show: true,
        appendTo: null,
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    vm.appendTo = vm.$refs.el
    await vm.$nextTick()
    await sleep(300)
    expect(document.querySelectorAll('#test .popover').length).toEqual(1)
  })

  it('should be able to use custom component append-to', async () => {
    const wrapper = createWrapper(
      `<div id="test" ref="el">
<popover v-if="appendTo" :append-to="appendTo" v-model="show" title="123">
<button data-role="trigger"></button>
</popover>
</div>`,
      {
        show: true,
        appendTo: null,
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    vm.appendTo = vm
    await vm.$nextTick()
    await sleep(300)
    expect(document.querySelectorAll('#test .popover').length).toEqual(1)
  })

  it('should be able to use popover directive', async () => {
    const wrapper = createWrapper('<btn v-popover="msg"></btn>', {
      msg: { title: 'title', content: 'content' },
    })
    const vm = wrapper.vm
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    let popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.querySelector('.popover-title').textContent).toEqual('title')
    expect(popover.querySelector('.popover-content').textContent).toEqual(
      'content'
    )
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    // this should work
    vm.msg = { title: 'title2', content: 'content2' }
    await vm.$nextTick()
    await vm.$nextTick()
    triggerEvent(trigger, 'click')
    await sleep(300)
    popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.querySelector('.popover-title').textContent).toEqual(
      'title2'
    )
    expect(popover.querySelector('.popover-content').textContent).toEqual(
      'content2'
    )
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    // this should not work
    vm.$set(vm.msg, 'title', 'title3')
    await vm.$nextTick()
    triggerEvent(trigger, 'click')
    await sleep(300)
    popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.querySelector('.popover-title').textContent).toEqual(
      'title2'
    )
    expect(popover.querySelector('.popover-content').textContent).toEqual(
      'content2'
    )
  })

  it('directive with invalid modifiers should be ok', async () => {
    // invalid modifier should be ok
    const wrapper = createWrapper('<btn v-popover.test1.test2="msg"></btn>', {
      msg: { title: 'title', content: 'content' },
    })
    const vm = wrapper.vm
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.querySelector('.popover-title').textContent).toEqual('title')
    expect(popover.querySelector('.popover-content').textContent).toEqual(
      'content'
    )
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should not show popover with no title and content', async () => {
    const wrapper = createWrapper(
      '<popover v-model="show"><button data-role="trigger"></button></popover>',
      {
        show: true,
      }
    )
    const vm = wrapper.vm
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to use custom target', async () => {
    const wrapper = createWrapper(
      '<div><button ref="btn" type="button">btn</button><popover :target="btn" trigger="focus" title="123"></popover></div>',
      { btn: null },
      {
        mounted() {
          this.btn = this.$refs.btn
        },
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    triggerEvent(vm.btn, 'focus')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
  })

  it('should be able to show popover on click', async () => {
    const wrapper = createWrapper(`
<div>
  <btn type="primary" id="btn">Popover</btn>
  <popover title="Title" target="#btn">
    <template slot="popover">
      <h1>Hello world!</h1>
    </template>
  </popover>
</div>
    `)
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    triggerEvent(vm.$el.querySelector('button'), 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(vm.$el.querySelector('button'), 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change trigger to manual', async () => {
    const wrapper = createWrapper(
      `
  <section>
    <popover title="Title" trigger="manual" v-model="show">
      <btn>You Can't Trigger Popover Here...</btn>
      <template slot="popover">
        <p>Popover content</p>
      </template>
    </popover>
    <hr/>
    <btn type="primary" @click="show = !show">Toggle Popover</btn>
  </section>
    `,
      { show: false }
    )
    const vm = wrapper.vm
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    vm.show = true
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    vm.show = false
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  // todo
  it.skip('should be able change trigger to hover-focus', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.hover-focus="{title:\'Title\', content:\'Popover content\'}" type="primary">Hover-Focus</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    const trigger = vm.$el
    triggerEvent(trigger, 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change trigger to click', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.click="{title:\'Title\', content:\'Popover content\'}" type="primary">Click</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change trigger to hover', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.hover="{title:\'Title\', content:\'Popover content\'}" type="primary">Hover</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'mouseenter')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(trigger, 'mouseleave')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to toggle correctly on fast click', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.click="{title:\'Title\', content:\'Popover content\'}" type="primary">Click</btn>'
    )
    const vm = wrapper.vm
    const button = vm.$el
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change trigger to outside-click', async () => {
    const wrapper = createWrapper(
      '<btn v-popover="{title:\'Title\', content:\'Popover content\'}" type="primary">Outside-Click (Default)</btn>'
    )
    const vm = wrapper.vm
    const button = vm.$el
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    document.body.click()
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to disable', async () => {
    const wrapper = createWrapper(`
<popover title="Title" :enable="false">
  <btn type="primary">Disabled Popover</btn>
  <template slot="popover">
    <h1>Hello world!</h1>
  </template>
</popover>
    `)
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    triggerEvent(vm.$el.querySelector('button'), 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to hide title', async () => {
    const wrapper = createWrapper(
      '<btn v-popover="{content:\'Popover without a title\'}" type="primary">Popover</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    const trigger = vm.$el
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    expect(
      document.querySelector('.popover .popover-title').style.display
    ).toEqual('none')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change placement to top', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.top="{title:\'Title\', content:\'Popover on top\'}" type="primary">Top</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.className).toContain('top')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change placement to bottom', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.bottom="{title:\'Title\', content:\'Popover on bottom\'}" type="primary">Bottom</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.className).toContain('bottom')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change placement to left', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.left="{title:\'Title\', content:\'Popover on left\'}" type="primary">Left</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.className).toContain('left')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change placement to right', async () => {
    const wrapper = createWrapper(
      '<btn v-popover.right="{title:\'Title\', content:\'Popover on right\'}" type="primary">Right</btn>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).toBeDefined()
    expect(popover.className).toContain('right')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to change trigger in runtime', async () => {
    const wrapper = createWrapper(
      '<popover title="123" :trigger="trigger"><button data-role="trigger"></button></popover>',
      {
        trigger: 'focus',
      }
    )
    const vm = wrapper.vm
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'focus')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    vm.trigger = 'click'
    await vm.$nextTick()
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  // todo
  it.skip('should be able to change content in runtime', async () => {
    const wrapper = createWrapper(
      '<popover :content="msg" trigger="click"><btn>123</btn></popover>',
      {
        msg: 'text',
      }
    )
    const vm = wrapper.vm
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    await vm.$nextTick()
    vm.msg = 'text2'
    await vm.$nextTick()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    expect(document.querySelector('.popover-content').textContent).toEqual(
      'text2'
    )
    const topBefore = document.querySelector('.popover').style.top
    vm.msg = `
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
    `
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    expect(document.querySelector('.popover-content').textContent).toContain(
      'This is a very very long text'
    )
    await vm.$nextTick()
    const topAfter = document.querySelector('.popover').style.top
    expect(topAfter).not.toEqual(topBefore)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to show/hide on specified delay', async function () {
    const wrapper = createWrapper(
      '<popover :showDelay="300" :hideDelay="400" trigger="hover" title="123"><button></button></popover>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'mouseenter')
    await sleep(150)
    // not shown yet
    expect(document.querySelectorAll('.popover').length).toEqual(0)
    await sleep(150)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(trigger, 'mouseleave')
    await sleep(300)
    // not hidden yet
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    await sleep(400)
    expect(document.querySelectorAll('.popover').length).toEqual(0)
  })

  it('should be able to show even when hideDelay < showDelay < transition ', async function () {
    const wrapper = createWrapper(
      '<popover :hideDelay="1" :showDelay="100" :transition="500" trigger="hover" title="123"><button></button></popover>'
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'mouseenter')
    await sleep(200)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
    triggerEvent(trigger, 'mouseleave')
    await sleep(200)
    triggerEvent(trigger, 'mouseenter')
    await sleep(600)
    expect(document.querySelectorAll('.popover').length).toEqual(1)
  })
})
