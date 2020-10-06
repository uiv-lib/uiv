import $ from 'jquery'
import { createVm, destroyVm, triggerEvent, sleep } from '../utils'

describe('Popover', () => {
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
    $('.popover').remove()
    $('body').attr('style', '')
  })

  it('should be ok to render if no trigger present', async () => {
    vm = createVm(`<popover v-model="show" title="123"><button data-role="trigger"></button></popover>`, {
      show: true
    })
    await vm.$nextTick()
  })

  it('should clear all timeouts before destroy', async () => {
    vm = createVm(`<popover ref="popover" v-model="show" title="123"></popover>`, { show: false })
    vm.$refs.popover.hideTimeoutId = 1
    vm.$refs.popover.showTimeoutId = 2
    vm.$refs.popover.transitionTimeoutId = 3
    vm.$refs.popover.autoTimeoutId = 4
    await vm.$nextTick()
    vm.$refs.popover.$destroy()
    await vm.$nextTick()
    expect(vm.$refs.popover.hideTimeoutId).to.equal(0)
    expect(vm.$refs.popover.showTimeoutId).to.equal(0)
    expect(vm.$refs.popover.transitionTimeoutId).to.equal(0)
    expect(vm.$refs.popover.autoTimeoutId).to.equal(0)
  })

  it('should be able to show popover on init', async () => {
    vm = createVm(`<popover v-model="show" title="123"><button data-role="trigger"></button></popover>`, {
      show: true
    })
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
  })

  it('should be able to use custom string append-to', async () => {
    vm = createVm(`<div id="test">
<popover append-to="#test" v-model="show" title="123">
<button data-role="trigger"></button>
</popover>
</div>`, {
      show: true
    })
    await sleep(300)
    expect(document.querySelectorAll('#test .popover').length).to.equal(1)
  })

  it('should be able to use custom element append-to', async () => {
    vm = createVm(`<div id="test" ref="el">
<popover v-if="appendTo" :append-to="appendTo" v-model="show" title="123">
<button data-role="trigger"></button>
</popover>
</div>`, {
      show: true,
      appendTo: null
    })
    await vm.$nextTick()
    vm.appendTo = vm.$refs.el
    await vm.$nextTick()
    await sleep(300)
    expect(document.querySelectorAll('#test .popover').length).to.equal(1)
  })

  it('should be able to use custom component append-to', async () => {
    vm = createVm(`<div id="test" ref="el">
<popover v-if="appendTo" :append-to="appendTo" v-model="show" title="123">
<button data-role="trigger"></button>
</popover>
</div>`, {
      show: true,
      appendTo: null
    })
    await vm.$nextTick()
    vm.appendTo = vm
    await vm.$nextTick()
    await sleep(300)
    expect(document.querySelectorAll('#test .popover').length).to.equal(1)
  })

  it('should be able to use popover directive', async () => {
    vm = createVm(`<btn v-popover="msg"></btn>`, {
      msg: { title: 'title', content: 'content' }
    })
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    let popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // this should work
    vm.msg = { title: 'title2', content: 'content2' }
    await vm.$nextTick()
    await vm.$nextTick()
    triggerEvent(trigger, 'click')
    await sleep(300)
    popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title2')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content2')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // this should not work
    vm.$set(vm.msg, 'title', 'title3')
    await vm.$nextTick()
    triggerEvent(trigger, 'click')
    await sleep(300)
    popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title2')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content2')
  })

  it('directive with invalid modifiers should be ok', async () => {
    // invalid modifier should be ok
    vm = createVm(`<btn v-popover.test1.test2="msg"></btn>`, {
      msg: { title: 'title', content: 'content' }
    })
    await vm.$nextTick()
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.querySelector('.popover-title').innerText).to.equal('title')
    expect(popover.querySelector('.popover-content').innerText).to.equal('content')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should not show popover with no title and content', async () => {
    vm = createVm(`<popover v-model="show"><button data-role="trigger"></button></popover>`, {
      show: true
    })
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to use custom target', async () => {
    vm = createVm(`<div><button ref="btn" type="button">btn</button><popover :target="btn" trigger="focus" title="123"></popover></div>`,
      { btn: null },
      {
        mounted () {
          this.btn = this.$refs.btn
        }
      }
    )
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    triggerEvent(vm.btn, 'focus')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
  })

  it('should be able to show popover on click', async () => {
    vm = createVm(`
<div>
  <btn type="primary" id="btn">Popover</btn>
  <popover title="Title" target="#btn">
    <template slot="popover">
      <h1>Hello world!</h1>
    </template>
  </popover>
</div>
    `)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    triggerEvent(vm.$el.querySelector('button'), 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(vm.$el.querySelector('button'), 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to manual', async () => {
    vm = createVm(`
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
    `, { show: false })
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    vm.show = true
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    vm.show = false
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able change trigger to hover-focus', async () => {
    vm = createVm(`<btn v-popover.hover-focus="{title:'Title', content:'Popover content'}" type="primary">Hover-Focus</btn>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    const trigger = vm.$el
    triggerEvent(trigger, 'focus')
    await sleep(300)
    Element.prototype.matches = savedMatches
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to click', async () => {
    vm = createVm(`<btn v-popover.click="{title:'Title', content:'Popover content'}" type="primary">Click</btn>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to hover', async () => {
    vm = createVm(`<btn v-popover.hover="{title:'Title', content:'Popover content'}" type="primary">Hover</btn>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'mouseenter')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(trigger, 'mouseleave')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to toggle correctly on fast click', async () => {
    vm = createVm(`<btn v-popover.click="{title:'Title', content:'Popover content'}" type="primary">Click</btn>`)
    const button = vm.$el
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger to outside-click', async () => {
    vm = createVm(`<btn v-popover="{title:'Title', content:'Popover content'}" type="primary">Outside-Click (Default)</btn>`)
    const button = vm.$el
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    triggerEvent(button, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    document.body.click()
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to disable', async () => {
    vm = createVm(`
<popover title="Title" :enable="false">
  <btn type="primary">Disabled Popover</btn>
  <template slot="popover">
    <h1>Hello world!</h1>
  </template>
</popover>
    `)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    triggerEvent(vm.$el.querySelector('button'), 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to hide title', async () => {
    vm = createVm(`<btn v-popover="{content:'Popover without a title'}" type="primary">Popover</btn>`)
    await vm.$nextTick()
    const trigger = vm.$el
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    expect(document.querySelector('.popover .popover-title').style.display).to.equal('none')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to top', async () => {
    vm = createVm(`<btn v-popover.top="{title:'Title', content:'Popover on top'}" type="primary">Top</btn>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('top')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to bottom', async () => {
    vm = createVm(`<btn v-popover.bottom="{title:'Title', content:'Popover on bottom'}" type="primary">Bottom</btn>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('bottom')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to left', async () => {
    vm = createVm(`<btn v-popover.left="{title:'Title', content:'Popover on left'}" type="primary">Left</btn>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('left')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change placement to right', async () => {
    vm = createVm(`<btn v-popover.right="{title:'Title', content:'Popover on right'}" type="primary">Right</btn>`)
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    const trigger = vm.$el
    triggerEvent(trigger, 'click')
    await sleep(300)
    const popover = document.querySelector('.popover')
    expect(popover).to.exist
    expect(popover.className).to.contain('right')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change trigger in runtime', async () => {
    vm = createVm(`<popover title="123" :trigger="trigger"><button data-role="trigger"></button></popover>`, {
      trigger: 'focus'
    })
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'focus')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    vm.trigger = 'click'
    await vm.$nextTick()
    triggerEvent(trigger, 'blur')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to change content in runtime', async () => {
    vm = createVm(`<popover :content="msg" trigger="click"><btn>123</btn></popover>`, {
      msg: 'text'
    })
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    await vm.$nextTick()
    vm.msg = 'text2'
    await vm.$nextTick()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    expect(document.querySelector('.popover-content').innerText).to.equal('text2')
    const topBefore = document.querySelector('.popover').style.top
    vm.msg = `
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
This is a very very long text. This is a very very long text. This is a very very long text
    `
    await vm.$nextTick()
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    expect(document.querySelector('.popover-content').innerText).to.contain('This is a very very long text')
    await vm.$nextTick()
    const topAfter = document.querySelector('.popover').style.top
    expect(topAfter).not.equal(topBefore)
    triggerEvent(trigger, 'click')
    await sleep(300)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to show/hide on specified delay', async function () {
    vm = createVm(
      `<popover :showDelay="300" :hideDelay="400" trigger="hover" title="123"><button></button></popover>`
    )
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'mouseenter')
    await sleep(150)
    // not shown yet
    expect(document.querySelectorAll('.popover').length).to.equal(0)
    await sleep(150)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(trigger, 'mouseleave')
    await sleep(300)
    // not hidden yet
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    await sleep(400)
    expect(document.querySelectorAll('.popover').length).to.equal(0)
  })

  it('should be able to show even when hideDelay < showDelay < transition ', async function () {
    vm = createVm(
      `<popover :hideDelay="1" :showDelay="100" :transition="500" trigger="hover" title="123"><button></button></popover>`
    )
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('button')
    triggerEvent(trigger, 'mouseenter')
    await sleep(200)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
    triggerEvent(trigger, 'mouseleave')
    await sleep(200)
    triggerEvent(trigger, 'mouseenter')
    await sleep(600)
    expect(document.querySelectorAll('.popover').length).to.equal(1)
  })
})
