import $ from 'jquery'
import { createVm, destroyVm, sleep, transition } from '../utils'
import Notification from '../../src/services/notification/Notification'

const OFFSET = '15px'

function baseVm() {
  return createVm(
    `<section>
    <btn @click="notify" type="primary">Simplest Notification</btn>
    <btn @click="notify2" type="primary">No Auto-dismiss Notification</btn>
  </section>`,
    {},
    {
      methods: {
        // example with callback
        // pass a String as the notification content
        notify() {
          this.$notify('This is a simple notify msg.', () => {
            // callback after dismissed
            console.log('dismissed')
          })
        },
        // example with Promise and options
        notify2() {
          this.$notify({
            title: 'Title',
            content: 'This notification will not dismiss automatically.',
            duration: 0,
          }).then(() => {
            // resolve after dismissed
            console.log('dismissed')
          })
        },
      },
    }
  )
}

function typesVm() {
  return createVm(
    `<section>
    <btn @click="info" type="info">Info</btn>
    <btn @click="success" type="success">Success</btn>
    <btn @click="warning" type="warning">Warning</btn>
    <btn @click="danger" type="danger">Danger</btn>
  </section>`,
    {},
    {
      methods: {
        info() {
          this.$notify({
            type: 'info',
            title: 'Heads up!',
            content:
              "This alert needs your attention, but it's not super important.",
          })
        },
        success() {
          this.$notify({
            type: 'success',
            title: 'Well done!',
            content: 'You successfully read this important alert message.',
          })
        },
        warning() {
          // simple warning with content only
          this.$notify.warning(
            "Better check yourself, you're not looking too good."
          )
        },
        danger() {
          // error msg with title and content (other options available too)
          // `error` is an alias of `danger` (both of them works)
          this.$notify.error({
            title: 'Oh snap!',
            content: 'Change a few things up and try submitting again.',
          })
        },
      },
    }
  )
}

function placementVm() {
  return createVm(
    `<section>
    <btn @click="notify('top-right')" type="primary">Top Right (Default)</btn>
    <btn @click="notify('bottom-right')" type="primary">Bottom Right</btn>
    <btn @click="notify('bottom-left')" type="primary">Bottom Left</btn>
    <btn @click="notify('top-left')" type="primary">Top Left</btn>
  </section>`,
    {},
    {
      methods: {
        notify(placement) {
          this.$notify({
            placement, // equal to `placement: placement` in ES6
            title: 'Title',
            content: `This is a notify msg at ${placement}.`,
          })
        },
      },
    }
  )
}

