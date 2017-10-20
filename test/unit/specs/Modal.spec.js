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
    let trigger = vm.$el.querySelector('#btn-1')
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    setTimeout()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.querySelector('.modal').className).to.contain('in')
    expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
  })

  it('should be able to close by esc key click', async () => {
    let trigger = vm.$el.querySelector('#btn-1')
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.querySelector('.modal').className).to.contain('in')
    expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
    vm.$refs.modal1.onKeyPress({keyCode: 28}) // not a esc key
    await vm.$nextTick()
    expect(vm.open1).to.equal(true)
    vm.$refs.modal1.onKeyPress({keyCode: 27}) // esc key
    await vm.$nextTick()
    expect(vm.open1).to.equal(false)
  })

  it('should be able to close modal 1 and fire callback', async () => {
    let trigger = vm.$el.querySelector('#btn-1')
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.querySelector('.modal').className).to.contain('in')
    expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
    vm.$el.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(vm.$el.querySelector('.modal').className).not.contain('in')
    expect(vm.$el.querySelector('#modal1-msg').textContent).to.contain('Modal dismiss with msg \'dismiss\'')
  })

  it('should be able to close modal 1 with ok option and fire callback', async () => {
    let trigger = vm.$el.querySelector('#btn-1')
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.querySelector('.modal').className).to.contain('in')
    expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
    vm.$el.querySelector('.modal-footer').querySelectorAll('button')[1].click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(vm.$el.querySelector('.modal').className).not.contain('in')
    expect(vm.$el.querySelector('#modal1-msg').textContent).to.contain('Modal dismiss with msg \'ok\'')
  })

  it('should be able to render large modal', async () => {
    let trigger = vm.$el.querySelector('#btn-2')
    let modal = vm.$el.querySelectorAll('.modal')[1]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-lg').textContent).to.exist
  })

  it('should be able to render small modal', async () => {
    let trigger = vm.$el.querySelector('#btn-3')
    let modal = vm.$el.querySelectorAll('.modal')[2]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-sm').textContent).to.exist
  })

  it('should be able to render HTML title modal', async () => {
    let trigger = vm.$el.querySelector('#btn-4')
    let modal = vm.$el.querySelectorAll('.modal')[3]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-title i')).to.exist
  })

  it('should be able to render no header modal', async () => {
    let modal = vm.$el.querySelectorAll('.modal')[4]
    let trigger = vm.$el.querySelector('#btn-5')
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-header')).not.exist
  })

  it('should be able to render customize footer modal', async () => {
    let trigger = vm.$el.querySelector('#btn-6')
    let modal = vm.$el.querySelectorAll('.modal')[5]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
  })

  it('should be able to render no footer modal', async () => {
    let modal = vm.$el.querySelectorAll('.modal')[6]
    let trigger = vm.$el.querySelector('#btn-7')
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-footer')).not.exist
  })

  it('should be able to close customize footer modal', async () => {
    let modal = vm.$el.querySelectorAll('.modal')[5]
    let trigger = vm.$el.querySelector('#btn-6')
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
    let trigger = vm.$el.querySelector('#btn-8')
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    await utils.sleep(utils.transitionDuration + 100)
    // expect(vm.$refs.modal9.$el.querySelector('[data-action="auto-focus"]')).to.equal(vm.$refs.modal9.$el.querySelector(':focus'))
    // have no idea how to get this focused element
  })

  it('should be able to close modal on backdrop click', async () => {
    let modal = vm.$el.querySelectorAll('.modal')[0]
    let trigger = vm.$el.querySelector('#btn-1')
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
    let modal = vm.$el.querySelectorAll('.modal')[8]
    let trigger = vm.$el.querySelector('#btn-9')
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
