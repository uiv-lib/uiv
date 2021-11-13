import { createWrapper, nextTick, triggerEvent } from '../../__test__/utils'
import Dropdown from './Dropdown'

function appendToBodyVm() {
  return createWrapper(`<div><dropdown append-to-body>
  <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
  <template #dropdown>
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
  <template #dropdown>
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
  <template #dropdown>
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
  <template #dropdown>
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
  <template #dropdown>
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown></div>`)
}

async function assertKeyboardNav(
  trigger,
  wrapper,
  index,
  keyCode,
  called = true
) {
  const spy = jest.spyOn(wrapper.findAll('li > a').at(index).element, 'focus')
  await triggerEvent(trigger, `keydown.${keyCode}`)
  if (called) {
    expect(spy).toBeCalled()
  } else {
    expect(spy).not.toBeCalled()
  }
  spy.mockRestore()
  // wrapper.find('li > a').removeAttr('focus')
  // wrapper.find('li > a').at(index).attr('focus', true)
}

describe('Dropdown', () => {
  it('should be able to open dropdown on trigger click', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    await nextTick()
    expect(dropdown.classes()).toContain('open')
  })

  it('should be able to close dropdown using keyboard esc', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    await triggerEvent(trigger, 'keydown.esc')
    expect(dropdown.classes()).not.toContain('open')
  })

  it('should be able to navigate between items using keyboard up & down', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    await assertKeyboardNav(trigger, dropdown, 0, 'down')
    await assertKeyboardNav(trigger, dropdown, 1, 'down')
    await assertKeyboardNav(trigger, dropdown, 0, 'up')
    await assertKeyboardNav(trigger, dropdown, 0, 'up', false)
    await assertKeyboardNav(trigger, dropdown, 1, 'down')
    await assertKeyboardNav(trigger, dropdown, 2, 'down')
    await assertKeyboardNav(trigger, dropdown, 3, 'down')
    await assertKeyboardNav(trigger, dropdown, 3, 'down', false)
  })

  it('should not be able to navigate between items using keyboard up & down when dropdown is not open', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await assertKeyboardNav(trigger, dropdown, 0, 'down', false)
  })

  it('should be able to navigate between items and select with keyboard enter', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    await assertKeyboardNav(trigger, dropdown, 0, 'down')
    const spy = jest.spyOn(dropdown.findAll('li > a')[0].element, 'click')
    await triggerEvent(trigger, 'keydown.enter')
    expect(spy).toBeCalled()
  })

  it('should ignore other keys when open', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    await assertKeyboardNav(trigger, dropdown, 0, 'down')
    await assertKeyboardNav(trigger, dropdown, 1, 'left', false)
  })

  it('should be able to close dropdown on trigger click', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).not.toContain('open')
  })

  it('should be able to close dropdown on window click', async () => {
    const wrapper = baseVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    // Simulate a window click
    wrapper.vm.$refs.dropdown.windowClicked({ target: document.body })
    await nextTick()
    expect(dropdown.classes()).not.toContain('open')
  })

  it('should not close dropdown on self click if not-close-elements contains component ref and with append-to-body', async () => {
    const wrapper = createWrapper(
      `<dropdown v-model="show" ref="test" append-to-body :not-close-elements="eles">
  <button class="btn btn-default dropdown-toggle" type="button">
    <span>Dropdown 1</span><span class="caret"></span>
  </button>
  <template #dropdown>
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
    await nextTick()
    const dropdown = wrapper
    expect(dropdown.element.tagName.toLowerCase()).toEqual('div')
    expect(dropdown.classes()).toContain('open')
    // Simulate a window click
    wrapper.vm.$refs.test.windowClicked({ target: wrapper.vm.$refs.li1 })
    await nextTick()
    expect(dropdown.classes()).toContain('open')
    // Simulate a window click
    wrapper.vm.$refs.test.windowClicked({ target: document.body })
    await nextTick()
    expect(dropdown.classes()).not.toContain('open')
    wrapper.vm.show = true
    await nextTick()
    // Simulate a window click
    wrapper.vm.$refs.test.windowClicked({ target: wrapper.vm.$refs.li2 })
    await nextTick()
    expect(dropdown.classes()).not.toContain('open')
  })

  it('should be able to open dropdown append to body on trigger click', async () => {
    const wrapper = appendToBodyVm()
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.classes()).not.toContain('open')
    // console.log(wrapper.html())
    expect(dropdown.find('.dropdown-menu')).toBeDefined()
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    expect(document.querySelectorAll('body>.dropdown-menu').length).toEqual(1)
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).not.toContain('open')
    expect(dropdown.find('.dropdown-menu')).toBeDefined()
  })

  it('should be able to use dropup style', async () => {
    const wrapper = createWrapper(`<div><dropdown dropup>
  <btn class="dropdown-toggle">Dropup <span class="caret"></span></btn>
  <template #dropdown>
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown></div>`)
    await nextTick()
    const dropup = wrapper.find('.dropup')
    expect(dropup.classes()).not.toContain('open')
    expect(dropup.find('.dropdown-menu')).toBeDefined()
  })

  it('should be able to use menu-right style', async () => {
    const wrapper = createWrapper(`<div><dropdown menu-right>
  <btn class="dropdown-toggle">Menu-Right <span class="caret"></span></btn>
  <template #dropdown>
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown></div>`)
    await nextTick()
    const menuRight = wrapper.find('.dropdown')
    expect(menuRight.find('.dropdown-menu').classes()).toContain(
      'dropdown-menu-right'
    )
  })

  it('should be able to open dropdown append to body & menu-right on trigger click', async () => {
    const wrapper = appendToBodyVm()
    const dropdown = wrapper.findAll('.dropdown')[1]
    const trigger = dropdown.find('button')
    expect(dropdown.classes()).not.toContain('open')
    expect(dropdown.findAll('.dropdown-menu-right').length).toEqual(1)
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    expect(
      document.querySelectorAll('body > .dropdown-menu-right').length
    ).toEqual(1)
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).not.toContain('open')
    expect(dropdown.find('.dropdown-menu-right')).toBeDefined()
  })

  it('should be able to open dropdown append to body & dropup on trigger click', async () => {
    const wrapper = appendToBodyVm()
    const dropdown = wrapper.find('.dropup')
    const trigger = dropdown.find('button')
    expect(dropdown.classes()).not.toContain('open')
    expect(dropdown.findAll('.dropdown-menu').length).toEqual(1)
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    expect(document.querySelectorAll('body>.dropdown-menu').length).toEqual(1)
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).not.toContain('open')
    expect(dropdown.find('.dropdown-menu')).toBeDefined()
  })

  it('should be able to open dropdown on init', async () => {
    const wrapper = createWrapper(
      '<dropdown v-model="show"><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template #dropdown><li><a href="#">Action</a></li></template></dropdown>',
      {
        show: true,
      }
    )
    await nextTick()
    const dropdown = wrapper
    expect(dropdown.classes()).toContain('open')
  })

  it('should be able to disable dropdown', async () => {
    const wrapper = createWrapper(
      '<dropdown v-model="show" disabled><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template #dropdown><li><a href="#">Action</a></li></template></dropdown>',
      {
        show: true,
      }
    )
    await nextTick()
    const dropdown = wrapper
    expect(dropdown.classes()).not.toContain('open')
  })

  it('should be able to init with no trigger', async () => {
    const wrapper = createWrapper('<dropdown/>')
    await nextTick()
  })
})