describe('Notification', () => {
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
    $('.alert').remove()
  })

  it('should be able to use notification', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-info')
    expect(alert.className).to.contain('alert-dismissible')
    expect(alert.className).to.contain('fade')
    expect(alert.className).to.contain('in')
    expect(alert.querySelector('.media-heading')).not.exist
    expect(alert.querySelector('.media-body > div').textContent).to.equal(
      'This is a simple notify msg.'
    )
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
    sinon.assert.calledWith(spy, 'dismissed')
  })

  it('should be able to use no auto-dismiss notification', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[1]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-info')
    expect(alert.className).to.contain('alert-dismissible')
    expect(alert.className).to.contain('fade')
    expect(alert.className).to.contain('in')
    expect(alert.querySelector('.media-heading').textContent).to.equal('Title')
    expect(alert.querySelectorAll('.media-body > div')[1].textContent).to.equal(
      'This notification will not dismiss automatically.'
    )
    await sleep(5000 + 1000)
    expect(document.querySelector('.alert')).to.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
    sinon.assert.calledWith(spy, 'dismissed')
  }).timeout(5000 + 3000)

  it('should be able to use `type=info` notification', async () => {
    vm = typesVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-info')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(
      1
    )
    expect(alert.querySelectorAll('.media-left > .glyphicon-info-sign')).to
      .exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `type=success` notification', async () => {
    vm = typesVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[1]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-success')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(
      1
    )
    expect(alert.querySelectorAll('.media-left > .glyphicon-ok-sign')).to.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `type=warning` notification', async () => {
    vm = typesVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[2]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-warning')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(
      1
    )
    expect(alert.querySelectorAll('.media-left > .glyphicon-info-sign')).to
      .exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `type=danger` notification', async () => {
    vm = typesVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[3]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('alert-danger')
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).to.equal(
      1
    )
    expect(alert.querySelectorAll('.media-left > .glyphicon-remove-sign')).to
      .exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=top-right` notification', async () => {
    vm = placementVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal(OFFSET)
    expect(alert.style.right).to.equal(OFFSET)
    expect(alert.style.bottom).to.equal('')
    expect(alert.style.left).to.equal('')
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=bottom-right` notification', async () => {
    vm = placementVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[1]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal('')
    expect(alert.style.right).to.equal(OFFSET)
    expect(alert.style.bottom).to.equal(OFFSET)
    expect(alert.style.left).to.equal('')
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=bottom-left` notification', async () => {
    vm = placementVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[2]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal('')
    expect(alert.style.right).to.equal('')
    expect(alert.style.bottom).to.equal(OFFSET)
    expect(alert.style.left).to.equal(OFFSET)
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `placement=top-left` notification', async () => {
    vm = placementVm()
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[3]
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.style.top).to.equal(OFFSET)
    expect(alert.style.right).to.equal('')
    expect(alert.style.bottom).to.equal('')
    expect(alert.style.left).to.equal(OFFSET)
    alert.querySelector('button.close').click()
    await sleep(transition)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use `dismissible=false` notification', async () => {
    vm = createVm(
      '<div><btn @click="notify" type="primary">Notification Without Dismiss Button</btn></div>',
      {},
      {
        methods: {
          notify() {
            this.$notify({
              title: 'Title',
              content: 'This is a notification without dismiss btn.',
              dismissible: false,
            })
          },
        },
      }
    )
    await vm.$nextTick()
    const trigger = vm.$el.querySelectorAll('.btn')[0]
    trigger.click()
    await vm.$nextTick()
    trigger.click()
    await sleep(transition)
    await vm.$nextTick()
    const alert = document.querySelectorAll('.alert')
    expect(alert.length).to.equal(2)
    expect(alert[0].querySelector('button.close')).not.exist
    expect(alert[1].querySelector('button.close')).not.exist
    await sleep(5000 + 1000)
    await vm.$nextTick()
    expect(document.querySelector('.alert')).not.exist
  }).timeout(5000 + 3000)

  it('should be able to use without options and callback', async () => {
    Notification.notify(undefined)
    await sleep(transition)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use without Promise', async () => {
    // mute Promise
    const savedPromise = window.Promise
    window.Promise = null
    // alert
    Notification.notify({ title: 'test' })
    // restore Promise
    window.Promise = savedPromise
    await sleep(transition)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to avoid invalid placement', async () => {
    Notification.notify({ placement: 'top-bottom' }) // invalid
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use custom icon', async () => {
    Notification.notify({ title: 'test', icon: 'fa fa-check' })
    await sleep(transition)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.querySelectorAll('.media-left > .fa').length).to.equal(1)
    expect(alert.querySelectorAll('.media-left > .fa-check')).to.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to disable icon with types', async () => {
    Notification.notify({ title: 'test', icon: '', type: 'danger' })
    await sleep(transition)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.querySelector('.media-left')).not.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to work with `custom-class`', async () => {
    Notification.notify({
      title: 'test',
      type: 'danger',
      customClass: 'test-class',
    })
    await sleep(transition)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.className).to.contain('test-class')
    expect(alert.className).to.contain('alert-danger')
    alert.querySelector('button.close').click()
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should not be able to use HTML content if html=false', async () => {
    Notification.notify({
      title: 'test',
      content: '<a href="#" id="test-a">test</a>',
    })
    await sleep(transition)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.querySelector('#test-a')).not.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })

  it('should be able to use HTML content', async () => {
    Notification.notify({
      title: 'test',
      html: true,
      content: '<a href="#" id="test-a">test</a>',
    })
    await sleep(transition)
    const alert = document.querySelector('.alert')
    expect(alert).to.exist
    expect(alert.querySelector('#test-a')).to.exist
    alert.querySelector('button.close').click()
    await sleep(transition)
    expect(document.querySelector('.alert')).not.exist
  })
})
