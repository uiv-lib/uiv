import { createWrapper, destroyVm, triggerEvent, keyCodes } from '../utils'
import $ from 'jquery'

function appendToBodyVm() {
  return createWrapper(`<div><dropdown append-to-body>
  <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown with append-to-body + menu-right -->
<dropdown append-to-body menu-right>
  <btn class="dropdown-toggle">Menu-Right <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown with append-to-body + dropup -->
<dropdown append-to-body dropup>
  <btn class="dropdown-toggle">Dropup <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown></div>`)
}

function baseVm() {
  return createWrapper(`<div><dropdown ref="dropdown">
  <btn type="primary" class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<dropdown>
  <btn type="info">Split Button</btn>
  <btn type="info" class="dropdown-toggle"><span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown></div>`)
}

function assertKeyboardNav(trigger, dropdown, index, keyCode, called = true) {
  const $dropdown = $(dropdown)
  const spy = sinon.spy($dropdown.find('li > a').get(index), 'focus')
  triggerEvent(trigger, 'keydown', { keyCode: keyCode })
  if (called) {
    sinon.assert.called(spy)
  } else {
    sinon.assert.notCalled(spy)
  }
  $dropdown.find('li > a').removeAttr('focus')
  $dropdown.find('li > a').eq(index).attr('focus', true)
  $dropdown.find('li > a').get(index).focus.restore()
}

describe('Dropdown', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to open dropdown on trigger click', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
  })

  it('should be able to close dropdown using keyboard esc', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    triggerEvent(trigger, 'keydown', { keyCode: keyCodes.esc })
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to navigate between items using keyboard up & down', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    assertKeyboardNav(trigger, dropdown, 0, keyCodes.down)
    assertKeyboardNav(trigger, dropdown, 1, keyCodes.down)
    assertKeyboardNav(trigger, dropdown, 0, keyCodes.up)
    assertKeyboardNav(trigger, dropdown, 0, keyCodes.up, false)
    assertKeyboardNav(trigger, dropdown, 1, keyCodes.down)
    assertKeyboardNav(trigger, dropdown, 2, keyCodes.down)
    assertKeyboardNav(trigger, dropdown, 3, keyCodes.down)
    assertKeyboardNav(trigger, dropdown, 3, keyCodes.down, false)
  })

  it('should not be able to navigate between items using keyboard up & down when dropdown is not open', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    assertKeyboardNav(trigger, dropdown, 0, keyCodes.down, false)
  })

  it('should be able to navigate between items and select with keyboard enter', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    assertKeyboardNav(trigger, dropdown, 0, keyCodes.down)
    const spy = sinon.spy($(dropdown).find('li > a').get(0), 'click')
    triggerEvent(trigger, 'keydown', { keyCode: keyCodes.enter })
    sinon.assert.called(spy)
  })

  it('should ignore other keys when open', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    assertKeyboardNav(trigger, dropdown, 0, keyCodes.down)
    assertKeyboardNav(trigger, dropdown, 1, keyCodes.left, false)
  })

  it('should be able to close dropdown on trigger click', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to close dropdown on window click', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    // Simulate a window click
    vm.$refs.dropdown.windowClicked({ target: document.body })
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should not close dropdown on self click if not-close-elements contains component ref and with append-to-body', async () => {
    const wrapper = createWrapper(
      `<dropdown v-model="show" ref="test" append-to-body :not-close-elements="eles">
  <button class="btn btn-default dropdown-toggle" type="button">
    <span>Dropdown 1</span><span class="caret"></span>
  </button>
  <template slot="dropdown">
    <li ref="li1"><a href="#">Action</a></li>
    <li ref="li2"><a href="#">Action2</a></li>
  </template>
</dropdown>`,
      {
        show: true,
        eles: [],
      },
      {
        mounted() {
          this.eles.push(this.$refs.li1)
        },
      }
    )
    await vm.$nextTick()
    const dropdown = vm.$el
    expect(dropdown.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.className).toContain('open')
    // Simulate a window click
    vm.$refs.test.windowClicked({ target: vm.$refs.li1 })
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    // Simulate a window click
    vm.$refs.test.windowClicked({ target: document.body })
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    vm.show = true
    await vm.$nextTick()
    // Simulate a window click
    vm.$refs.test.windowClicked({ target: vm.$refs.li2 })
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to open dropdown append to body on trigger click', async () => {
    vm = appendToBodyVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelector('.dropdown-menu')).not.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to use dropup style', async () => {
    const wrapper = createWrapper(`<div><dropdown dropup>
  <btn class="dropdown-toggle">Dropup <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown></div>`)
    await vm.$nextTick()
    const dropup = vm.$el.querySelector('.dropup')
    expect(dropup.className).to.not.contain('open')
    expect(dropup.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to use menu-right style', async () => {
    const wrapper = createWrapper(`<div><dropdown menu-right>
  <btn class="dropdown-toggle">Menu-Right <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown></div>`)
    await vm.$nextTick()
    const menuRight = vm.$el.querySelector('.dropdown')
    expect(menuRight.querySelector('.dropdown-menu').className).toContain(
      'dropdown-menu-right'
    )
  })

  it('should be able to open dropdown append to body & menu-right on trigger click', async () => {
    vm = appendToBodyVm()
    const dropdown = vm.$el.querySelectorAll('.dropdown')[1]
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu-right')).to.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelector('.dropdown-menu-right')).not.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu-right')).to.exist
  })

  it('should be able to open dropdown append to body & dropup on trigger click', async () => {
    vm = appendToBodyVm()
    const dropdown = vm.$el.querySelector('.dropup')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelector('.dropdown-menu')).not.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to open dropdown on init', async () => {
    const wrapper = createWrapper(
      '<dropdown v-model="show"><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template slot="dropdown"><li><a href="#">Action</a></li></template></dropdown>',
      {
        show: true,
      }
    )
    await vm.$nextTick()
    const dropdown = vm.$el
    expect(dropdown.className).toContain('open')
  })

  it('should be able to disable dropdown', async () => {
    const wrapper = createWrapper(
      '<dropdown v-model="show" disabled><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template slot="dropdown"><li><a href="#">Action</a></li></template></dropdown>',
      {
        show: true,
      }
    )
    await vm.$nextTick()
    const dropdown = vm.$el
    expect(dropdown.className).not.contain('open')
  })

  it('should be able to init with no trigger', async () => {
    const wrapper = createWrapper('<dropdown/>')
    await vm.$nextTick()
  })
})
