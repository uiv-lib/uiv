import Vue from 'vue'
import Alert from '@src/components/alert/Alert.vue'
import AlertDoc from '@docs/pages/components/Alert.md'
import utils from './../utils'
import i18n from '@docs/locale'

describe('AlertDoc', () => {
  let app

  beforeEach(() => {
    app = new Vue({
      i18n,
      template: '<alert-doc ref="doc"/>',
      components: {AlertDoc}
    })
    app.$i18n.locale = 'en-US'
  })

  afterEach(() => {
    try {
      app.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('Should be able to add alert with no type', (done) => {
    let res = Vue.compile('<alert>{{ msg }}</alert>')
    let vm = new Vue({
      data () {
        return {
          msg: 'This is a alert!'
        }
      },
      components: {Alert},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$nextTick(() => {
      expect(vm.$el.className).to.equal('alert alert-success')
      vm.$destroy()
      done()
    })
  })

  it('Alert can be closed', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let alertInfo = vm.$el.querySelector('#alert-test')
      expect(alertInfo).to.exist
      let closedBtn = alertInfo.querySelector('button.close')
      utils.triggerEvent(closedBtn, 'click')
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('#alert-test')).not.exist
        done()
      })
    })
  })

  it('Can add a Alert', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let alertSuccess = vm.$el.querySelectorAll('.alert-success')
      let alertSuccessLengthBefore = alertSuccess.length
      let addAlertBtn = vm.$el.querySelector('#add-alert-2')
      utils.triggerEvent(addAlertBtn, 'click')
      vm.$nextTick(() => {
        alertSuccess = vm.$el.querySelectorAll('.alert-success')
        let alertSuccessLengthAfter = alertSuccess.length
        expect(alertSuccessLengthAfter).to.equal(alertSuccessLengthBefore + 1)
        done()
      })
    })
  })

  it('Can add a Alert had duration', (done) => {
    let vm = app.$mount().$refs.doc
    vm.duration = 1000
    vm.$nextTick(() => {
      let alertSuccess = vm.$el.querySelectorAll('.alert-success')
      let alertSuccessLengthBefore = alertSuccess.length
      let addAlertBtn = vm.$el.querySelector('#add-alert-1')
      utils.triggerEvent(addAlertBtn, 'click')
      vm.$nextTick(() => {
        alertSuccess = vm.$el.querySelectorAll('.alert-success')
        let alertSuccessLengthAfter = alertSuccess.length
        expect(alertSuccessLengthAfter).to.equal(alertSuccessLengthBefore + 1)
        setTimeout(() => {
          alertSuccess = vm.$el.querySelectorAll('.alert-success')
          alertSuccessLengthAfter = alertSuccess.length
          expect(alertSuccessLengthAfter).to.equal(alertSuccessLengthBefore)
          done()
        }, 1200)
      })
    })
  })
})
