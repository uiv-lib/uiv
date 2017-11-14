import Vue from 'vue'
import $ from 'jquery'
import utils from './../utils'
import TimePickerDoc from '@docs/pages/components/TimePicker.md'

describe('TimePicker', () => {
  let vm
  let $el
  const stepDelay = 100

  beforeEach(() => {
    const Constructor = Vue.extend(TimePickerDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to toggle meridian', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    const meridianText = toggleBtn.textContent
    expect(meridianText).to.equal('AM')
    utils.triggerEvent(toggleBtn, 'click')
    await vm.$nextTick()
    const meridianTextAfterClick = toggleBtn.textContent
    expect(meridianTextAfterClick).to.equal('PM')
    utils.triggerEvent(toggleBtn, 'click')
    await vm.$nextTick()
    const meridianTextAfterTwoClick = toggleBtn.textContent
    expect(meridianTextAfterTwoClick).to.equal('AM')
  })

  it('should be able to add hour(s)', async () => {
    const _vm = vm.$refs['time-picker-example']
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    const beforeValue = parseInt(hoursInput.value)
    const hourPlus = _vm.$el.querySelectorAll('td')[0].querySelector('button')

    // Due to the order in which the events are triggered by the browsers,
    // safegards are used to prevented unwanted multiple increases, this is why
    // tests should be in this order: click > mouseup > mousedown > touchend > touchstart > key > wheel

    const testHourForSingleEvent = async (el, evtType) => {
      _vm.time.setHours(2)
      _vm.time = new Date(_vm.time)
      await vm.$nextTick()
      utils.triggerEvent(el, evtType)
      await vm.$nextTick()
      expect(parseInt(hoursInput.value)).to.equal(3)
    }

    const testHourForQueuedEvents = async (el, firstEvtType, ticks, secondEvtType) => {
      _vm.time.setHours(2)
      _vm.time = new Date(_vm.time)
      await vm.$nextTick()
      utils.triggerEvent(el, firstEvtType)
      await utils.sleep(ticks * stepDelay)
      utils.triggerEvent(el, secondEvtType)
      await vm.$nextTick()
      expect(parseInt(hoursInput.value)).to.equal(2 + ticks)
    }

    // click hourPlus
    utils.triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    let afterValue = parseInt(hoursInput.value)
    if (beforeValue !== 12) {
      expect(afterValue).to.equal(beforeValue + 1)
    } else {
      expect(afterValue).to.equal(1)
    }
    _vm.time.setHours(23)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    utils.triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    afterValue = parseInt(hoursInput.value)
    expect(afterValue).to.equal(12)

    // mouseup hourPlus
    await testHourForSingleEvent(hourPlus, 'mouseup')

    // mousedown/up hourPlus
    await testHourForQueuedEvents(hourPlus, 'mousedown', 1, 'mouseup')

    // Long mousedown/up hourPlus
    await testHourForQueuedEvents(hourPlus, 'mousedown', 2, 'mouseup')

    // touchend hourPlus
    await testHourForSingleEvent(hourPlus, 'touchend')

    // touchstart/end hourPlus
    await testHourForQueuedEvents(hourPlus, 'touchstart', 1, 'touchend')

    // Long touchstart/end hourPlus
    await testHourForQueuedEvents(hourPlus, 'touchstart', 2, 'touchend')

    // Keypress up arrow
    _vm.time.setHours(2)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    utils.triggerKey(hoursInput, utils.keyCodes.up, 'down')
    await utils.sleep(stepDelay)
    utils.triggerKey(hoursInput, utils.keyCodes.up, 'up')
    await vm.$nextTick()
    afterValue = parseInt(hoursInput.value)
    expect(afterValue).to.equal(3)

    // Wheel
    _vm.time.setHours(2)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    utils.triggerEvent(hoursInput, 'wheel', {deltaY: -1})
    await vm.$nextTick()
    afterValue = parseInt(hoursInput.value)
    expect(afterValue).to.equal(3)
  })

  it('should be able to add 1 minute', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.minStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    const minuteInput = _vm.$el.querySelectorAll('input')[1]
    const beforeValue = parseInt(minuteInput.value)
    const minutesPlus = _vm.$el.querySelectorAll('tr td button')[1]
    utils.triggerEvent(minutesPlus, 'click')
    await vm.$nextTick()
    const afterValue = parseInt(minuteInput.value)
    if (beforeValue !== 59) {
      expect(afterValue).to.equal(beforeValue + 1)
    } else {
      expect(afterValue).to.equal(0)
    }
  })

  it('should be able to minus 1 hour', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.hourStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    const beforeValue = parseInt(hoursInput.value)
    const hourMinus = _vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    utils.triggerEvent(hourMinus, 'click')
    await vm.$nextTick()
    let afterValue = parseInt(hoursInput.value)
    if (beforeValue !== 1) {
      expect(afterValue).to.equal(beforeValue - 1)
    } else {
      expect(afterValue).to.equal(12)
    }
    _vm.time.setHours(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    utils.triggerEvent(hourMinus, 'click')
    await vm.$nextTick()
    afterValue = parseInt(hoursInput.value)
    expect(afterValue).to.equal(11)
  })

  it('should be able to minus 1 minute', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.minStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    const minuteInput = _vm.$el.querySelectorAll('input')[1]
    const beforeValue = parseInt(minuteInput.value)
    const minutesMinus = _vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    utils.triggerEvent(minutesMinus, 'click')
    await vm.$nextTick()
    const afterValue = parseInt(minuteInput.value)
    if (beforeValue !== 0) {
      expect(afterValue).to.equal(beforeValue - 1)
    } else {
      expect(afterValue).to.equal(59)
    }
  })

  it('should be able to use 24h mode', async () => {
    const _vm = vm.$refs['time-picker-24-example']
    await vm.$nextTick()
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(toggleBtn).not.exist
  })

  it('should be able to display correctly when hour = 0', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hourValue = parseInt(_vm.$el.querySelectorAll('input')[0].value)
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourValue).to.equal(12)
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should be able to display correctly when hour = 12', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(12)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hourValue = parseInt(_vm.$el.querySelectorAll('input')[0].value)
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourValue).to.equal(12)
    expect(toggleBtn.textContent).to.equal('PM')
  })

  it('should be able to set hour using input in 24h mode', async () => {
    const _vm = vm.$refs['time-picker-24-example']
    _vm.time.setHours(12)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    hoursInput.value = 12
    await vm.$nextTick()
    expect(parseInt(hoursInput.value)).to.equal(12)
    hoursInput.value = 13
    await vm.$nextTick()
    expect(parseInt(hoursInput.value)).to.equal(13)
  })

  it('should be able to set hour using input in 12h mode', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(12)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    expect(parseInt(hoursInput.value)).to.equal(12)
    hoursInput.value = 5
    await vm.$nextTick()
    expect(parseInt(hoursInput.value)).to.equal(5)
  })

  it('should be able to set minute using input', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(12)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const minuteInput = _vm.$el.querySelectorAll('input')[1]
    expect(parseInt(minuteInput.value)).to.equal(0)
    minuteInput.value = 5
    await vm.$nextTick()
    expect(parseInt(minuteInput.value)).to.equal(5)
  })

  it('should add hour when minute is 60', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(59)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    const minutesInput = _vm.$el.querySelectorAll('input')[1]
    const beforeHoursValue = parseInt(hoursInput.value)
    const minutesPlus = _vm.$el.querySelectorAll('tr td button')[1]
    utils.triggerEvent(minutesPlus, 'click')
    await vm.$nextTick()
    const afterHoursValue = parseInt(hoursInput.value)
    const afterMinutesValue = parseInt(minutesInput.value)
    expect(afterHoursValue).to.equal(beforeHoursValue + 1)
    expect(afterMinutesValue).to.equal(0)
  })

  it('should minus hour when minute is -1', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    const beforeHoursValue = parseInt(hoursInput.value)
    const minutesMinus = _vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    utils.triggerEvent(minutesMinus, 'click')
    await vm.$nextTick()
    const afterHoursValue = parseInt(hoursInput.value)
    const afterMinutesText = parseInt(_vm.$el.querySelectorAll('input')[1].value)
    expect(afterHoursValue).to.equal(beforeHoursValue - 1)
    expect(afterMinutesText).to.equal(59)
  })

  it('can be set to 9:00', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    const minutesInput = _vm.$el.querySelectorAll('input')[1]
    const hoursText = hoursInput.value
    const minutesText = minutesInput.value
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hoursText).to.equal('09')
    expect(minutesText).to.equal('00')
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should not be able to update time bigger than max', async () => {
    const _vm = vm.$refs['time-picker-limit-example']
    _vm.time.setHours(20)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    const hourPlus = _vm.$el.querySelectorAll('td')[0].querySelector('button')
    expect(hoursInput.value).to.equal('08')
    utils.triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    expect(hoursInput.value).to.equal('08')
  })

  it('should not be able to update time smaller than min', async () => {
    const _vm = vm.$refs['time-picker-limit-example']
    _vm.time.setHours(8)
    _vm.time.setMinutes(30)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hoursInput = _vm.$el.querySelectorAll('input')[0]
    expect(hoursInput.value).to.equal('08')
    const hourMinus = _vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    utils.triggerEvent(hourMinus, 'click')
    await vm.$nextTick()
    const minutesInput = _vm.$el.querySelectorAll('input')[1]
    expect(hoursInput.value).to.equal('08')
    expect(minutesInput.value).to.equal('00')
  })

  it('should be able to use custom icons', async () => {
    const _vm = vm.$refs['time-picker-icons-example']
    const $el = $(_vm.$el)
    expect($el.find('tr:first-child .btn > i').get(0).className).to.contain('glyphicon-plus')
    expect($el.find('tr:last-child .btn > i').get(0).className).to.contain('glyphicon-minus')
  })
})
