import Vue from 'vue'
import $ from 'jquery'
import TimePickerDoc from '@docs/pages/components/TimePicker.md'
import utils from '../utils'

describe('TimePicker', () => {
  let vm
  let $el

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

  it('should be able to add 1 hour', async () => {
    const _vm = vm.$refs['time-picker-example']
    await vm.$nextTick()
    const beforeText = _vm.$el.querySelectorAll('input')[0].value
    const hourPlus = _vm.$el.querySelectorAll('td')[0].querySelector('button')
    utils.triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    let afterText = _vm.$el.querySelectorAll('input')[0].value
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
    afterText = _vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(12)
  })

  it('should be able to add 1 minute', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.minStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    const beforeText = _vm.$el.querySelectorAll('input')[1].value
    const minutesPlus = _vm.$el.querySelectorAll('tr td button')[1]
    utils.triggerEvent(minutesPlus, 'click')
    await vm.$nextTick()
    const afterText = _vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 59) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
    } else {
      expect(parseInt(afterText)).to.equal(0)
    }
  })

  it('should be able to minus 1 hour', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.hourStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    const beforeText = _vm.$el.querySelectorAll('input')[0].value
    const hourMinus = _vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    utils.triggerEvent(hourMinus, 'click')
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
    utils.triggerEvent(hourMinus, 'click')
    await vm.$nextTick()
    afterText = _vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(11)
  })

  it('should be able to minus 1 minute', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.minStep = 1
    _vm.isReadOnly = false
    await vm.$nextTick()
    const beforeText = _vm.$el.querySelectorAll('input')[1].value
    const minutesMinus = _vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    utils.triggerEvent(minutesMinus, 'click')
    await vm.$nextTick()
    const afterText = _vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 0) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
    } else {
      expect(parseInt(afterText)).to.equal(59)
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
    const hourText = _vm.$el.querySelectorAll('input')[0].value
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should be able to display correctly when hour = 12', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(12)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hourText = _vm.$el.querySelectorAll('input')[0].value
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
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
    const minutesInput = _vm.$el.querySelectorAll('input')[1]
    expect(parseInt(minutesInput.value)).to.equal(0)
    minutesInput.value = 5
    await vm.$nextTick()
    expect(parseInt(minutesInput.value)).to.equal(5)
  })

  it('should add hour when minute is 60', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(59)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const beforeHourText = _vm.$el.querySelectorAll('input')[0].value
    const minutesPlus = _vm.$el.querySelectorAll('tr td button')[1]
    utils.triggerEvent(minutesPlus, 'click')
    await vm.$nextTick()
    const afterHourText = _vm.$el.querySelectorAll('input')[0].value
    const afterMinutesText = _vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) + 1)
    expect(parseInt(afterMinutesText)).to.equal(0)
  })

  it('should minus hour when minute is -1', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const beforeHourText = _vm.$el.querySelectorAll('input')[0].value
    const minutesMinus = _vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    utils.triggerEvent(minutesMinus, 'click')
    await vm.$nextTick()
    const afterHourText = _vm.$el.querySelectorAll('input')[0].value
    const afterMinutesText = _vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) - 1)
    expect(parseInt(afterMinutesText)).to.equal(59)
  })

  it('can be set to 9:00', async () => {
    const _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time.setMinutes(0)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hourText = _vm.$el.querySelectorAll('input')[0].value
    const minutesText = _vm.$el.querySelectorAll('input')[1].value
    const toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourText).to.equal('09')
    expect(minutesText).to.equal('00')
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should not be able to update time bigger than max', async () => {
    const _vm = vm.$refs['time-picker-limit-example']
    _vm.time.setHours(20)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hourText = _vm.$el.querySelectorAll('input')[0]
    const hourPlus = _vm.$el.querySelectorAll('td')[0].querySelector('button')
    expect(hourText.value).to.equal('08')
    utils.triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    expect(hourText.value).to.equal('08')
  })

  it('should not be able to update time smaller than min', async () => {
    const _vm = vm.$refs['time-picker-limit-example']
    _vm.time.setHours(8)
    _vm.time.setMinutes(30)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    const hourText = _vm.$el.querySelectorAll('input')[0]
    expect(hourText.value).to.equal('08')
    const hourMinus = _vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    utils.triggerEvent(hourMinus, 'click')
    await vm.$nextTick()
    const minutesText = _vm.$el.querySelectorAll('input')[1]
    expect(hourText.value).to.equal('08')
    expect(minutesText.value).to.equal('00')
  })

  it('should be able to use custom icons', async () => {
    const _vm = vm.$refs['time-picker-icons-example']
    const $el = $(_vm.$el)
    expect($el.find('tr:first-child .btn > i').get(0).className).to.contain('glyphicon-plus')
    expect($el.find('tr:last-child .btn > i').get(0).className).to.contain('glyphicon-minus')
  })
})
