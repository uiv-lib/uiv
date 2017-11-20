import Vue from 'vue'
import $ from 'jquery'
import Notification from '@src/services/notification/notification'
import NotificationDoc from '@docs/pages/components/Notification.md'
import utils from '../utils'

const OFFSET = '15px'

describe('Notification', () => {
  let vm
  let $el
  let spy
  let savedLog

  beforeEach(() => {
    savedLog = console.log
    console.log = function () {
      return true
    }
    const Constructor = Vue.extend(NotificationDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
    spy = sinon.spy(console, 'log')
  })

  afterEach(() => {
    console.log.restore()
    console.log = savedLog
    vm.$destroy()
    $el.remove()
    $('.alert').remove()
  })

  it('should be able to use notification', async () => {
    const _vm = vm.$refs['notification-example']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-info')
    expect(alert.className).to.contain('alert-dismissible')
    expect(alert.className).to.contain('fade')
    expect(alert.className).to.contain('in')
    expect(alert.querySelector('.media-heading')).not.exist
    expect(alert.querySelector('.media-body > div').textContent).to.equal('This is a simple notify msg.')
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
    sinon.assert.calledWith(spy, 'dismissed')
  })

  it('should be able to use no auto-dismiss notification', async () => {
    const _vm = vm.$refs['notification-example']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[1]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-info')
    expect(alert.className).to.contain('alert-dismissible')
    expect(alert.className).to.contain('fade')
    expect(alert.className).to.contain('in')
    expect(alert.querySelector('.media-heading').textContent).to.equal('Title')
    expect(alert.querySelectorAll('.media-body > div')[1].textContent).to.equal('This notification will not dismiss automatically.')
    await utils.sleep(5200)
    expect(document.querySelector('.alert')).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
    sinon.assert.calledWith(spy, 'dismissed')
  }).timeout(5000 + 2000)

  it('should be able to use `type=info` notification', async () => {
    const _vm = vm.$refs['notification-types']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-info')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(1)
    expect(alert.querySelectorAll('.media-left > .glyphicon-info-sign')).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `type=success` notification', async () => {
    const _vm = vm.$refs['notification-types']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[1]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-success')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(1)
    expect(alert.querySelectorAll('.media-left > .glyphicon-ok-sign')).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `type=warning` notification', async () => {
    const _vm = vm.$refs['notification-types']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[2]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-warning')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(1)
    expect(alert.querySelectorAll('.media-left > .glyphicon-info-sign')).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `type=danger` notification', async () => {
    const _vm = vm.$refs['notification-types']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[3]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-danger')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(1)
    expect(alert.querySelectorAll('.media-left > .glyphicon-remove-sign')).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=top-right` notification', async () => {
    const _vm = vm.$refs['notification-placements']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal(OFFSET)
    expect(alert.style.right).to.equal(OFFSET)
    expect(alert.style.bottom).to.equal('')
    expect(alert.style.left).to.equal('')
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=bottom-right` notification', async () => {
    const _vm = vm.$refs['notification-placements']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[1]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal('')
    expect(alert.style.right).to.equal(OFFSET)
    expect(alert.style.bottom).to.equal(OFFSET)
    expect(alert.style.left).to.equal('')
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=bottom-left` notification', async () => {
    const _vm = vm.$refs['notification-placements']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[2]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal('')
    expect(alert.style.right).to.equal('')
    expect(alert.style.bottom).to.equal(OFFSET)
    expect(alert.style.left).to.equal(OFFSET)
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=top-left` notification', async () => {
    const _vm = vm.$refs['notification-placements']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[3]
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal(OFFSET)
    expect(alert.style.right).to.equal('')
    expect(alert.style.bottom).to.equal('')
    expect(alert.style.left).to.equal(OFFSET)
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `dismissible=false` notification', async () => {
    const _vm = vm.$refs['notification-without-dismiss-btn']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await vm.$nextTick()
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    const alert = document.querySelectorAll('.alert')
    expect(alert.length).to.equal(2)
    expect(alert[0].querySelector('button.close')).not.exist
    expect(alert[1].querySelector('button.close')).not.exist
    await utils.sleep(5200)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  }).timeout(5000 + 2000)

  it('should be able to use without options and callback', async () => {
    Notification.notify(undefined)
    await utils.sleep(utils.transitionDuration)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use without Promise', async () => {
    // mute Promise
    const savedPromise = window.Promise
    window.Promise = null
    // alert
    Notification.notify({title: 'test'})
    // restore Promise
    window.Promise = savedPromise
    await utils.sleep(utils.transitionDuration)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to avoid invalid placement', async () => {
    Notification.notify({placement: 'top-bottom'}) // invalid
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use custom icon', async () => {
    Notification.notify({title: 'test', icon: 'fa fa-check'})
    await utils.sleep(utils.transitionDuration)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.querySelectorAll('.media-left > .fa').length).to.equal(1)
    expect(alert.querySelectorAll('.media-left > .fa-check')).to.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to disable icon with types', async () => {
    Notification.notify({title: 'test', icon: '', type: 'danger'})
    await utils.sleep(utils.transitionDuration)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.querySelector('.media-left')).not.exist
    alert.querySelector('button.close').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.alert')).not.exist
  })
})
