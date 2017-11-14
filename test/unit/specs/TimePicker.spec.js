import Vue from 'vue'
import $ from 'jquery'
import TimePickerDoc from '@docs/pages/components/TimePicker.md'

describe('TimePicker', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(TimePickerDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to toggle meridian', async () => {
    let _vm = vm.$refs['time-picker-example']
    _vm.time.setHours(9)
    _vm.time = new Date(_vm.time)
    await vm.$nextTick()
    let toggleBtn = _vm.$el.querySelector('[data-action="toggleMeridian"]')
    let meridianText = toggleBtn.textContent
    expect(meridianText).to.equal('AM')
    toggleBtn.click()
    await vm.$nextTick()
    let meridianTextAfterClick = toggleBtn.textContent
    expect(meridianTextAfterClick).to.equal('PM')
    toggleBtn.click()
    await vm.$nextTick()
    let meridianTextAfterTwoClick = toggleBtn.textContent
    expect(meridianTextAfterTwoClick).to.equal('AM')
  })

  it('should be able to add 1 hours', async () => {
    let _vm = vm.$refs['time-picker-example']
    await vm.$nextTick()
    let beforeText = _vm.$el.querySelectorAll('input')[0].value
    let hourPlus = _vm.$el.querySelectorAll('td')[0].querySelector('button')
    hourPlus.click()
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
    hourPlus.click()
    await vm.$nextTick()
    afterText = _vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(12)
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
