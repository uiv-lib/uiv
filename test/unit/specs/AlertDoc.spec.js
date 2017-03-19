import Vue from 'vue'
import AlertDoc from '@/docs/AlertDoc.vue'

describe('AlertDoc', () => {
  it('Alert can be closed', (done) => {
    const Constructor = Vue.extend(AlertDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let alertInfo = vm.$el.querySelector('.alert-info')
      expect(alertInfo).to.exist
      let closedBtn = alertInfo.querySelector('button.close')
      closedBtn.click()
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.alert-info')).not.exist
        done()
      })
    })
  })

  it('Can add a Alert', (done) => {
    const Constructor = Vue.extend(AlertDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let alertSuccess = vm.$el.querySelectorAll('.alert-success')
      let alertSuccessLengthBefore = alertSuccess.length
      let addAlertBtn = vm.$el.querySelector('#addAlert')
      addAlertBtn.click()
      vm.$nextTick(() => {
        alertSuccess = vm.$el.querySelectorAll('.alert-success')
        let alertSuccessLengthAfter = alertSuccess.length
        expect(alertSuccessLengthAfter).to.equal(alertSuccessLengthBefore + 1)
        done()
      })
    })
  })

  it('Can add a Alert had duration', (done) => {
    const Constructor = Vue.extend(AlertDoc)
    const vm = new Constructor().$mount()
    vm.duration = 1000
    vm.$nextTick(() => {
      let alertSuccess = vm.$el.querySelectorAll('.alert-success')
      let alertSuccessLengthBefore = alertSuccess.length
      let addAlertBtn = vm.$el.querySelector('#addAlertHadDuration')
      addAlertBtn.click()
      vm.$nextTick(() => {
        alertSuccess = vm.$el.querySelectorAll('.alert-success')
        let alertSuccessLengthAfter = alertSuccess.length
        expect(alertSuccessLengthAfter).to.equal(alertSuccessLengthBefore + 1)
        setTimeout(() => {
          alertSuccess = vm.$el.querySelectorAll('.alert-success')
          alertSuccessLengthAfter = alertSuccess.length
          expect(alertSuccessLengthAfter).to.equal(alertSuccessLengthBefore)
          done()
        }, 1000)
      })
    })
  })
})
