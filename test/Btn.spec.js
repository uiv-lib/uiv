import $ from 'jquery'
import { createVm, destroyVm, triggerEvent } from '../utils'

describe('Btn', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to render btn types', () => {
    vm = createVm(`<div>
<btn>Default</btn>
<btn type="primary">Primary</btn>
<btn type="success">Success</btn>
<btn type="info">Info</btn>
<btn type="warning">Warning</btn>
<btn type="danger">Danger</btn>
<btn type="link">Link</btn>
</div>`)
    const $cont = $(vm.$el)
    const $btns = $('button.btn', $cont)
    expect($btns.length).to.equal(7)
    // all render as type=button
    const $btnsType = $('[type=button]', $cont)
    expect($btnsType.length).to.equal(7)
    // classnames
    expect($btns.get(0).className).to.contain('btn-default')
    expect($btns.get(1).className).to.contain('btn-primary')
    expect($btns.get(2).className).to.contain('btn-success')
    expect($btns.get(3).className).to.contain('btn-info')
    expect($btns.get(4).className).to.contain('btn-warning')
    expect($btns.get(5).className).to.contain('btn-danger')
    expect($btns.get(6).className).to.contain('btn-link')
  })

  it('should be able to render link btn', () => {
    vm = createVm(`<div><h4>Native links</h4>
<btn href="#">Default</btn>
<btn href="#" type="primary">Primary</btn>
<h4>Vue Router links</h4>
<btn to="/">Default</btn>
<btn to="/" type="primary">Primary</btn></div>`)
    const $btnLinks = $(vm.$el)
    expect($('button', $btnLinks).length).to.equal(0)
    expect($('a.btn', $btnLinks).length).to.equal(4)
    // native links
    const $btn = $('.btn', $btnLinks)
    const $btn0 = $($btn.get(0))
    expect($btn0.attr('class')).to.contain('btn-default')
    expect($btn0.attr('href')).to.equal('#')
    expect($btn0.attr('role')).to.equal('button')
    const $btn1 = $($btn.get(1))
    expect($btn1.attr('class')).to.contain('btn-primary')
    expect($btn1.attr('href')).to.equal('#')
    expect($btn1.attr('role')).to.equal('button')
    // router links
    const $btn2 = $($btn.get(2))
    expect($btn2.attr('class')).to.contain('btn-default')
    expect($btn2.attr('href')).to.equal('#router-link')
    expect($btn2.attr('role')).to.equal('button')
    const $btn3 = $($btn.get(3))
    expect($btn3.attr('class')).to.contain('btn-primary')
    expect($btn3.attr('href')).to.equal('#router-link')
    expect($btn3.attr('role')).to.equal('button')
  })

  it('should be able to render different size btn', () => {
    vm = createVm(`<div>
  <btn size="lg" type="primary">Large button</btn>
  <btn size="lg">Large button</btn>
  <btn type="primary">Default button</btn>
  <btn>Default button</btn>
  <btn size="sm" type="primary">Small button</btn>
  <btn size="sm">Small button</btn>
  <btn size="xs" type="primary">Extra small button</btn>
  <btn size="xs">Extra small button</btn>
</div>`)
    const $btnSizes = $(vm.$el)
    const $btn = $('.btn', $btnSizes)
    expect($btn.length).to.equal(8)
    expect($btn.get(0).className).to.contain('btn-lg')
    expect($btn.get(1).className).to.contain('btn-lg')
    expect($btn.get(4).className).to.contain('btn-sm')
    expect($btn.get(5).className).to.contain('btn-sm')
    expect($btn.get(6).className).to.contain('btn-xs')
    expect($btn.get(7).className).to.contain('btn-xs')
  })

  it('should be able to render block level btn', () => {
    vm =
      createVm(`<div><btn block size="lg" type="primary">Block level button</btn>
<btn block size="lg">Block level button</btn></div>`)
    const $btnBlock = $(vm.$el)
    expect($btnBlock.find('.btn.btn-block').length).to.equal(2)
  })

  it('should be able to render active btn', () => {
    vm = createVm(`<div><h4>Buttons</h4>
<btn active type="primary">Primary button</btn>
<btn active>Button</btn>
<h4>Links</h4>
<btn active href="#" type="primary">Primary button</btn>
<btn active to="/">Button</btn></div>`)
    const $btnActive = $(vm.$el)
    expect($btnActive.find('.btn.active').length).to.equal(4)
    expect($btnActive.find('button.active').length).to.equal(2)
    expect($btnActive.find('a.active').length).to.equal(2)
  })

  it('should be able to render disabled btn', () => {
    vm = createVm(`<div><h4>Buttons</h4>
<btn disabled type="primary">Primary button</btn>
<btn disabled>Button</btn>
<h4>Links</h4>
<btn disabled href="#" type="primary">Primary button</btn>
<btn disabled to="/">Button</btn></div>`)
    const $btnDisabled = $(vm.$el)
    expect($btnDisabled.find('.btn').length).to.equal(4)
    expect($btnDisabled.find('.btn.disabled').length).to.equal(4)
    expect($btnDisabled.find('.btn[disabled]').length).to.equal(2)
  })

  it('should not response on disabled link btn click', async () => {
    vm = createVm(`<div><h4>Buttons</h4>
<btn disabled type="primary">Primary button</btn>
<btn disabled>Button</btn>
<h4>Links</h4>
<btn disabled href="#" type="primary">Primary button</btn>
<btn disabled to="/">Button</btn></div>`)
    const $btnDisabled = $(vm.$el)
    expect(window.location.hash).to.equal('')
    const btn = $btnDisabled.find('a.btn').get(0)
    triggerEvent(btn, 'click')
    await vm.$nextTick()
    expect(window.location.hash).to.equal('')
  })

  it('should emit click event', async () => {
    vm = createVm(
      '<btn @click="onClick">{{ msg }}</btn>',
      {
        msg: 'test',
      },
      {
        methods: {
          onClick() {
            this.msg = 'clicked'
          },
        },
      }
    )
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
    triggerEvent(vm.$el, 'click')
    await vm.$nextTick()
    expect(vm.msg).to.equal('clicked')
  })

  it('should not emit click event while disabled', async () => {
    vm = createVm(
      '<btn disabled @click="onClick">{{ msg }}</btn>',
      {
        msg: 'test',
      },
      {
        methods: {
          onClick() {
            this.msg = 'clicked'
          },
        },
      }
    )
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
    triggerEvent(vm.$el, 'click')
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
  })

  it('should be able to render checkbox btn', async () => {
    vm = createVm(
      `  <section>
    <btn-group>
      <btn input-type="checkbox" input-value="1" v-model="model">Checkbox 1</btn>
      <btn input-type="checkbox" input-value="2" v-model="model">Checkbox 2</btn>
      <btn input-type="checkbox" input-value="3" v-model="model">Checkbox 3</btn>
      <btn input-type="checkbox" input-value="4" v-model="model" disabled>Checkbox 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: ['1'],
      }
    )
    const $btnInputCheckbox = $(vm.$el)
    await vm.$nextTick()
    expect($btnInputCheckbox.find('label.btn').length).to.equal(4)
    expect(
      $btnInputCheckbox.find('label.btn > input[type=checkbox]').length
    ).to.equal(4)
    // first one should be actived by default
    expect($btnInputCheckbox.find('label.btn.active').length).to.equal(1)
    expect(
      $btnInputCheckbox.find('label.btn > input[type=checkbox]').get(0).checked
    ).to.be.true
    expect($btnInputCheckbox.find('label.btn').get(0).className).to.contain(
      'active'
    )
    // last one shoubd be disabled by default
    expect($btnInputCheckbox.find('label.btn.disabled').length).to.equal(1)
    expect(
      $btnInputCheckbox.find('label.btn.disabled > input[disabled]').length
    ).to.equal(1)
    expect($btnInputCheckbox.find('label.btn').get(3).className).to.contain(
      'disabled'
    )
  })

  it('should be able to select checkbox btn', async () => {
    vm = createVm(
      `  <section>
    <btn-group>
      <btn input-type="checkbox" input-value="1" v-model="model">Checkbox 1</btn>
      <btn input-type="checkbox" input-value="2" v-model="model">Checkbox 2</btn>
      <btn input-type="checkbox" input-value="3" v-model="model">Checkbox 3</btn>
      <btn input-type="checkbox" input-value="4" v-model="model" disabled>Checkbox 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: ['1'],
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    triggerEvent($el.find('label.btn > input').get(1), 'change')
    await vm.$nextTick()
    // active second one
    expect($el.find('label.btn.active').length).to.equal(2)
    expect($el.find('label.btn > input[type=checkbox]').get(0).checked).to.be
      .true
    expect($el.find('label.btn > input[type=checkbox]').get(1).checked).to.be
      .true
    expect($el.find('label.btn > input[type=checkbox]').get(3).checked).to.be
      .false
    expect($el.find('label.btn').get(1).className).to.contain('active')
    // model change
    expect(vm.model.length).to.equal(2)
    expect(vm.model.indexOf('1')).to.be.at.least(0)
    expect(vm.model.indexOf('2')).to.be.at.least(0)
  })

  it('should be able to un-select checkbox btn', async () => {
    vm = createVm(
      `  <section>
    <btn-group>
      <btn input-type="checkbox" input-value="1" v-model="model">Checkbox 1</btn>
      <btn input-type="checkbox" input-value="2" v-model="model">Checkbox 2</btn>
      <btn input-type="checkbox" input-value="3" v-model="model">Checkbox 3</btn>
      <btn input-type="checkbox" input-value="4" v-model="model" disabled>Checkbox 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: ['1'],
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    triggerEvent($el.find('label.btn > input').get(0), 'change')
    await vm.$nextTick()
    expect($el.find('label.btn.active').length).to.equal(0)
    // model change
    expect(vm.model.length).to.equal(0)
  })

  it('should be able to render radio btn', async () => {
    vm = createVm(
      `  <section>
    <btn-group>
      <btn input-type="radio" input-value="1" v-model="model">Radio 1</btn>
      <btn input-type="radio" input-value="2" v-model="model">Radio 2</btn>
      <btn input-type="radio" input-value="3" v-model="model">Radio 3</btn>
      <btn input-type="radio" input-value="4" v-model="model" disabled>Radio 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: '1',
      }
    )
    const $btnInputRadio = $(vm.$el)
    await vm.$nextTick()
    expect($btnInputRadio.find('label.btn').length).to.equal(4)
    expect(
      $btnInputRadio.find('label.btn > input[type=radio]').length
    ).to.equal(4)
    // active first one
    expect($btnInputRadio.find('label.btn.active').length).to.equal(1)
    expect($btnInputRadio.find('label.btn > input[type=radio]').get(0).checked)
      .to.be.true
    expect($btnInputRadio.find('label.btn').get(0).className).to.contain(
      'active'
    )
    // disabled last one
    expect($btnInputRadio.find('label.btn.disabled').length).to.equal(1)
    expect(
      $btnInputRadio.find('label.btn.disabled > input[disabled]').length
    ).to.equal(1)
    expect($btnInputRadio.find('label.btn').get(3).className).to.contain(
      'disabled'
    )
  })

  it('should be able to select radio btn', async () => {
    vm = createVm(
      `  <section>
    <btn-group>
      <btn input-type="radio" input-value="1" v-model="model">Radio 1</btn>
      <btn input-type="radio" input-value="2" v-model="model">Radio 2</btn>
      <btn input-type="radio" input-value="3" v-model="model">Radio 3</btn>
      <btn input-type="radio" input-value="4" v-model="model" disabled>Radio 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: '1',
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    triggerEvent($el.find('label.btn > input').get(1), 'change')
    await vm.$nextTick()
    // active second one
    expect($el.find('label.btn.active').length).to.equal(1)
    expect($el.find('label.btn > input[type=radio]').get(0).checked).to.be.false
    expect($el.find('label.btn > input[type=radio]').get(1).checked).to.be.true
    expect($el.find('label.btn > input[type=radio]').get(3).checked).to.be.false
    expect($el.find('label.btn').get(1).className).to.contain('active')
    // model change
    expect(vm.model).to.equal('2')
  })

  it('should not be able to un-select radio btn', async () => {
    vm = createVm(
      `  <section>
    <btn-group>
      <btn input-type="radio" input-value="1" v-model="model">Radio 1</btn>
      <btn input-type="radio" input-value="2" v-model="model">Radio 2</btn>
      <btn input-type="radio" input-value="3" v-model="model">Radio 3</btn>
      <btn input-type="radio" input-value="4" v-model="model" disabled>Radio 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: '1',
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    triggerEvent($el.find('label.btn > input').get(0), 'change')
    await vm.$nextTick()
    // active second one
    expect($el.find('label.btn.active').length).to.equal(1)
    expect($el.find('label.btn > input[type=radio]').get(0).checked).to.be.true
    expect($el.find('label.btn > input[type=radio]').get(1).checked).to.be.false
    expect($el.find('label.btn > input[type=radio]').get(3).checked).to.be.false
    expect($el.find('label.btn').get(0).className).to.contain('active')
    // model change
    expect(vm.model).to.equal('1')
  })

  it('should be able to render as justified', async () => {
    vm = createVm('<btn justified>test</btn>')
    await vm.$nextTick()
    expect(vm.$el.className).to.contain('btn-group')
    const btn = vm.$el.querySelector('.btn')
    expect(btn).to.exist
    expect(btn.innerText).to.equal('test')
  })
})
