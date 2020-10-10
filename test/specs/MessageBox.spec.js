import $ from 'jquery'
import MessageBox from '../../src/services/messagebox/MessageBox'
import { createVm, destroyVm, sleep, triggerEvent, transition } from '../utils'

function alertVm () {
  return createVm('<div><btn @click="alert" type="primary">Click to open an alert modal</btn></div>', {}, {
    methods: {
      alert () {
        this.$alert({
          title: 'Title',
          content: 'This is an alert message.'
        }, (msg) => {
          // callback after modal dismissed
          this.$notify(`You selected ${msg}.`)
        })
      }
    }
  })
}

function confirmVm () {
  return createVm('<div><btn @click="confirm" type="primary">Click to open a confirm modal</btn></div>', {}, {
    methods: {
      confirm () {
        this.$confirm({
          title: 'Confirm',
          content: 'This item will be permanently deleted. Continue?'
        })
          .then(() => {
            this.$notify({
              type: 'success',
              content: 'Delete completed.'
            })
          })
          .catch(() => {
            this.$notify('Delete canceled.')
          })
      }
    }
  })
}

function promptVm () {
  return createVm('<div><btn @click="confirm" type="primary">Click to open a prompt modal</btn></div>', {}, {
    methods: {
      confirm () {
        this.$prompt({
          title: 'Welcome',
          content: 'Please input your email:',
          // A simple input validator
          // returns the err msg (not valid) or null (valid)
          validator (value) {
            return /\S+@\S+\.\S+/.test(value) ? null : 'Email address is not valid!'
          }
        })
          .then((value) => {
            this.$notify({
              type: 'success',
              content: `You email address is ${value}`
            })
          })
          .catch(() => {
            this.$notify('Input canceled.')
          })
      }
    }
  })
}

describe('MessageBox', () => {
  let vm
  let spy
  let savedLog

  beforeEach(() => {
    savedLog = console.log
    console.log = function () {
      return true
    }
    spy = sinon.spy(console, 'log')
  })

  afterEach(() => {
    console.log.restore()
    console.log = savedLog
    destroyVm(vm)
    $('.modal-backdrop, .modal').remove()
    $('.alert').remove()
  })

  it('should be able to open alert box', async () => {
    vm = alertVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('.btn')
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Title')
    expect(document.querySelector('.modal-body > p').textContent).to.equal('This is an alert message.')
    document.querySelector('.modal .btn').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('You selected ok.')
  })

  it('should be able to open confirm box and cancel', async () => {
    vm = confirmVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('.btn')
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Confirm')
    document.querySelectorAll('.modal .btn')[0].click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('Delete canceled.')
  })

  it('should be able to open confirm box and ok', async () => {
    vm = confirmVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('.btn')
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Confirm')
    document.querySelectorAll('.modal .btn')[1].click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('Delete completed.')
  })

  it('should be able to open prompt box and cancel', async () => {
    vm = promptVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('.btn')
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Welcome')
    document.querySelectorAll('.modal .btn')[0].click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('Input canceled.')
  })

  it('should be able to open prompt box and ok', async () => {
    vm = promptVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('.btn')
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Welcome')
    const input = document.querySelector('.modal input')
    input.value = 'wxsms@foxmail.com'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await vm.$nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).not.contain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).to.equal('none')
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.equal('You email address is wxsms@foxmail.com')
  })

  it('should be able to validate prompt input', async () => {
    vm = promptVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelector('.btn')
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Welcome')
    const input = document.querySelector('.modal input')
    input.value = 'invalid-email-address'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await vm.$nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).to.contain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).not.equal('none')
    expect(formGroup.querySelector('.help-block').textContent).to.equal('Email address is not valid!')
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal')).to.exist
    document.querySelectorAll('.modal .btn')[0].click()
    await vm.$nextTick()
    await sleep(transition)
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
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Title')
    const input = document.querySelector('.modal input')
    input.value = 'test'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await vm.$nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).not.contain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).to.equal('none')
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, null, 'test')
  })

  it('should be able add default value to prompt box', async () => {
    MessageBox.prompt({
      title: 'Title',
      content: 'This is an alert message.',
      defaultValue: 'testtest'
    })
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Title')
    const input = document.querySelector('.modal input')
    expect(input.value).to.equal('testtest')
    await vm.$nextTick()
    document.querySelectorAll('.modal .btn')[0].click()
    await vm.$nextTick()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
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
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title').textContent).to.equal('Title')
    expect(document.querySelector('.modal-body > p').textContent).to.equal('This is an alert message.')
    document.querySelector('.modal .btn').click()
    await sleep(transition)
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
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelector('.modal .btn').click()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
  })

  it('should be able to work without options', async () => {
    MessageBox.alert(undefined, () => {
      console.log('ok')
    })
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal-title')).not.exist
    expect(document.querySelector('.modal-body > p').textContent).to.equal('')
    document.querySelector('.modal .btn').click()
    await sleep(transition)
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
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    triggerEvent(document.querySelector('.modal'), 'click')
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'ok')
  })

  it('should be able to use confirm with cancel callback', async () => {
    MessageBox.confirm({}, console.log)
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelectorAll('.modal .btn')[0].click()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'cancel')
  })

  it('should be able to use confirm with ok callback', async () => {
    MessageBox.confirm({}, console.log)
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelectorAll('.modal .btn')[1].click()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, null, 'ok')
  })

  it('should be able to use prompt with ok callback', async () => {
    MessageBox.prompt({}, console.log)
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelectorAll('.modal .btn')[0].click()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
    sinon.assert.calledWith(spy, 'cancel')
  })

  it('should be able to work with `custom-class`', async () => {
    MessageBox.alert({
      customClass: 'test-class'
    })
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('test-class')
    expect(document.querySelector('.modal').className).to.contain('in')
    document.querySelector('.modal .btn').click()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
  })

  it('should not be able to use HTML content if html=false', async () => {
    MessageBox.alert({
      content: '<a href="#" id="test-a">test</a>'
    })
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal #test-a')).not.exist
    document.querySelector('.modal .btn').click()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
  })

  it('should be able to use HTML content', async () => {
    MessageBox.alert({
      html: true,
      content: '<a href="#" id="test-a">test</a>'
    })
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(document.querySelector('.modal').className).to.contain('in')
    expect(document.querySelector('.modal #test-a')).to.exist
    document.querySelector('.modal .btn').click()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(document.querySelector('.modal')).not.exist
  })
})
