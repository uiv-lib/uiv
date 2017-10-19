import Vue from 'vue'
import $ from 'jquery'
import Alert from '@src/components/alert/Alert.vue'
import AlertDoc from '@docs/pages/components/Alert.md'
import utils from './../utils'

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
    let $el = $(vm.$el)
    expect($el.hasClass('alert')).to.be.true
    expect($el.hasClass(DEFAULT_ALERT_CLASS)).to.be.true
    $el.remove()
    vm.$destroy()
  })

  it('should be able to dismiss alerts', async () => {
    let alert = $el.find('#alert-test')
    expect(alert.length).to.equal(1)
    let closedBtn = alert.find('button.close')
    closedBtn.click()
    await vm.$nextTick()
    expect($el.find('#alert-test').length).to.equal(0)
  })

  it('should be able to add dismissible alerts', async () => {
    let before = getDefaultAlertLength()
    let addAlertBtn = $el.find('#add-alert-1')
    addAlertBtn.click()
    await vm.$nextTick()
    let after = getDefaultAlertLength()
    expect(after).to.equal(before + 1)
  })

  it('should be able to add auto dismiss alerts', async () => {
    vm.duration = 1000
    await vm.$nextTick()
    let before = getDefaultAlertLength()
    let addAlertBtn = $el.find('#add-alert-2')
    addAlertBtn.click()
    await vm.$nextTick()
    let after = getDefaultAlertLength()
    expect(after).to.equal(before + 1)
    await utils.sleep(vm.duration + 200)
    let _after = getDefaultAlertLength()
    expect(_after).to.equal(before)
  })
})
