/**
 * Created by zhengjingchun on 2017/3/28.
 */
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
    vm.time.setHours(9)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    let meridianText = toggleBtn.textContent
    expect(meridianText).to.equal('AM')
    toggleBtn.click()
    await vm.$nextTick()
    toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    let meridianTextAfterClick = toggleBtn.textContent
    expect(meridianTextAfterClick).to.equal('PM')
    toggleBtn.click()
    await vm.$nextTick()
    toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    let meridianTextAfterTwoClick = toggleBtn.textContent
    expect(meridianTextAfterTwoClick).to.equal('AM')
  })

  it('should be able to add 1 hours', async () => {
    await vm.$nextTick()
    let beforeText = vm.$el.querySelectorAll('input')[0].value
    let hourPlus = vm.$el.querySelectorAll('td')[0].querySelector('button')
    hourPlus.click()
    await vm.$nextTick()
    let afterText = vm.$el.querySelectorAll('input')[0].value
    if (parseInt(beforeText) !== 12) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
    } else {
      expect(parseInt(afterText)).to.equal(1)
    }
    vm.time.setHours(23)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    hourPlus.click()
    await vm.$nextTick()
    afterText = vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(12)
  })

  it('should be able to add 1 minutes', async () => {
    vm.minStep = 1
    vm.isReadOnly = false
    await vm.$nextTick()
    let beforeText = vm.$el.querySelectorAll('input')[1].value
    let minutesPlus = vm.$el.querySelectorAll('tr td button')[1]
    minutesPlus.click()
    await vm.$nextTick()
    let afterText = vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 59) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
    } else {
      expect(parseInt(afterText)).to.equal(0)
    }
  })

  it('should be able to minus 1 hours', async () => {
    vm.hourStep = 1
    vm.isReadOnly = false
    await vm.$nextTick()
    let beforeText = vm.$el.querySelectorAll('input')[0].value
    let hourMinus = vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    hourMinus.click()
    await vm.$nextTick()
    let afterText = vm.$el.querySelectorAll('input')[0].value
    if (parseInt(beforeText) !== 1) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
    } else {
      expect(parseInt(afterText)).to.equal(12)
    }
    vm.time.setHours(0)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    hourMinus.click()
    await vm.$nextTick()
    afterText = vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(11)
  })

  it('should be able to minus 1 minutes', async () => {
    vm.minStep = 1
    vm.isReadOnly = false
    await vm.$nextTick()
    let beforeText = vm.$el.querySelectorAll('input')[1].value
    let minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    minutesMinus.click()
    await vm.$nextTick()
    let afterText = vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 0) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
    } else {
      expect(parseInt(afterText)).to.equal(59)
    }
  })

  it('should be change to 24H', async () => {
    vm.showMeridian = true
    await vm.$nextTick()
    let toggleBtn = vm.$refs.timepicker.$el.querySelector('[data-action="toggleMeridian"]')
    let toggleBtnText = toggleBtn.textContent
    let beforeText = vm.$el.querySelectorAll('input')[0].value
    expect(toggleBtn).to.exist
    vm.showMeridian = false
    await vm.$nextTick()
    toggleBtn = vm.$refs.timepicker.$el.querySelector('[data-action="toggleMeridian"]')
    expect(toggleBtn).to.not.exist
    let afterText = vm.$el.querySelectorAll('input')[0].value
    if (toggleBtnText === 'PM' && parseInt(beforeText) !== 12) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 12)
    } else if (toggleBtnText === 'PM' && parseInt(beforeText) === 12) {
      expect(parseInt(afterText)).to.equal(12)
    } else if (toggleBtnText === 'AM' && parseInt(beforeText) === 12) {
      expect(parseInt(afterText)).to.equal(0)
    } else {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText))
    }
  })

  it('when hour is zero it can display true', async () => {
    vm.time.setHours(0)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    let hourText = vm.$el.querySelectorAll('input')[0].value
    let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('when hour is 12 it can display true', async () => {
    vm.time.setHours(12)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    let hourText = vm.$el.querySelectorAll('input')[0].value
    let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
    expect(toggleBtn.textContent).to.equal('PM')
  })

  it('should be able to set hour using input in 24h mode', async () => {
    vm.time.setHours(12)
    vm.time = new Date(vm.time)
    vm.showMeridian = false
    let timePicker = vm.$refs.timepicker
    await vm.$nextTick()
    let hourInput = vm.$el.querySelectorAll('input')[0]
    expect(parseInt(hourInput.value)).to.equal(12)
    timePicker.hoursText = -1
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(12)
    timePicker.hoursText = 25
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(12)
    timePicker.hoursText = 13
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(13)
  })

  it('should be able to set hour using input in 12h mode', async () => {
    vm.time.setHours(12)
    vm.time = new Date(vm.time)
    vm.showMeridian = true
    let timePicker = vm.$refs.timepicker
    await vm.$nextTick()
    let hourInput = vm.$el.querySelectorAll('input')[0]
    expect(parseInt(hourInput.value)).to.equal(12)
    timePicker.hoursText = -1
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(12)
    timePicker.hoursText = 13
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(12)
    timePicker.hoursText = 5
    await vm.$nextTick()
    expect(parseInt(hourInput.value)).to.equal(5)
  })

  it('should be able to set minute using input', async () => {
    vm.time.setHours(12)
    vm.time.setMinutes(0)
    vm.time = new Date(vm.time)
    vm.showMeridian = true
    let timePicker = vm.$refs.timepicker
    await vm.$nextTick()
    let minuteInput = vm.$el.querySelectorAll('input')[1]
    expect(parseInt(minuteInput.value)).to.equal(0)
    timePicker.minutesText = -1
    await vm.$nextTick()
    expect(parseInt(minuteInput.value)).to.equal(0)
    timePicker.minutesText = 60
    await vm.$nextTick()
    expect(parseInt(minuteInput.value)).to.equal(0)
    timePicker.minutesText = 5
    await vm.$nextTick()
    expect(parseInt(minuteInput.value)).to.equal(5)
  })

  it('when minutes is 59 then plus minutes it can display true', async () => {
    vm.time.setHours(9)
    vm.time.setMinutes(59)
    vm.time = new Date(vm.time)
    vm.isReadOnly = false
    await vm.$nextTick()
    let beforeHourText = vm.$el.querySelectorAll('input')[0].value
    let minutesPlus = vm.$el.querySelectorAll('tr td button')[1]
    minutesPlus.click()
    await vm.$nextTick()
    let afterHourText = vm.$el.querySelectorAll('input')[0].value
    let afterMinutesText = vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) + 1)
    expect(parseInt(afterMinutesText)).to.equal(0)
  })

  it('when minutes is 0 then minus minutes it can display true', async () => {
    vm.time.setHours(9)
    vm.time.setMinutes(0)
    vm.time = new Date(vm.time)
    vm.isReadOnly = false
    await vm.$nextTick()
    let beforeHourText = vm.$el.querySelectorAll('input')[0].value
    let minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    minutesMinus.click()
    await vm.$nextTick()
    let afterHourText = vm.$el.querySelectorAll('input')[0].value
    let afterMinutesText = vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) - 1)
    expect(parseInt(afterMinutesText)).to.equal(59)
  })

  it('can be set to 9:00', async () => {
    await vm.$nextTick()
    let setNine = vm.$el.querySelector('[data-action="setNine"]')
    setNine.click()
    await vm.$nextTick()
    let hourText = vm.$el.querySelectorAll('input')[0].value
    let minutesText = vm.$el.querySelectorAll('input')[1].value
    let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourText).to.equal('09')
    expect(minutesText).to.equal('00')
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('can be plus and minus hour after wheel', async () => {
    vm.time.setHours(9)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    vm.$refs.timepicker.hoursWheel({deltaY: 1, preventDefault: () => true})
    await vm.$nextTick()
    let hourText = vm.$el.querySelectorAll('input')[0].value
    expect(hourText).to.equal('08')
    vm.$refs.timepicker.hoursWheel({deltaY: -1, preventDefault: () => true})
    await vm.$nextTick()
    hourText = vm.$el.querySelectorAll('input')[0].value
    expect(hourText).to.equal('09')
  })

  it('can be plus and minus minutes after wheel', async () => {
    vm.time.setMinutes(30)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    vm.$refs.timepicker.minutesWheel({deltaY: 1, preventDefault: () => true})
    await vm.$nextTick()
    let minutesText = vm.$el.querySelectorAll('input')[1].value
    expect(minutesText).to.equal('29')
    vm.$refs.timepicker.minutesWheel({deltaY: -1, preventDefault: () => true})
    await vm.$nextTick()
    minutesText = vm.$el.querySelectorAll('input')[1].value
    expect(minutesText).to.equal('30')
  })

  it('shouldnt add a time bigger then max', async () => {
    vm.max = '09:01'
    vm.time.setHours(9)
    vm.time = new Date(vm.time)
    vm.isReadOnly = false
    await vm.$nextTick()
    let hourText = vm.$el.querySelectorAll('input')[0].value
    let hourPlus = vm.$el.querySelectorAll('td')[0].querySelector('button')
    expect(hourText).to.equal('09')
    hourPlus.click()
    await vm.$nextTick()
    hourText = vm.$el.querySelectorAll('input')[0].value
    expect(hourText).to.equal('09')
  })

  it('shouldnt add a time smaller then min', async () => {
    vm.min = '08:30'
    vm.time.setHours(9)
    vm.time.setMinutes(0)
    vm.time = new Date(vm.time)
    vm.isReadOnly = false
    await vm.$nextTick()
    let hourText = vm.$el.querySelectorAll('input')[0].value
    expect(hourText).to.equal('09')
    let hourMinus = vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    hourMinus.click()
    await vm.$nextTick()
    hourText = vm.$el.querySelectorAll('input')[0].value
    let minutesText = vm.$el.querySelectorAll('input')[1].value
    expect(hourText).to.equal('08')
    expect(minutesText).to.equal('30')
  })
})
