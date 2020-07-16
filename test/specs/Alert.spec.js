import Vue from 'vue'
import $ from 'jquery'
import Alert from '@src/components/alert/Alert.vue'
import AlertDoc from '@docs/pages/components/Alert.md'
import * as utils from '../utils'

const DEFAULT_ALERT_CLASS = 'alert-info'

describe('Alert', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(AlertDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  const getDefaultAlertLength = () => {
    return $el.find(`.${DEFAULT_ALERT_CLASS}`).length
  }

  it('should be able to add alert with no type', () => {
    const res = Vue.compile('<alert>{{ msg }}</alert>')
    const _vm = new Vue({
      data () {
        return {
          msg: 'This is a alert!'
        }
      },
      components: {Alert},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    _vm.$mount()
    const $alert = $(_vm.$el)
    expect($alert.hasClass('alert')).to.be.true
    expect($alert.hasClass(DEFAULT_ALERT_CLASS)).to.be.true
    $alert.remove()
    _vm.$destroy()
  })

  it('should be able to dismiss alerts', async () => {
    const _$el = $(vm.$refs['alert-dismissible'].$el)
    const $alert = _$el.find('.alert')
    expect($alert.length).to.equal(1)
    const closeBtn = $alert.find('button.close').get(0)
    utils.triggerEvent(closeBtn, 'click')
    await vm.$nextTick()
    expect(_$el.find('.alert').length).to.equal(0)
  })

  it('should be able to add dismissible alerts', async () => {
    const _$el = $(vm.$refs['alert-dismissible'].$el)
    const alertInstancesBefore = getDefaultAlertLength()
    const addAlertBtn = _$el.find('.btn-primary').get(0)
    utils.triggerEvent(addAlertBtn, 'click')
    await vm.$nextTick()
    const alertInstancesAfter = getDefaultAlertLength()
    expect(alertInstancesAfter).to.equal(alertInstancesBefore + 1)
  })

  it('should be able to add auto dismiss alerts', async () => {
    const _vm = vm.$refs['alert-auto-dismissing']
    const _$el = $(_vm.$el)
    _vm.duration = 1000
    await vm.$nextTick()
    const alertInstancesBefore = getDefaultAlertLength()
    const addAlertBtn = _$el.find('.btn-primary').get(0)
    utils.triggerEvent(addAlertBtn, 'click')
    await vm.$nextTick()
    const alertInstancesAfter = getDefaultAlertLength()
    expect(alertInstancesAfter).to.equal(alertInstancesBefore + 1)
    await utils.sleep(_vm.duration + 200)
    const alertInstancesAfterDelay = getDefaultAlertLength()
    expect(alertInstancesAfterDelay).to.equal(alertInstancesBefore)
  })
})
