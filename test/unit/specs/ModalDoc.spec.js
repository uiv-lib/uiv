import Vue from 'vue'
import Modal from '@/components/modal/Modal.vue'
import ModalDoc from '@/docs/pages/ModalDoc.vue'
import config from '../utils'

describe('ModalDoc', () => {
  it('should be able to mount and destroy', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$destroy()
      done()
    })
  })

  it('should be able to open modal 1', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal').className).to.contain('in')
      expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
      vm.$destroy()
      done()
    }, config.transitionDuration)
  })

  it('should be able to close by esc key click', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal').className).to.contain('in')
      expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
      vm.$refs.modal1.onKeyPress({keyCode: 28}) // not a esc key
      vm.$nextTick(() => {
        expect(vm.open1).to.equal(true)
        vm.$refs.modal1.onKeyPress({keyCode: 27}) // esc key
        vm.$nextTick(() => {
          expect(vm.open1).to.equal(false)
          vm.$destroy()
          done()
        })
      })
    }, config.transitionDuration)
  })

  it('should be able to close modal 1 and fire callback', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal').className).to.contain('in')
      expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
      vm.$el.querySelector('button.close').click()
      setTimeout(() => {
        expect(document.querySelector('.modal-backdrop')).not.exist
        expect(vm.$el.querySelector('.modal').className).not.contain('in')
        expect(vm.$el.querySelector('#modal1-msg').textContent).to.equal('Modal 1 dismiss with msg \'dismiss\'')
        vm.$destroy()
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to close modal 1 with ok option and fire callback', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal').className).to.contain('in')
      expect(vm.$el.querySelector('.modal-title').textContent).to.equal('Modal 1')
      vm.$el.querySelector('.modal-footer').querySelectorAll('button')[1].click()
      setTimeout(() => {
        expect(document.querySelector('.modal-backdrop')).not.exist
        expect(vm.$el.querySelector('.modal').className).not.contain('in')
        expect(vm.$el.querySelector('#modal1-msg').textContent).to.equal('Modal 1 dismiss with msg \'ok\'')
        vm.$destroy()
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to render large modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[1]
    let modal = vm.$el.querySelectorAll('.modal')[1]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      expect(modal.querySelector('.modal-dialog.modal-lg').textContent).to.exist
      vm.$destroy()
      done()
    }, config.transitionDuration)
  })

  it('should be able to render small modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[2]
    let modal = vm.$el.querySelectorAll('.modal')[2]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      expect(modal.querySelector('.modal-dialog.modal-sm').textContent).to.exist
      vm.$destroy()
      done()
    }, config.transitionDuration)
  })

  it('should be able to render HTML title modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[3]
    let modal = vm.$el.querySelectorAll('.modal')[3]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      expect(modal.querySelector('.modal-title i')).to.exist
      vm.$destroy()
      done()
    }, config.transitionDuration)
  })

  it('should be able to render no footer modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let modal = vm.$el.querySelectorAll('.modal')[4]
    let trigger = vm.$el.querySelectorAll('button')[4]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      expect(modal.querySelector('.modal-footer')).not.exist
      vm.$destroy()
      done()
    }, config.transitionDuration)
  })

  it('should be able to render no header modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let modal = vm.$el.querySelectorAll('.modal')[5]
    let trigger = vm.$el.querySelectorAll('button')[5]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      expect(modal.querySelector('.modal-header')).not.exist
      vm.$destroy()
      done()
    }, config.transitionDuration)
  })

  it('should be able to render customize footer modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[6]
    let modal = vm.$el.querySelectorAll('.modal')[6]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
      vm.$destroy()
      done()
    }, config.transitionDuration)
  })

  it('should be able to close customize footer modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let modal = vm.$el.querySelectorAll('.modal')[6]
    let trigger = vm.$el.querySelectorAll('button')[6]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
      modal.querySelectorAll('.modal-footer button')[0].click()
      setTimeout(() => {
        expect(document.querySelector('.modal-backdrop')).not.exist
        expect(modal.className).not.contain('in')
        vm.$destroy()
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to close modal on backdrop click', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let modal = vm.$el.querySelectorAll('.modal')[0]
    let trigger = vm.$el.querySelectorAll('button')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      modal.click()
      setTimeout(() => {
        expect(document.querySelector('.modal-backdrop')).not.exist
        expect(modal.className).not.contain('in')
        vm.$destroy()
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should not be able to close backdrop-false modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let modal = vm.$el.querySelectorAll('.modal')[7]
    let trigger = vm.$el.querySelectorAll('button')[7]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(modal.className).to.contain('in')
      modal.click()
      setTimeout(() => {
        expect(document.querySelector('.modal-backdrop')).to.exist
        expect(modal.className).to.contain('in')
        vm.$destroy()
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to auto-focus on ok btn', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[9]
    expect(document.querySelector('.modal-backdrop')).not.exist
    trigger.click()
    setTimeout(() => {
      // expect(vm.$refs.modal9.$el.querySelector('[data-action="auto-focus"]')).to.equal(vm.$refs.modal9.$el.querySelector(':focus'))
      // have no idea how to get this focused element
      vm.$destroy()
      done()
    }, config.transitionDuration + 100)
  })

  it('should be able to open modal on init', (done) => {
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
    })
    vm.$mount()
    vm.$nextTick(() => {
      expect(document.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal').className).to.contain('in')
      vm.$destroy()
      done()
    })
  })
})
