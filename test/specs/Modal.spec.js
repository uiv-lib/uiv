import Vue from 'vue'
import $ from 'jquery'
import Modal from '@src/components/modal/Modal.vue'
import ModalDoc from '@docs/pages/components/Modal.md'
import * as utils from '../utils'

describe('Modal', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(ModalDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
    $el.appendTo('body')
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
    $('.alert').remove()
    $('.modal-backdrop').remove()
  })

  const getBackdropsNum = () => $('.modal-backdrop').length
  const expectBodyOverflow = (enable) => {
    if (enable) {
      expect(document.body.style.paddingRight).to.equal('')
      expect(document.body.className).not.contain('modal-open')
    } else {
      expect(document.body.style.paddingRight).to.contain(`px`)
      expect(document.body.className).to.contain('modal-open')
    }
  }

  it('should be able to use nested modals (logically)', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px'
    const _vm = vm.$refs['modal-nested-logically']
    await vm.$nextTick()
    const _$el = $(_vm.$el)
    const modal1 = _$el.find('.modal').get(0)
    const modal2 = _$el.find('.modal').get(1)
    const modal3 = _$el.find('.modal').get(2)
    const trigger = _$el.find('.btn').get(0)
    const trigger2 = _$el.find('.modal .modal-body .btn').get(0)
    const trigger3 = _$el.find('.modal .modal-body .btn').get(1)
    expect(getBackdropsNum()).to.equal(0)
    // open modal 1
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    expect(modal1.style.zIndex).to.equal('')
    expect($('.modal-backdrop').get(0).style.zIndex).to.equal('')
    expectBodyOverflow(false)
    // open modal 2
    trigger2.click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    expect(modal2.style.zIndex).to.equal('1070')
    expect($('.modal-backdrop').get(1).style.zIndex).to.equal('1060')
    expectBodyOverflow(false)
    // open modal 3
    trigger3.click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).to.contain('in')
    expect(getBackdropsNum()).to.equal(3)
    expect(modal3.style.zIndex).to.equal('1090')
    expect($('.modal-backdrop').get(2).style.zIndex).to.equal('1080')
    expectBodyOverflow(false)
    // dismiss modal 3
    modal3.querySelector('.btn-primary').click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false)
    // dismiss modal 2
    modal2.querySelector('.btn-primary').click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false)
    // dismiss modal 1
    modal1.querySelector('.btn-primary').click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).not.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(0)
    // body overflow should be enable now
    expectBodyOverflow(true)
    // reset body height
    document.body.style.height = ''
  })

  it('should be able to use nested modals', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px'
    const _vm = vm.$refs['modal-nested']
    await vm.$nextTick()
    const _$el = $(_vm.$el)
    const modal1 = _$el.find('.modal').get(0)
    const modal2 = _$el.find('.modal').get(1)
    const modal3 = _$el.find('.modal').get(2)
    const trigger = _$el.find('.btn').get(0)
    const trigger2 = _$el.find('.modal .modal-body .btn').get(0)
    const trigger3 = _$el.find('.modal .modal-body .btn').get(1)
    expect(getBackdropsNum()).to.equal(0)
    // open modal 1
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    expect(modal1.style.zIndex).to.equal('')
    expect($('.modal-backdrop').get(0).style.zIndex).to.equal('')
    expectBodyOverflow(false)
    // open modal 2
    trigger2.click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    expect(modal2.style.zIndex).to.equal('1070')
    expect($('.modal-backdrop').get(1).style.zIndex).to.equal('1060')
    expectBodyOverflow(false)
    // open modal 3
    trigger3.click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).to.contain('in')
    expect(getBackdropsNum()).to.equal(3)
    expect(modal3.style.zIndex).to.equal('1090')
    expect($('.modal-backdrop').get(2).style.zIndex).to.equal('1080')
    expectBodyOverflow(false)
    // dismiss modal 3
    modal3.querySelector('.btn-primary').click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false)
    // dismiss modal 2
    modal2.querySelector('.btn-primary').click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false)
    // dismiss modal 1
    modal1.querySelector('.btn-primary').click()
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).not.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(0)
    // body overflow should be enable now
    expectBodyOverflow(true)
    // reset body height
    document.body.style.height = ''
  })

  it('should be able to open modal 1', async () => {
    const _vm = vm.$refs['modal-example']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
  })

  it('should be able to close by esc key click', async () => {
    const _vm = vm.$refs['modal-example']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
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
    const _vm = vm.$refs['modal-example']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    utils.triggerEvent(_$el.find('button.close').get(0), 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(_$el.find('.modal').get(0).className).not.contain('in')
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.contain('dismiss')
  })

  it('should be able to close modal 1 with ok option and fire callback', async () => {
    const _vm = vm.$refs['modal-example']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    utils.triggerEvent(_$el.find('.modal-footer button').get(1), 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(_$el.find('.modal').get(0).className).not.contain('in')
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.contain('ok')
  })

  it('should be able to render large modal', async () => {
    const _vm = vm.$refs['modal-optional-sizes']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[1]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-lg').textContent).to.exist
  })

  it('should be able to render small modal', async () => {
    const _vm = vm.$refs['modal-optional-sizes']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(1)
    const modal = vm.$el.querySelectorAll('.modal')[2]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-sm').textContent).to.exist
  })

  it('should be able to render HTML title modal', async () => {
    const _vm = vm.$refs['modal-custom-header']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[3]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-title i')).to.exist
  })

  it('should be able to render no header modal', async () => {
    const _vm = vm.$refs['modal-custom-header']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(1)
    const modal = vm.$el.querySelectorAll('.modal')[4]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-header')).not.exist
  })

  it('should be able to render customize footer modal', async () => {
    const _vm = vm.$refs['modal-custom-footer']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[5]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
  })

  it('should be able to render no footer modal', async () => {
    const _vm = vm.$refs['modal-custom-footer']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(1)
    const modal = vm.$el.querySelectorAll('.modal')[6]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-footer')).not.exist
  })

  it('should be able to close customize footer modal', async () => {
    const _vm = vm.$refs['modal-custom-footer']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[5]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
    utils.triggerEvent(modal.querySelectorAll('.modal-footer button')[0], 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(modal.className).not.contain('in')
  })

  it('should be able to customize button texts and types', async () => {
    const _vm = vm.$refs['modal-custom-button-text-and-type']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = _$el.find('.modal').get(0)
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    const [cancelBtn, okBtn] = modal.querySelectorAll('.modal-footer button')
    expect(cancelBtn.textContent).to.equal('No way!')
    expect(cancelBtn.className).to.contain('btn-warning')
    expect(okBtn.textContent).to.equal('Yes, please')
    expect(okBtn.className).to.contain('btn-danger')
  })

  it('should be able to auto-focus on ok btn', async () => {
    const _vm = vm.$refs['modal-auto-focus']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration + 100)
    // expect(vm.$refs.modal9.$el.querySelector('[data-action="auto-focus"]')).to.equal(vm.$refs.modal9.$el.querySelector(':focus'))
    // have no idea how to get this focused element
  })

  it('should be able to close modal on backdrop click', async () => {
    const _vm = vm.$refs['modal-example']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    utils.triggerEvent(modal, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(modal.className).not.contain('in')
  })

  it('should not be able to close backdrop-false modal', async () => {
    const _vm = vm.$refs['modal-disable-backdrop']
    const _$el = $(_vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[9]
    expect(document.querySelector('.modal-backdrop')).not.exist
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    utils.triggerEvent(modal, 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
  })

  it('should be able to open modal on init', async () => {
    const res = Vue.compile('<modal v-model="open" title="Modal 1"><p>This is a simple modal.</p></modal>')
    const vm = new Vue({
      data () {
        return {
          open: true
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.className).to.contain('in')
    expect(vm.$el.querySelector('.close')).to.exist
    $(vm.$el).remove()
    vm.$destroy()
  })

  it('should be able to hide dismiss btn', async () => {
    const res = Vue.compile('<modal v-model="open" title="Modal 1" :dismiss-btn="false"><p>This is a simple modal.</p></modal>')
    const vm = new Vue({
      data () {
        return {
          open: true
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.className).to.contain('in')
    expect(vm.$el.querySelector('.close')).not.exist
    $(vm.$el).remove()
    vm.$destroy()
  })

  it('should be able to use `beforeClose`', async () => {
    const res = Vue.compile('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>')
    const vm = new Vue({
      data () {
        return {
          open: true,
          msg: 'ok'
        }
      },
      components: {Modal},
      methods: {
        beforeClose () {
          this.msg = 'test'
          return true
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(vm.msg).to.equal('test')
    vm.$destroy()
  })

  it('should be able to interrupt hide with `beforeClose`', async () => {
    const res = Vue.compile('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>')
    const vm = new Vue({
      data () {
        return {
          open: true,
          msg: 'ok',
          dismissible: false
        }
      },
      components: {Modal},
      methods: {
        beforeClose () {
          return this.dismissible
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    vm.dismissible = true
    await vm.$nextTick()
    vm.$el.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    vm.$destroy()
  })

  it('should be able to use `beforeClose` when result is promise', async () => {
    const res = Vue.compile('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>')
    const vm = new Vue({
      data () {
        return {
          open: true,
          msg: 'ok'
        }
      },
      components: {Modal},
      methods: {
        beforeClose () {
          this.msg = 'test'
          return new Promise((resolve) => {
            resolve(true)
          })
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(vm.msg).to.equal('test')
    vm.$destroy()
  })

  it('should be able to interrupt hide with `beforeClose` when result is promise', async () => {
    const res = Vue.compile('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>')
    const vm = new Vue({
      data () {
        return {
          open: true,
          msg: 'ok'
        }
      },
      components: {Modal},
      methods: {
        beforeClose () {
          this.msg = 'test'
          return new Promise((resolve) => {
            resolve(false)
          })
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
    expect(document.querySelector('.modal-backdrop')).to.exist
    vm.$destroy()
  })

  it('should close the top most modal only when ESC pressed', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px'
    const _vm = vm.$refs['modal-nested']
    await vm.$nextTick()
    const _$el = $(_vm.$el)
    const modal1 = _$el.find('.modal').get(0)
    const modal2 = _$el.find('.modal').get(1)
    const modal3 = _$el.find('.modal').get(2)
    const trigger = _$el.find('.btn').get(0)
    const trigger2 = _$el.find('.modal .modal-body .btn').get(0)
    const trigger3 = _$el.find('.modal .modal-body .btn').get(1)
    expect(getBackdropsNum()).to.equal(0)
    // open modal 1
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    // open modal 2
    trigger2.click()
    await utils.sleep(utils.transitionDuration)
    // open modal 3
    trigger3.click()
    await utils.sleep(utils.transitionDuration)
    // dismiss modal 3
    _vm.$refs.modal1.onKeyPress({keyCode: 27}) // esc key
    _vm.$refs.modal2.onKeyPress({keyCode: 27}) // esc key
    _vm.$refs.modal3.onKeyPress({keyCode: 27}) // esc key
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false)
    // dismiss modal 2
    _vm.$refs.modal1.onKeyPress({keyCode: 27}) // esc key
    _vm.$refs.modal2.onKeyPress({keyCode: 27}) // esc key
    _vm.$refs.modal3.onKeyPress({keyCode: 27}) // esc key
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false)
    // dismiss modal 1
    _vm.$refs.modal1.onKeyPress({keyCode: 27}) // esc key
    _vm.$refs.modal2.onKeyPress({keyCode: 27}) // esc key
    _vm.$refs.modal3.onKeyPress({keyCode: 27}) // esc key
    await utils.sleep(utils.transitionDuration)
    expect(modal1.className).not.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(0)
    // body overflow should be enable now
    expectBodyOverflow(true)
    // reset body height
    document.body.style.height = ''
  })
})
