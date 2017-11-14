import Vue from 'vue'
import $ from 'jquery'
import utils from './../utils'
import BtnDoc from '@docs/pages/components/Btn.md'
import Btn from '@src/components/button/Btn'

describe('Btn', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(BtnDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render btn types', () => {
    let _$el = $(vm.$refs['btn-examples'].$el)
    expect(_$el.find('button.btn').length).to.equal(7)
    // all render as type=button
    expect(_$el.find('[type=button]').length).to.equal(7)
    expect(_$el.find('.btn').get(0).className).to.contain('btn-default')
    expect(_$el.find('.btn').get(1).className).to.contain('btn-primary')
    expect(_$el.find('.btn').get(2).className).to.contain('btn-success')
    expect(_$el.find('.btn').get(3).className).to.contain('btn-info')
    expect(_$el.find('.btn').get(4).className).to.contain('btn-warning')
    expect(_$el.find('.btn').get(5).className).to.contain('btn-danger')
    expect(_$el.find('.btn').get(6).className).to.contain('btn-link')
  })

  it('should be able to render link btn', () => {
    let _$el = $(vm.$refs['btn-links'].$el)
    expect(_$el.find('button').length).to.equal(0)
    expect(_$el.find('a.btn').length).to.equal(4)
    // native links
    expect(_$el.find('.btn').get(0).className).to.contain('btn-default')
    expect(_$el.find('.btn').get(0).getAttribute('href')).to.equal('#')
    expect(_$el.find('.btn').get(0).getAttribute('role')).to.equal('button')
    expect(_$el.find('.btn').get(1).className).to.contain('btn-primary')
    expect(_$el.find('.btn').get(1).getAttribute('href')).to.equal('#')
    expect(_$el.find('.btn').get(1).getAttribute('role')).to.equal('button')
    // router links
    expect(_$el.find('.btn').get(2).className).to.contain('btn-default')
    expect(_$el.find('.btn').get(2).getAttribute('href')).to.equal('#router-link')
    expect(_$el.find('.btn').get(2).getAttribute('role')).to.equal('button')
    expect(_$el.find('.btn').get(3).className).to.contain('btn-primary')
    expect(_$el.find('.btn').get(3).getAttribute('href')).to.equal('#router-link')
    expect(_$el.find('.btn').get(3).getAttribute('role')).to.equal('button')
  })

  it('should be able to render different size btn', () => {
    let _$el = $(vm.$refs['btn-sizes'].$el)
    expect(_$el.find('.btn').length).to.equal(8)
    expect(_$el.find('.btn').get(0).className).to.contain('btn-lg')
    expect(_$el.find('.btn').get(1).className).to.contain('btn-lg')
    expect(_$el.find('.btn').get(4).className).to.contain('btn-sm')
    expect(_$el.find('.btn').get(5).className).to.contain('btn-sm')
    expect(_$el.find('.btn').get(6).className).to.contain('btn-xs')
    expect(_$el.find('.btn').get(7).className).to.contain('btn-xs')
  })

  it('should be able to render block level btn', () => {
    let _$el = $(vm.$refs['btn-block'].$el)
    expect(_$el.find('.btn.btn-block').length).to.equal(2)
  })

  it('should be able to render active btn', () => {
    let _$el = $(vm.$refs['btn-active'].$el)
    expect(_$el.find('.btn.active').length).to.equal(4)
    expect(_$el.find('button.active').length).to.equal(2)
    expect(_$el.find('a.active').length).to.equal(2)
  })

  it('should be able to render disabled btn', () => {
    let _$el = $(vm.$refs['btn-disabled'].$el)
    expect(_$el.find('.btn').length).to.equal(4)
    expect(_$el.find('.btn.disabled').length).to.equal(4)
    expect(_$el.find('.btn[disabled]').length).to.equal(2)
  })

  it('should not response on disabled link btn click', async () => {
    let _$el = $(vm.$refs['btn-disabled'].$el)
    expect(window.location.hash).to.equal('')
    _$el.find('a.btn').get(0).click()
    await vm.$nextTick()
    expect(window.location.hash).to.equal('')
  })

  it('should emit click event', async () => {
    let res = Vue.compile('<btn @click="onClick">{{ msg }}</btn>')
    let vm = new Vue({
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
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
    utils.triggerEvent(vm.$el, 'click')
    await vm.$nextTick()
    expect(vm.msg).to.equal('clicked')
  })

  it('should not emit click event while disabled', async () => {
    let res = Vue.compile('<btn disabled @click="onClick">{{ msg }}</btn>')
    let vm = new Vue({
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
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
    utils.triggerEvent(vm.$el, 'click')
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
  })

  it('should be able to render checkbox btn', async () => {
    let _$el = $(vm.$refs['btn-input-checkbox'].$el)
    await vm.$nextTick()
    expect(_$el.find('label.btn').length).to.equal(4)
    expect(_$el.find('label.btn > input[type=checkbox]').length).to.equal(4)
    // active first one
    expect(_$el.find('label.btn.active').length).to.equal(1)
    expect(_$el.find('label.btn > input[type=checkbox]').get(0).checked).to.be.true
    expect(_$el.find('label.btn').get(0).className).to.contain('active')
    // disabled last one
    expect(_$el.find('label.btn.disabled').length).to.equal(1)
    expect(_$el.find('label.btn.disabled > input[disabled]').length).to.equal(1)
    expect(_$el.find('label.btn').get(3).className).to.contain('disabled')
  })

  it('should be able to select checkbox btn', async () => {
    let _vm = vm.$refs['btn-input-checkbox']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent(_$el.find('label.btn > input').get(1), 'change')
    await vm.$nextTick()
    // active second one
    expect(_$el.find('label.btn.active').length).to.equal(2)
    expect(_$el.find('label.btn > input[type=checkbox]').get(0).checked).to.be.true
    expect(_$el.find('label.btn > input[type=checkbox]').get(1).checked).to.be.true
    expect(_$el.find('label.btn > input[type=checkbox]').get(3).checked).to.be.false
    expect(_$el.find('label.btn').get(1).className).to.contain('active')
    // model change
    expect(_vm.model.length).to.equal(2)
    expect(_vm.model.indexOf('1')).to.be.at.least(0)
    expect(_vm.model.indexOf('2')).to.be.at.least(0)
  })

  it('should be able to un-select checkbox btn', async () => {
    let _vm = vm.$refs['btn-input-checkbox']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent(_$el.find('label.btn > input').get(0), 'change')
    await vm.$nextTick()
    expect(_$el.find('label.btn.active').length).to.equal(0)
    // model change
    expect(_vm.model.length).to.equal(0)
  })

  it('should be able to render radio btn', async () => {
    let _$el = $(vm.$refs['btn-input-radio'].$el)
    await vm.$nextTick()
    expect(_$el.find('label.btn').length).to.equal(4)
    expect(_$el.find('label.btn > input[type=radio]').length).to.equal(4)
    // active first one
    expect(_$el.find('label.btn.active').length).to.equal(1)
    expect(_$el.find('label.btn > input[type=radio]').get(0).checked).to.be.true
    expect(_$el.find('label.btn').get(0).className).to.contain('active')
    // disabled last one
    expect(_$el.find('label.btn.disabled').length).to.equal(1)
    expect(_$el.find('label.btn.disabled > input[disabled]').length).to.equal(1)
    expect(_$el.find('label.btn').get(3).className).to.contain('disabled')
  })

  it('should be able to select radio btn', async () => {
    let _vm = vm.$refs['btn-input-radio']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent(_$el.find('label.btn > input').get(1), 'change')
    await vm.$nextTick()
    // active second one
    expect(_$el.find('label.btn.active').length).to.equal(1)
    expect(_$el.find('label.btn > input[type=radio]').get(0).checked).to.be.false
    expect(_$el.find('label.btn > input[type=radio]').get(1).checked).to.be.true
    expect(_$el.find('label.btn > input[type=radio]').get(3).checked).to.be.false
    expect(_$el.find('label.btn').get(1).className).to.contain('active')
    // model change
    expect(_vm.model).to.equal('2')
  })

  it('should not be able to un-select radio btn', async () => {
    let _vm = vm.$refs['btn-input-radio']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    // phantomjs won't response on label click
    utils.triggerEvent(_$el.find('label.btn > input').get(0), 'change')
    await vm.$nextTick()
    // active second one
    expect(_$el.find('label.btn.active').length).to.equal(1)
    expect(_$el.find('label.btn > input[type=radio]').get(0).checked).to.be.true
    expect(_$el.find('label.btn > input[type=radio]').get(1).checked).to.be.false
    expect(_$el.find('label.btn > input[type=radio]').get(3).checked).to.be.false
    expect(_$el.find('label.btn').get(0).className).to.contain('active')
    // model change
    expect(_vm.model).to.equal('1')
  })

  it('should be able to render as justified', async () => {
    let res = Vue.compile('<btn justified>test</btn>')
    let vm = new Vue({
      components: {Btn},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(vm.$el.className).to.contain('btn-group')
    let btn = vm.$el.querySelector('.btn')
    expect(btn).to.exist
    expect(btn.innerText).to.equal('test')
  })
})
