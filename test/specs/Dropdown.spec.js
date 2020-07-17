import { createVm, destroyVm, triggerEvent } from '../utils'

function appendToBodyVm () {
  return createVm(`<div><dropdown append-to-body>
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

function baseVm () {
  return createVm(`<div><dropdown ref="dropdown">
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

describe('Dropdown', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to open dropdown on trigger click', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close dropdown on trigger click', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to close dropdown on window click', async () => {
    vm = baseVm()
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    // Simulate a window click
    vm.$refs.dropdown.windowClicked({ target: document.body })
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should not close dropdown on self click if not-close-elements contains component ref and with append-to-body', async () => {
    vm = createVm(`<dropdown v-model="show" ref="test" append-to-body :not-close-elements="eles">
<button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button>
<template slot="dropdown"><li><a href="#">Action</a></li></template>
</dropdown>`, {
      show: true,
      eles: []
    }, {
      mounted () {
        this.eles.push(this.$el)
      }
    })
    await vm.$nextTick()
    const dropdown = vm.$el
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.contain('open')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    // Simulate a window click
    vm.$refs.test.windowClicked({ target: vm.$el })
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    // Simulate a window click
    vm.$refs.test.windowClicked({ target: document.body })
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
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).not.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to use dropup style', async () => {
    vm = createVm(`<div><dropdown dropup>
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
    vm = createVm(`<div><dropdown menu-right>
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
    expect(menuRight.querySelector('.dropdown-menu').className).to.contain('dropdown-menu-right')
  })

  it('should be able to open dropdown append to body & menu-right on trigger click', async () => {
    vm = appendToBodyVm()
    const dropdown = vm.$el.querySelectorAll(`.dropdown`)[1]
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu-right')).to.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
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
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).not.exist
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
  })

  it('should be able to open dropdown on init', async () => {
    vm = createVm('<dropdown v-model="show"><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template slot="dropdown"><li><a href="#">Action</a></li></template></dropdown>', {
      show: true
    })
    await vm.$nextTick()
    const dropdown = vm.$el
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to disable dropdown', async () => {
    vm = createVm('<dropdown v-model="show" disabled><button class="btn btn-default dropdown-toggle" type="button"><span>Dropdown 1</span><span class="caret"></span></button><template slot="dropdown"><li><a href="#">Action</a></li></template></dropdown>', {
      show: true
    })
    await vm.$nextTick()
    const dropdown = vm.$el
    expect(dropdown.className).not.contain('open')
  })

  it('should be able to init with no trigger', async () => {
    vm = createVm('<dropdown/>')
    await vm.$nextTick()
  })
})
