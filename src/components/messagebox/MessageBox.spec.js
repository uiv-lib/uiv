import newLocale from '../../locale/lang/zh-CN'
import {
  createWrapper,
  keyCodes,
  nextTick,
  sleep,
  transition,
  triggerEvent,
} from '../../__test__/utils'
import { RouterLinkStub } from '@vue/test-utils'

function alertVm() {
  return createWrapper(
    '<div><btn @click="alert" type="primary">Click to open an alert modal</btn></div>',
    {},
    {
      methods: {
        alert() {
          this.$alert(
            {
              title: 'Title',
              content: 'This is an alert message.',
            },
            (msg) => {
              // callback after modal dismissed
              this.$notify(`You selected ${msg}.`)
            }
          )
        },
      },
    }
  )
}

function confirmVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a confirm modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$confirm({
            title: 'Confirm',
            content: 'This item will be permanently deleted. Continue?',
          })
            .then(() => {
              this.$notify({
                type: 'success',
                content: 'Delete completed.',
              })
            })
            .catch(() => {
              this.$notify('Delete canceled.')
            })
        },
      },
    }
  )
}

function promptVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a prompt modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$prompt({
            title: 'Welcome',
            content: 'Please input your email:',
            // A simple input validator
            // returns the err msg (not valid) or null (valid)
            validator(value) {
              return /\S+@\S+\.\S+/.test(value)
                ? null
                : 'Email address is not valid!'
            },
          })
            .then((value) => {
              this.$notify({
                type: 'success',
                content: `You email address is ${value}`,
              })
            })
            .catch(() => {
              this.$notify('Input canceled.')
            })
        },
      },
    }
  )
}

describe('MessageBox', () => {
  let spy
  let savedLog

  beforeEach(() => {
    savedLog = console.log
    console.log = function () {
      return true
    }
    spy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    spy.mockRestore()
    console.log = savedLog
  })

  it('should be able to open alert box', async () => {
    const wrapper = alertVm()
    await nextTick()
    const trigger = wrapper.find('.btn')
    trigger.trigger('click')
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeDefined()
    expect(document.querySelector('.modal').className).toContain('in')
    expect(document.querySelector('.modal-title').textContent).toEqual('Title')
    expect(document.querySelector('.modal-body > p').textContent).toEqual(
      'This is an alert message.'
    )
    document.querySelector('.modal .btn').click()
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeNull()
    expect(document.querySelector('.modal')).toBeNull()
    expect(document.querySelector('.alert')).toBeDefined()
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('You selected ok.')
  })

  it('should be able to open confirm box and cancel', async () => {
    const wrapper = confirmVm()
    await nextTick()
    const trigger = wrapper.find('.btn')
    trigger.trigger('click')
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeDefined()
    expect(document.querySelector('.modal').className).toContain('in')
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Confirm'
    )
    document.querySelectorAll('.modal .btn')[0].click()
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeNull()
    expect(document.querySelector('.modal')).toBeNull()
    expect(document.querySelector('.alert')).toBeDefined()
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Delete canceled.')
  })

  it('should be able to open confirm box and ok', async () => {
    const wrapper = confirmVm()
    await nextTick()
    const trigger = wrapper.find('.btn')
    trigger.trigger('click')
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeDefined()
    expect(document.querySelector('.modal').className).toContain('in')
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Confirm'
    )
    document.querySelectorAll('.modal .btn')[1].click()
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeNull()
    expect(document.querySelector('.modal')).toBeNull()
    expect(document.querySelector('.alert')).toBeDefined()
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Delete completed.')
  })

  it('should be able to open prompt box and cancel', async () => {
    const wrapper = promptVm()
    await nextTick()
    const trigger = wrapper.find('.btn')
    trigger.trigger('click')
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeDefined()
    expect(document.querySelector('.modal').className).toContain('in')
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Welcome'
    )
    document.querySelectorAll('.modal .btn')[0].click()
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeNull()
    expect(document.querySelector('.modal')).toBeNull()
    expect(document.querySelector('.alert')).toBeDefined()
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Input canceled.')
  })

  it('should be able to open prompt box and ok', async () => {
    const wrapper = promptVm()
    await nextTick()
    const trigger = wrapper.find('.btn')
    trigger.trigger('click')
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeDefined()
    expect(document.querySelector('.modal').className).toContain('in')
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Welcome'
    )
    const input = document.querySelector('.modal input')
    input.value = 'wxsms@foxmail.com'
    triggerEvent(input, 'input')
    await nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).not.toContain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).toEqual('none')
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).toBeNull()
    expect(document.querySelector('.modal')).toBeNull()
    expect(document.querySelector('.alert')).toBeDefined()
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('You email address is wxsms@foxmail.com')
  })

  it('should be able to validate prompt input', async () => {
    const wrapper = promptVm()
    await nextTick()
    const trigger = wrapper.find('.btn')
    trigger.trigger('click')
    await sleep(transition)
    await nextTick()
    expect(document.querySelector('.modal-backdrop')).toBeDefined()
    expect(document.querySelector('.modal').className).toContain('in')
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Welcome'
    )
    const input = document.querySelector('.modal input')
    input.value = 'invalid-email-address'
    triggerEvent(input, 'input')
    await nextTick()
    document.querySelectorAll('.modal .btn')[1].click()
    await nextTick()
    const formGroup = document.querySelector('.modal .form-group')
    expect(formGroup.className).toContain('has-error')
    expect(formGroup.querySelector('.help-block').style.display).not.toEqual(
      'none'
    )
    expect(formGroup.querySelector('.help-block').textContent).toEqual(
      'Email address is not valid!'
    )
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).toBeDefined()
    expect(document.querySelector('.modal')).toBeDefined()
    document.querySelectorAll('.modal .btn')[0].click()
    await nextTick()
    await sleep(transition)
    expect(document.querySelector('.modal-backdrop')).toBeNull()
    expect(document.querySelector('.modal')).toBeNull()
    expect(document.querySelector('.alert')).toBeDefined()
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Input canceled.')
  })
})
