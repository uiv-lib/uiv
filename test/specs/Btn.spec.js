import Vue from 'vue'
import $ from 'jquery'
import * as utils from '../utils'
import BtnDoc from '@docs/pages/components/Btn.md'
import Btn from '@src/components/button/Btn'

describe('Btn', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(BtnDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render btn types', () => {
    const $cont = $(vm.$refs['btn-examples'].$el)
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
    const $btnLinks = $(vm.$refs['btn-links'].$el)
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
    const $btnSizes = $(vm.$refs['btn-sizes'].$el)
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
    const $btnBlock = $(vm.$refs['btn-block'].$el)
    expect($btnBlock.find('.btn.btn-block').length).to.equal(2)
  })

  it('should be able to render active btn', () => {
    const $btnActive = $(vm.$refs['btn-active'].$el)
    expect($btnActive.find('.btn.active').length).to.equal(4)
    expect($btnActive.find('button.active').length).to.equal(2)
    expect($btnActive.find('a.active').length).to.equal(2)
  })

  it('should be able to render disabled btn', () => {
    const $btnDisabled = $(vm.$refs['btn-disabled'].$el)
    expect($btnDisabled.find('.btn').length).to.equal(4)
    expect($btnDisabled.find('.btn.disabled').length).to.equal(4)
    expect($btnDisabled.find('.btn[disabled]').length).to.equal(2)
  })

  it('should not response on disabled link btn click', async () => {
    const $btnDisabled = $(vm.$refs['btn-disabled'].$el)
    expect(window.location.hash).to.equal('')
    const btn = $btnDisabled.find('a.btn').get(0)
    utils.triggerEvent(btn, 'click')
    await vm.$nextTick()
    expect(window.location.hash).to.equal('')
  })

  it('should emit click event', async () => {
    const res = Vue.compile('<btn @click="onClick">{{ msg }}</btn>')
    const _vm = new Vue({
      data () {
        return {
          msg: 'test'
        }
      },
      methods: {
        onClick () {
          this.msg = 'clicked'
        }
      },
      components: {Btn},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await _vm.$nextTick()
    expect(_vm.msg).to.equal('test')
    utils.triggerEvent(_vm.$el, 'click')
    await _vm.$nextTick()
    expect(_vm.msg).to.equal('clicked')
  })

  it('should not emit click event while disabled', async () => {
    const res = Vue.compile('<btn disabled @click="onClick">{{ msg }}</btn>')
    const _vm = new Vue({
      data () {
        return {
          msg: 'test'
        }
      },
      methods: {
        onClick () {
          this.msg = 'clicked'
        }
      },
      components: {Btn},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await _vm.$nextTick()
    expect(_vm.msg).to.equal('test')
    utils.triggerEvent(_vm.$el, 'click')
    await _vm.$nextTick()
    expect(_vm.msg).to.equal('test')
  })

  it('should be able to render checkbox btn', async () => {
    const $btnInputCheckbox = $(vm.$refs['btn-input-checkbox'].$el)
    await vm.$nextTick()
    expect($btnInputCheckbox.find('label.btn').length).to.equal(4)
    expect($btnInputCheckbox.find('label.btn > input[type=checkbox]').length).to.equal(4)
    // active first one
    expect($btnInputCheckbox.find('label.btn.active').length).to.equal(1)
    expect($btnInputCheckbox.find('label.btn > input[type=checkbox]').get(0).checked).to.be.true
    expect($btnInputCheckbox.find('label.btn').get(0).className).to.contain('active')
    // disabled last one
    expect($btnInputCheckbox.find('label.btn.disabled').length).to.equal(1)
    expect($btnInputCheckbox.find('label.btn.disabled > input[disabled]').length).to.equal(1)
    expect($btnInputCheckbox.find('label.btn').get(3).className).to.contain('disabled')
  })

  it('should be able to select checkbox btn', async () => {
    const $btnInputCheckbox = vm.$refs['btn-input-checkbox']
    $el = $($btnInputCheckbox.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent($el.find('label.btn > input').get(1), 'change')
    await vm.$nextTick()
    // active second one
    expect($el.find('label.btn.active').length).to.equal(2)
    expect($el.find('label.btn > input[type=checkbox]').get(0).checked).to.be.true
    expect($el.find('label.btn > input[type=checkbox]').get(1).checked).to.be.true
    expect($el.find('label.btn > input[type=checkbox]').get(3).checked).to.be.false
    expect($el.find('label.btn').get(1).className).to.contain('active')
    // model change
    expect($btnInputCheckbox.model.length).to.equal(2)
    expect($btnInputCheckbox.model.indexOf('1')).to.be.at.least(0)
    expect($btnInputCheckbox.model.indexOf('2')).to.be.at.least(0)
  })

  it('should be able to un-select checkbox btn', async () => {
    const $btnInputCheckbox = vm.$refs['btn-input-checkbox']
    $el = $($btnInputCheckbox.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent($el.find('label.btn > input').get(0), 'change')
    await vm.$nextTick()
    expect($el.find('label.btn.active').length).to.equal(0)
    // model change
    expect($btnInputCheckbox.model.length).to.equal(0)
  })

  it('should be able to render radio btn', async () => {
    const $btnInputRadio = $(vm.$refs['btn-input-radio'].$el)
    await vm.$nextTick()
    expect($btnInputRadio.find('label.btn').length).to.equal(4)
    expect($btnInputRadio.find('label.btn > input[type=radio]').length).to.equal(4)
    // active first one
    expect($btnInputRadio.find('label.btn.active').length).to.equal(1)
    expect($btnInputRadio.find('label.btn > input[type=radio]').get(0).checked).to.be.true
    expect($btnInputRadio.find('label.btn').get(0).className).to.contain('active')
    // disabled last one
    expect($btnInputRadio.find('label.btn.disabled').length).to.equal(1)
    expect($btnInputRadio.find('label.btn.disabled > input[disabled]').length).to.equal(1)
    expect($btnInputRadio.find('label.btn').get(3).className).to.contain('disabled')
  })

  it('should be able to select radio btn', async () => {
    const $btnInputRadio = vm.$refs['btn-input-radio']
    $el = $($btnInputRadio.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent($el.find('label.btn > input').get(1), 'change')
    await vm.$nextTick()
    // active second one
    expect($el.find('label.btn.active').length).to.equal(1)
    expect($el.find('label.btn > input[type=radio]').get(0).checked).to.be.false
    expect($el.find('label.btn > input[type=radio]').get(1).checked).to.be.true
    expect($el.find('label.btn > input[type=radio]').get(3).checked).to.be.false
    expect($el.find('label.btn').get(1).className).to.contain('active')
    // model change
    expect($btnInputRadio.model).to.equal('2')
  })

  it('should not be able to un-select radio btn', async () => {
    const $btnInputRadio = vm.$refs['btn-input-radio']
    $el = $($btnInputRadio.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent($el.find('label.btn > input').get(0), 'change')
    await vm.$nextTick()
    // active second one
    expect($el.find('label.btn.active').length).to.equal(1)
    expect($el.find('label.btn > input[type=radio]').get(0).checked).to.be.true
    expect($el.find('label.btn > input[type=radio]').get(1).checked).to.be.false
    expect($el.find('label.btn > input[type=radio]').get(3).checked).to.be.false
    expect($el.find('label.btn').get(0).className).to.contain('active')
    // model change
    expect($btnInputRadio.model).to.equal('1')
  })

  it('should be able to render as justified', async () => {
    const res = Vue.compile('<btn justified>test</btn>')
    const _vm = new Vue({
      components: {Btn},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await _vm.$nextTick()
    expect(_vm.$el.className).to.contain('btn-group')
    const btn = _vm.$el.querySelector('.btn')
    expect(btn).to.exist
    expect(btn.innerText).to.equal('test')
  })
})
