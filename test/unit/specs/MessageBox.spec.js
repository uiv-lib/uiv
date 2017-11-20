import Vue from 'vue'
import $ from 'jquery'
import MessageBox from '@src/services/messagebox/messageBox'
import MessageBoxDoc from '@docs/pages/components/MessageBox.md'
import utils from '../utils'

describe('MessageBox', () => {
  let vm
  let $el
  let spy
  let savedLog

  beforeEach(() => {
    savedLog = console.log
    console.log = function () {
      return true
    }
    const Constructor = Vue.extend(MessageBoxDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
    spy = sinon.spy(console, 'log')
  })

  afterEach(() => {
    console.log.restore()
    console.log = savedLog
    vm.$destroy()
    $el.remove()
    $('.modal-backdrop, .modal').remove()
    $('.alert').remove()
  })

  it('should be able to open alert box', async () => {
    const _vm = vm.$refs['message-box-alert']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelector('.btn')
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Title')
    expect(document.querySelector('.modal-body > p').textContent).to.equal('This is an alert message.')
    document.querySelector('.modal .btn').click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('You selected ok.')
  })

  it('should be able to open confirm box and cancel', async () => {
    const _vm = vm.$refs['message-box-confirm']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelector('.btn')
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Confirm')
    document.querySelectorAll('.modal .btn')[0].click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('Delete canceled.')
  })

  it('should be able to open confirm box and ok', async () => {
    const _vm = vm.$refs['message-box-confirm']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelector('.btn')
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Confirm')
    document.querySelectorAll('.modal .btn')[1].click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('Delete completed.')
  })

  it('should be able to open prompt box and cancel', async () => {
    const _vm = vm.$refs['message-box-prompt']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelector('.btn')
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Welcome')
    document.querySelectorAll('.modal .btn')[0].click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('Input canceled.')
  })

  it('should be able to open prompt box and ok', async () => {
    const _vm = vm.$refs['message-box-prompt']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelector('.btn')
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Welcome')
    const input = document.querySelector('.modal input')
    input.value = 'wxsms@foxmail.com'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await vm.$nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).not.contain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).to.equal('none')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('You email address is wxsms@foxmail.com')
  })

  it('should be able to validate prompt input', async () => {
    const _vm = vm.$refs['message-box-prompt']
    await vm.$nextTick()
    const trigger = _vm.$el.querySelector('.btn')
    trigger.click()
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Welcome')
    const input = document.querySelector('.modal input')
    input.value = 'invalid-email-address'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await vm.$nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).to.contain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).not.equal('none')
    expect(formGroup.querySelector('.help-block').textContent).to.equal('Email address is not valid!')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal')).to.exist
    document.querySelectorAll('.modal .btn')[0].click()
    await vm.$nextTick()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('Input canceled.')
  })

  it('should be able to use prompt without validator', async () => {
    MessageBox.prompt({
      title: 'Title',
      content: 'This is an alert message.'
    }, console.log)
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Title')
    const input = document.querySelector('.modal input')
    input.value = 'test'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await vm.$nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).not.contain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).to.equal('none')
    await utils.sleep(utils.transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, null, 'test')
  })

  it('should be able to work without browser Promise', async () => {
    // mute Promise
    const savedPromise = window.Promise
    window.Promise = null
    // alert
    MessageBox.alert({
      title: 'Title',
      content: 'This is an alert message.'
    }, () => {
      console.log('ok')
    })
    // restore Promise
    window.Promise = savedPromise
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Title')
    expect(document.querySelector('.modal-body > p').textContent).to.equal('This is an alert message.')
    document.querySelector('.modal .btn').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'ok')
  })

  it('should be able to work without browser Promise and callback', async () => {
    // mute Promise
    const savedPromise = window.Promise
    window.Promise = null
    // alert
    MessageBox.alert()
    // restore Promise
    window.Promise = savedPromise
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelector('.modal .btn').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
  })

  it('should be able to work without options', async () => {
    MessageBox.alert(undefined, () => {
      console.log('ok')
    })
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title')).not.exist
    expect(document.querySelector('.modal-body > p').textContent).to.equal('')
    document.querySelector('.modal .btn').click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'ok')
  })

  it('should be able to set alert backdrop to true', async () => {
    MessageBox
      .alert({
        backdrop: true
      })
      .then(() => {
        console.log('ok')
      })
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    utils.triggerEvent(document.querySelector('.modal'), 'click')
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'ok')
  })

  it('should be able to use confirm with cancel callback', async () => {
    MessageBox.confirm({}, console.log)
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelectorAll('.modal .btn')[0].click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'cancel')
  })

  it('should be able to use confirm with ok callback', async () => {
    MessageBox.confirm({}, console.log)
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelectorAll('.modal .btn')[1].click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, null, 'ok')
  })

  it('should be able to use prompt with ok callback', async () => {
    MessageBox.prompt({}, console.log)
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelectorAll('.modal .btn')[0].click()
    await utils.sleep(utils.transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'cancel')
  })
})
