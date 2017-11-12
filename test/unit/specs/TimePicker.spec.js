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

  it('should be able to add hours', async () => {
    const _vm = vm.$refs['time-picker-example']
    await vm.$nextTick()
    const hourInput = _vm.$el.querySelectorAll('input')[0]
    const beforeText = hourInput.value
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
      afterText = hourInput.value
      expect(parseInt(afterText)).to.equal(3)
    }

    const testHourForQueuedEvents = async (el, firstEvtType, ticks, secondEvtType) => {
      _vm.time.setHours(2)
      _vm.time = new Date(_vm.time)
      await vm.$nextTick()
      utils.triggerEvent(el, firstEvtType)
      await utils.sleep(ticks * stepDelay)
      utils.triggerEvent(el, secondEvtType)
      await vm.$nextTick()
      afterText = hourInput.value
      expect(parseInt(afterText)).to.equal(2 + ticks)
    }

    // click hourPlus
    utils.triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    let afterText = hourInput.value
    if (parseInt(beforeText) !== 12) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
    } else {
      expect(parseInt(afterText)).to.equal(1)
    }
    _vm.time.setHours(23)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    utils.triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    afterText = hourInput.value
    expect(parseInt(afterText)).to.equal(12)

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
    utils.triggerKey(hourInput, 38, 'down')
    await utils.sleep(stepDelay)
    utils.triggerKey(hourInput, 38, 'up')
    await vm.$nextTick()
    afterText = hourInput.value
    expect(parseInt(afterText)).to.equal(3)

    // Wheel
    _vm.time.setHours(2)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    utils.triggerWheel(hourInput, 'wheel', -1)
    await vm.$nextTick()
    afterText = hourInput.value
    expect(parseInt(afterText)).to.equal(3)
  })

  it('should be able to add 1 minutes', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.minStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    let beforeText = _vm.$el.querySelectorAll('input')[1].value
    let minutesPlus = _vm.$el.querySelectorAll('tr td button')[1]
    minutesPlus.click()
    await vm.$nextTick()
    let afterText = _vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 59) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
    } else {
      expect(parseInt(afterText)).to.equal(0)
    }
  })

  it('should be able to minus 1 hours', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.hourStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    let beforeText = _vm.$el.querySelectorAll('input')[0].value
    let hourMinus = _vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    hourMinus.click()
    await vm.$nextTick()
    let afterText = _vm.$el.querySelectorAll('input')[0].value
    if (parseInt(beforeText) !== 1) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
    } else {
      expect(parseInt(afterText)).to.equal(12)
    }
    _vm.time.setHours(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    hourMinus.click()
    await vm.$nextTick()
    afterText = _vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(11)
  })

  it('should be able to minus 1 minutes', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.minStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    let beforeText = _vm.$el.querySelectorAll('input')[1].value
    let minutesMinus = _vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    minutesMinus.click()
    await vm.$nextTick()
    let afterText = _vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 0) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
    } else {
      expect(parseInt(afterText)).to.equal(59)
    }
  })

  it('should be able to use 24H mode', async () => {
    let _vm = vm.$refs['time-picker-24-example']
    await vm.$nextTick()
    let toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(toggleBtn).not.exist
  })

  it('should be able to display correctly when hour = 0', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let hourText = _vm.$el.querySelectorAll('input')[0].value
    let toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should be able to display correctly when hour = 12', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(12)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let hourText = _vm.$el.querySelectorAll('input')[0].value
    let toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
    expect(toggleBtn.textContent).to.equal('PM')
  })

  it('should be able to set hour using input in 24h mode', async () => {
    let _vm = vm.$refs['time-picker-24-example']
    _vm.time.setHours(12)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let hourInput = _vm.$el.querySelectorAll('input')[0]
    hourInput.value = 12
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(12)
    hourInput.value = 13
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(13)
  })

  it('should be able to set hour using input in 12h mode', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(12)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let hourInput = _vm.$el.querySelectorAll('input')[0]
    expect(parseInt(hourInput.value)).to.equal(12)
    hourInput.value = 5
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(5)
  })

  it('should be able to set minute using input', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(12)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let minuteInput = _vm.$el.querySelectorAll('input')[1]
    expect(parseInt(minuteInput.value)).to.equal(0)
    minuteInput.value = 5
    await vm.$nextTick()
    expect(parseInt(minuteInput.value)).to.equal(5)
  })

  it('should add hour when minute is 60', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(59)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let beforeHourText = _vm.$el.querySelectorAll('input')[0].value
    let minutesPlus = _vm.$el.querySelectorAll('tr td button')[1]
    minutesPlus.click()
    await vm.$nextTick()
    let afterHourText = _vm.$el.querySelectorAll('input')[0].value
    let afterMinutesText = _vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) + 1)
    expect(parseInt(afterMinutesText)).to.equal(0)
  })

  it('should minus hour when minute is -1', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let beforeHourText = _vm.$el.querySelectorAll('input')[0].value
    let minutesMinus = _vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    minutesMinus.click()
    await vm.$nextTick()
    let afterHourText = _vm.$el.querySelectorAll('input')[0].value
    let afterMinutesText = _vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) - 1)
    expect(parseInt(afterMinutesText)).to.equal(59)
  })

  it('can be set to 9:00', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let hourText = _vm.$el.querySelectorAll('input')[0].value
    let minutesText = _vm.$el.querySelectorAll('input')[1].value
    let toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourText).to.equal('09')
    expect(minutesText).to.equal('00')
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should not be able to update time bigger than max', async () => {
    let _vm = vm.$refs['time-picker-limit-example']
    _vm.time.setHours(20)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let hourText = _vm.$el.querySelectorAll('input')[0]
    let hourPlus = _vm.$el.querySelectorAll('td')[0].querySelector('button')
    expect(hourText.value).to.equal('08')
    hourPlus.click()
    await vm.$nextTick()
    expect(hourText.value).to.equal('08')
  })

  it('should not be able to update time smaller than min', async () => {
    let _vm = vm.$refs['time-picker-limit-example']
    _vm.time.setHours(8)
    _vm.time.setMinutes(30)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let hourText = _vm.$el.querySelectorAll('input')[0]
    expect(hourText.value).to.equal('08')
    let hourMinus = _vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    hourMinus.click()
    await vm.$nextTick()
    let minutesText = _vm.$el.querySelectorAll('input')[1]
    expect(hourText.value).to.equal('08')
    expect(minutesText.value).to.equal('00')
  })

  it('should be able to use custom icons', async () => {
    let _vm = vm.$refs['time-picker-icons-example']
    let $el = $(_vm.$el)
    expect($el.find('tr:first-child .btn > i').get(0).className).to.contain('glyphicon-plus')
    expect($el.find('tr:last-child .btn > i').get(0).className).to.contain('glyphicon-minus')
  })
})
