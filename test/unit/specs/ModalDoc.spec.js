import Vue from 'vue'
import ModalDoc from '@/docs/ModalDoc.vue'
import config from './../config'

describe('ModalDoc', () => {
  it('should be able to open modal 1', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelector('.modal-body p').textContent).to.equal('This is a simple modal.')
      done()
    }, config.transitionDuration)
  })

  it('should be able to close modal 1 and fire callback', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelector('.modal-body p').textContent).to.equal('This is a simple modal.')
      vm.$el.querySelector('button.close').click()
      setTimeout(() => {
        expect(vm.$el.querySelector('.modal-backdrop')).not.exist
        expect(vm.$el.querySelector('.modal')).not.exist
        expect(vm.$el.querySelector('#modal1-msg').textContent).to.equal('Modal 1 dismiss with msg \'dismiss\'')
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to close modal 1 with ok option and fire callback', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelector('.modal-body p').textContent).to.equal('This is a simple modal.')
      vm.$el.querySelector('.modal-footer').querySelectorAll('button')[1].click()
      setTimeout(() => {
        expect(vm.$el.querySelector('.modal-backdrop')).not.exist
        expect(vm.$el.querySelector('.modal')).not.exist
        expect(vm.$el.querySelector('#modal1-msg').textContent).to.equal('Modal 1 dismiss with msg \'ok\'')
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to render large modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[1]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelector('.modal-dialog.modal-lg').textContent).to.exist
      done()
    }, config.transitionDuration)
  })

  it('should be able to render small modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[2]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelector('.modal-dialog.modal-sm').textContent).to.exist
      done()
    }, config.transitionDuration)
  })

  it('should be able to render HTML title modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[3]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelector('.modal-title i')).to.exist
      done()
    }, config.transitionDuration)
  })

  it('should be able to render no footer modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[4]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelector('.modal-footer')).not.exist
      done()
    }, config.transitionDuration)
  })

  it('should be able to render customize footer modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[5]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelectorAll('.modal-footer button').length).to.equal(3)
      done()
    }, config.transitionDuration)
  })

  it('should be able to close customize footer modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[5]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      expect(vm.$el.querySelectorAll('.modal-footer button').length).to.equal(3)
      vm.$el.querySelectorAll('.modal-footer button')[0].click()
      setTimeout(() => {
        expect(vm.$el.querySelector('.modal-backdrop')).not.exist
        expect(vm.$el.querySelector('.modal')).not.exist
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to close modal on backdrop click', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[0]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      vm.$el.querySelector('.modal').click()
      setTimeout(() => {
        expect(vm.$el.querySelector('.modal-backdrop')).not.exist
        expect(vm.$el.querySelector('.modal')).not.exist
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should not be able to close backdrop-false modal', (done) => {
    const Constructor = Vue.extend(ModalDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelectorAll('button')[6]
    trigger.click()
    setTimeout(() => {
      expect(vm.$el.querySelector('.modal-backdrop')).to.exist
      expect(vm.$el.querySelector('.modal')).to.exist
      vm.$el.querySelector('.modal').click()
      setTimeout(() => {
        expect(vm.$el.querySelector('.modal-backdrop')).to.exist
        expect(vm.$el.querySelector('.modal')).to.exist
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })
})
