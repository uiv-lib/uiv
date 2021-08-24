import $ from 'jquery'
import { createVm, destroyVm, sleep, triggerEvent } from '../utils'

const DEFAULT_ALERT_CLASS = 'alert-info'

describe('Alert', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  const getDefaultAlertLength = ($el) => {
    return $el.find(`.${DEFAULT_ALERT_CLASS}`).length
  }

  it('should be able to add alert with no type', () => {
    vm = createVm('<alert>{{ msg }}</alert>', {
      msg: 'This is a alert!',
    })
    const $alert = $(vm.$el)
    expect($alert.hasClass('alert')).to.be.true
    expect($alert.hasClass(DEFAULT_ALERT_CLASS)).to.be.true
  })

  it('should be able to dismiss alerts', async () => {
    vm = createVm(
      `
  <section>
    <alert type="warning" v-if="show" dismissible @dismissed="show = false">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </alert>
  </section>
    `,
      {
        show: true,
      }
    )
    const _$el = $(vm.$el)
    const $alert = _$el.find('.alert')
    expect($alert.length).to.equal(1)
    const closeBtn = $alert.find('button.close').get(0)
    triggerEvent(closeBtn, 'click')
    await vm.$nextTick()
    expect(_$el.find('.alert').length).to.equal(0)
  })

  it('should be able to add dismissible alerts', async () => {
    vm = createVm(
      `
      <section>
    <alert type="warning" v-if="show" dismissible @dismissed="show = false">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </alert>
    <alert v-for="(item, index) in alerts" dismissible :key="item.key" @dismissed="alerts.splice(index, 1)">
      <b>Heads up!</b> This alert needs your attention, but it's not super important.
    </alert>
    <hr/>
    <btn type="primary" @click="addDismissibleAlert()">Add Dismissible Alert</btn>
  </section>
    `,
      {
        show: true,
        alerts: [],
      },
      {
        methods: {
          addDismissibleAlert() {
            this.alerts.push({ key: new Date().getTime() })
          },
        },
      }
    )
    const _$el = $(vm.$el)
    const alertInstancesBefore = getDefaultAlertLength(_$el)
    const addAlertBtn = _$el.find('.btn-primary').get(0)
    triggerEvent(addAlertBtn, 'click')
    await vm.$nextTick()
    const alertInstancesAfter = getDefaultAlertLength(_$el)
    expect(alertInstancesAfter).to.equal(alertInstancesBefore + 1)
  })

  it('should be able to add auto dismiss alerts', async () => {
    vm = createVm(
      `
      <section>
    <alert v-for="(item, index) in alerts" :duration="duration" :key="item.key" @dismissed="alerts.splice(index, 1)">
      This alert <b>will dismiss after {{duration}}ms</b>.
    </alert>
    <hr/>
    <btn type="primary" @click="addAutoDismissAlert()">Add Auto Dismiss Alert</btn>
  </section>
    `,
      {
        alerts: [],
        duration: 2000,
      },
      {
        methods: {
          addAutoDismissAlert() {
            this.alerts.push({ key: new Date().getTime() })
          },
        },
      }
    )
    const _$el = $(vm.$el)
    vm.duration = 1000
    await vm.$nextTick()
    const alertInstancesBefore = getDefaultAlertLength(_$el)
    const addAlertBtn = _$el.find('.btn-primary').get(0)
    triggerEvent(addAlertBtn, 'click')
    await vm.$nextTick()
    const alertInstancesAfter = getDefaultAlertLength(_$el)
    expect(alertInstancesAfter).to.equal(alertInstancesBefore + 1)
    await sleep(vm.duration + 200)
    const alertInstancesAfterDelay = getDefaultAlertLength(_$el)
    expect(alertInstancesAfterDelay).to.equal(alertInstancesBefore)
  })
})
