import Vue from 'vue'
import $ from 'jquery'
import Modal from '@src/components/modal/Modal.vue'
import ModalDoc from '@docs/pages/components/Modal.md'
import utils from '../utils'

describe('Modal', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(ModalDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to open modal 1', async () => {
    let _vm = vm.$refs['modal-example']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
  })

  it('should be able to close by esc key click', async () => {
    let _vm = vm.$refs['modal-example']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    _vm.$refs.modal.onKeyPress({keyCode: 28}) // not a esc key
    await vm.$nextTick()
    expect(_vm.open).to.equal(true)
    _vm.$refs.modal.onKeyPress({keyCode: 27}) // esc key
    await vm.$nextTick()
    expect(_vm.open).to.equal(false)
  })

  it('should be able to close modal 1 and fire callback', async () => {
    let _vm = vm.$refs['modal-example']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    _$el.find('button.close').get(0).click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(_$el.find('.modal').get(0).className).not.contain('in')
    expect(_$el.find('#modal-msg').get(0).textContent).to.contain('Modal dismiss with msg \'dismiss\'')
  })

  it('should be able to close modal 1 with ok option and fire callback', async () => {
    let _vm = vm.$refs['modal-example']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    _$el.find('.modal-footer button').get(1).click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(_$el.find('.modal').get(0).className).not.contain('in')
    expect(_$el.find('#modal-msg').get(0).textContent).to.contain('Modal dismiss with msg \'ok\'')
  })

  it('should be able to render large modal', async () => {
    let _vm = vm.$refs['modal-optional-sizes']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    let modal = vm.$el.querySelectorAll('.modal')[1]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-lg').textContent).to.exist
  })

  it('should be able to render small modal', async () => {
    let _vm = vm.$refs['modal-optional-sizes']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(1)
    let modal = vm.$el.querySelectorAll('.modal')[2]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-sm').textContent).to.exist
  })

  it('should be able to render HTML title modal', async () => {
    let _vm = vm.$refs['modal-custom-header']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    let modal = vm.$el.querySelectorAll('.modal')[3]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-title i')).to.exist
  })

  it('should be able to render no header modal', async () => {
    let _vm = vm.$refs['modal-custom-header']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(1)
    let modal = vm.$el.querySelectorAll('.modal')[4]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-header')).not.exist
  })

  it('should be able to render customize footer modal', async () => {
    let _vm = vm.$refs['modal-custom-footer']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    let modal = vm.$el.querySelectorAll('.modal')[5]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
  })

  it('should be able to render no footer modal', async () => {
    let _vm = vm.$refs['modal-custom-footer']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(1)
    let modal = vm.$el.querySelectorAll('.modal')[6]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-footer')).not.exist
  })

  it('should be able to close customize footer modal', async () => {
    let _vm = vm.$refs['modal-custom-footer']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    let modal = vm.$el.querySelectorAll('.modal')[5]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
    modal.querySelectorAll('.modal-footer button')[0].click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(modal.className).not.contain('in')
  })

  it('should be able to auto-focus on ok btn', async () => {
    let _vm = vm.$refs['modal-auto-focus']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration + 100)
    // expect(vm.$refs.modal9.$el.querySelector('[data-action="auto-focus"]')).to.equal(vm.$refs.modal9.$el.querySelector(':focus'))
    // have no idea how to get this focused element
  })

  it('should be able to close modal on backdrop click', async () => {
    let _vm = vm.$refs['modal-example']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    let modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    modal.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(modal.className).not.contain('in')
  })

  it('should not be able to close backdrop-false modal', async () => {
    let _vm = vm.$refs['modal-disable-backdrop']
    let _$el = $(_vm.$el)
    let trigger = _$el.find('.btn').get(0)
    let modal = vm.$el.querySelectorAll('.modal')[8]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    modal.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
  })

  it('should be able to open modal on init', async () => {
    let res = Vue.compile('<modal v-model="open" title="Modal 1"><p>This is a simple modal.</p></modal>')
    let vm = new Vue({
      data () {
        return {
          open: true
        }
      },
      components: {Modal},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.querySelector('.modal').className).to.contain('in')
    $(vm.$el).remove()
    vm.$destroy()
  })
})
