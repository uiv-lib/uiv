import $ from 'jquery'
import { createVm, destroyVm, triggerEvent } from '../utils'

function baseVm () {
  return createVm(`<div><time-picker v-model="time"/></div>`, {
    time: new Date()
  })
}

function h24Vm () {
  return createVm(`<div><time-picker v-model="time" :show-meridian="false"/></div>`, {
    time: new Date()
  })
}

describe('TimePicker', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to toggle meridian', async () => {
    vm = baseVm()
    vm.time.setHours(9)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    const meridianText = toggleBtn.textContent
    expect(meridianText).to.equal('AM')
    triggerEvent(toggleBtn, 'click')
    await vm.$nextTick()
    const meridianTextAfterClick = toggleBtn.textContent
    expect(meridianTextAfterClick).to.equal('PM')
    triggerEvent(toggleBtn, 'click')
    await vm.$nextTick()
    const meridianTextAfterTwoClick = toggleBtn.textContent
    expect(meridianTextAfterTwoClick).to.equal('AM')
  })

  it('should be able to add 1 hour', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const beforeText = vm.$el.querySelectorAll('input')[0].value
    const hourPlus = vm.$el.querySelectorAll('td')[0].querySelector('button')
    triggerEvent(hourPlus, 'click')
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
    triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    afterText = vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(12)
  })

  it('should be able to add 1 minute', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const beforeText = vm.$el.querySelectorAll('input')[1].value
    const minutesPlus = vm.$el.querySelectorAll('tr td button')[1]
    triggerEvent(minutesPlus, 'click')
    await vm.$nextTick()
    const afterText = vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 59) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
    } else {
      expect(parseInt(afterText)).to.equal(0)
    }
  })

  it('should be able to minus 1 hour', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const beforeText = vm.$el.querySelectorAll('input')[0].value
    const hourMinus = vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    triggerEvent(hourMinus, 'click')
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
    triggerEvent(hourMinus, 'click')
    await vm.$nextTick()
    afterText = vm.$el.querySelectorAll('input')[0].value
    expect(parseInt(afterText)).to.equal(11)
  })

  it('should be able to minus 1 minute', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const beforeText = vm.$el.querySelectorAll('input')[1].value
    const minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    triggerEvent(minutesMinus, 'click')
    await vm.$nextTick()
    const afterText = vm.$el.querySelectorAll('input')[1].value
    if (parseInt(beforeText) !== 0) {
      expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
    } else {
      expect(parseInt(afterText)).to.equal(59)
    }
  })

  it('should be able to use 24h mode', async () => {
    vm = h24Vm()
    await vm.$nextTick()
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(toggleBtn).not.exist
  })

  it('should be able to display correctly when hour = 0', async () => {
    vm = baseVm()
    vm.time.setHours(0)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0].value
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should be able to display correctly when hour = 12', async () => {
    vm = baseVm()
    vm.time.setHours(12)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0].value
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(parseInt(hourText)).to.equal(12)
    expect(toggleBtn.textContent).to.equal('PM')
  })

  it('should be able to set hour using input in 24h mode', async () => {
    vm = h24Vm()
    vm.time.setHours(12)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const hoursInput = vm.$el.querySelectorAll('input')[0]
    hoursInput.value = 12
    await vm.$nextTick()
    expect(parseInt(hoursInput.value)).to.equal(12)
    hoursInput.value = 13
    await vm.$nextTick()
    expect(parseInt(hoursInput.value)).to.equal(13)
  })

  it('should be able to set hour using input in 12h mode', async () => {
    vm = baseVm()
    vm.time.setHours(12)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const hoursInput = vm.$el.querySelectorAll('input')[0]
    expect(parseInt(hoursInput.value)).to.equal(12)
    hoursInput.value = 5
    await vm.$nextTick()
    expect(parseInt(hoursInput.value)).to.equal(5)
  })

  it('should be able to set minute using input', async () => {
    vm = baseVm()
    vm.time.setHours(12)
    vm.time.setMinutes(0)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const minutesInput = vm.$el.querySelectorAll('input')[1]
    expect(parseInt(minutesInput.value)).to.equal(0)
    minutesInput.value = 5
    await vm.$nextTick()
    expect(parseInt(minutesInput.value)).to.equal(5)
  })

  it('should add hour when minute is 60', async () => {
    vm = baseVm()
    vm.time.setHours(9)
    vm.time.setMinutes(59)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const beforeHourText = vm.$el.querySelectorAll('input')[0].value
    const minutesPlus = vm.$el.querySelectorAll('tr td button')[1]
    triggerEvent(minutesPlus, 'click')
    await vm.$nextTick()
    const afterHourText = vm.$el.querySelectorAll('input')[0].value
    const afterMinutesText = vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) + 1)
    expect(parseInt(afterMinutesText)).to.equal(0)
  })

  it('should minus hour when minute is -1', async () => {
    vm = baseVm()
    vm.time.setHours(9)
    vm.time.setMinutes(0)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const beforeHourText = vm.$el.querySelectorAll('input')[0].value
    const minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
    triggerEvent(minutesMinus, 'click')
    await vm.$nextTick()
    const afterHourText = vm.$el.querySelectorAll('input')[0].value
    const afterMinutesText = vm.$el.querySelectorAll('input')[1].value
    expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) - 1)
    expect(parseInt(afterMinutesText)).to.equal(59)
  })

  it('can be set to 9:00', async () => {
    vm = baseVm()
    vm.time.setHours(9)
    vm.time.setMinutes(0)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0].value
    const minutesText = vm.$el.querySelectorAll('input')[1].value
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourText).to.equal('09')
    expect(minutesText).to.equal('00')
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should not be able to update time bigger than max', async () => {
    vm = createVm(`<div><time-picker v-model="time" :max="max" :min="min"/></div>`, {
      time: new Date(),
      min: new Date('2017/01/01 8:00'), // date doesn't matter
      max: new Date('2017/01/01 20:00')
    })
    vm.time.setHours(20)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0]
    const hourPlus = vm.$el.querySelectorAll('td')[0].querySelector('button')
    expect(hourText.value).to.equal('08')
    triggerEvent(hourPlus, 'click')
    await vm.$nextTick()
    expect(hourText.value).to.equal('08')
  })

  it('should not be able to update time smaller than min', async () => {
    vm = createVm(`<div><time-picker v-model="time" :max="max" :min="min"/></div>`, {
      time: new Date(),
      min: new Date('2017/01/01 8:00'), // date doesn't matter
      max: new Date('2017/01/01 20:00')
    })
    vm.time.setHours(8)
    vm.time.setMinutes(30)
    vm.time = new Date(vm.time)
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0]
    expect(hourText.value).to.equal('08')
    const hourMinus = vm.$el.querySelectorAll('tr')[2].querySelector('td button')
    triggerEvent(hourMinus, 'click')
    await vm.$nextTick()
    const minutesText = vm.$el.querySelectorAll('input')[1]
    expect(hourText.value).to.equal('08')
    expect(minutesText.value).to.equal('00')
  })

  it('should be able to use custom icons', async () => {
    vm = createVm(`<div><time-picker v-model="time" icon-control-up="glyphicon glyphicon-plus" icon-control-down="glyphicon glyphicon-minus"/></div>`, {
      time: new Date()
    })
    const $el = $(vm.$el)
    expect($el.find('tr:first-child .btn > i').get(0).className).to.contain('glyphicon-plus')
    expect($el.find('tr:last-child .btn > i').get(0).className).to.contain('glyphicon-minus')
  })

  it('should be able to toggle meridian in runtime', async () => {
    vm = createVm('<time-picker v-model="time" :show-meridian="meridian"/>', {
      time: new Date(),
      meridian: true
    })
    const $el = $(vm.$el)
    await vm.$nextTick()
    expect($el.find('[data-action="toggleMeridian"]').length).to.equal(1)
    const timeBefore = new Date(vm.time)
    // toggle meridian
    vm.meridian = false
    await vm.$nextTick()
    expect($el.find('[data-action="toggleMeridian"]').length).to.equal(0)
    const timeAfter = new Date(vm.time)
    expect(timeAfter.getTime()).to.equal(timeBefore.getTime())
    // toggle meridian
    vm.meridian = true
    await vm.$nextTick()
    expect($el.find('[data-action="toggleMeridian"]').length).to.equal(1)
    const timeAfterAgain = new Date(vm.time)
    expect(timeAfterAgain.getTime()).to.equal(timeBefore.getTime())
  })

  it('should not be able to change time while readonly', async () => {
    vm = createVm('<time-picker ref="timepicker" v-model="time" readonly/>', {
      time: new Date()
    })
    await vm.$nextTick()
    const timeBefore = new Date(vm.time)
    // on click & keydown
    vm.$refs.timepicker.changeTime(1, 1)
    await vm.$nextTick()
    const timeAfter = new Date(vm.time)
    expect(timeAfter.getTime()).to.equal(timeBefore.getTime())
    // on wheel
    vm.$refs.timepicker.onWheel({ deltaY: -1, preventDefault: () => null }, true)
    await vm.$nextTick()
    const timeAfterAgain = new Date(vm.time)
    expect(timeAfterAgain.getTime()).to.equal(timeBefore.getTime())
  })

  it('should be able to change hour use wheel', async () => {
    vm = createVm('<time-picker ref="timepicker" v-model="time"/>', {
      time: new Date()
    })
    await vm.$nextTick()
    const timeBefore = new Date(vm.time)
    // add hour
    vm.$refs.timepicker.onWheel({ deltaY: -1, preventDefault: () => null }, true)
    await vm.$nextTick()
    const timeAfter = new Date(vm.time)
    expect(timeAfter.getTime()).to.equal(timeBefore.getTime() + 60 * 60 * 1000)
    // minus hour
    vm.$refs.timepicker.onWheel({ deltaY: 1, preventDefault: () => null }, true)
    await vm.$nextTick()
    const timeAfterAgain = new Date(vm.time)
    expect(timeAfterAgain.getTime()).to.equal(timeBefore.getTime())
  })

  it('should be able to change minute use wheel', async () => {
    vm = createVm('<time-picker ref="timepicker" v-model="time"/>', {
      time: new Date()
    })
    await vm.$nextTick()
    const timeBefore = new Date(vm.time)
    // add hour
    vm.$refs.timepicker.onWheel({ deltaY: -1, preventDefault: () => null }, false)
    await vm.$nextTick()
    const timeAfter = new Date(vm.time)
    expect(timeAfter.getTime()).to.equal(timeBefore.getTime() + 60 * 1000)
    // minus hour
    vm.$refs.timepicker.onWheel({ deltaY: 1, preventDefault: () => null }, false)
    await vm.$nextTick()
    const timeAfterAgain = new Date(vm.time)
    expect(timeAfterAgain.getTime()).to.equal(timeBefore.getTime())
    vm.$destroy()
  })

  it('should be able to select input content on mouseup', async () => {
    vm = createVm('<time-picker v-model="time"/>', {
      time: new Date()
    })
    await vm.$nextTick()
    const hoursInput = vm.$el.querySelectorAll('input')[0]
    const hoursInputSpy = sinon.spy(hoursInput, 'setSelectionRange')
    triggerEvent(hoursInput, 'mouseup')
    await vm.$nextTick()
    sinon.assert.calledOnce(hoursInputSpy)
    hoursInput.setSelectionRange.restore()
    const minutesInput = vm.$el.querySelectorAll('input')[1]
    const minutesInputSpy = sinon.spy(minutesInput, 'setSelectionRange')
    triggerEvent(minutesInput, 'mouseup')
    await vm.$nextTick()
    sinon.assert.calledOnce(minutesInputSpy)
    minutesInput.setSelectionRange.restore()
  })

  it('should show controls by default', async () => {
    vm = baseVm()
    const $el = $(vm.$el)
    expect($el.find('tr:first-child .btn').length).to.equal(2)
    expect($el.find('tr:last-child .btn').length).to.equal(2)
  })

  it('should be able to hide controls', async () => {
    vm = createVm(`<div> <time-picker v-model="time" :controls="false"/></div>`, {
      time: new Date()
    })
    const $el = $(vm.$el)
    // We could still have a button for the AM/PM toggle
    expect($el.find('tr:first-child .btn').length).not.to.equal(2)
    expect($el.find('tr:last-child .btn').length).not.to.equal(2)
  })

  it('should display empty fields when date provided is invalid', async () => {
    vm = createVm(`<div><time-picker v-model="time"/></div>`, {
      time: new Date('')
    })
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0]
    const minutesText = vm.$el.querySelectorAll('input')[1]
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourText.value).to.equal('')
    expect(minutesText.value).to.equal('')
    expect(toggleBtn.textContent).to.equal('AM')

    triggerEvent(toggleBtn, 'click')
    await vm.$nextTick()

    expect(hourText.value).to.equal('12')
    expect(minutesText.value).to.equal('00')
    expect(toggleBtn.textContent).to.equal('PM')
  })

  it('should display empty fields when date provided is invalid and minutes button still work', async () => {
    vm = createVm(`<div><time-picker v-model="time"/></div>`, {
      time: new Date('')
    })
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0]
    const minutesText = vm.$el.querySelectorAll('input')[1]
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    expect(hourText.value).to.equal('')
    expect(minutesText.value).to.equal('')
    expect(toggleBtn.textContent).to.equal('AM')

    await vm.$nextTick()

    const minutesPlus = vm.$el.querySelectorAll('tr td button')[1]
    triggerEvent(minutesPlus, 'click')
    await vm.$nextTick()

    expect(hourText.value).to.equal('12')
    expect(minutesText.value).to.equal('01')
    expect(toggleBtn.textContent).to.equal('AM')
  })

  it('should display empty fields when date provided is invalid and hour button still work', async () => {
    vm = createVm(`<div><time-picker v-model="time"/></div>`, {
      time: new Date('')
    })
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0]
    const minutesText = vm.$el.querySelectorAll('input')[1]
    const toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
    const hourPlus = vm.$el.querySelectorAll('tr td button')[0]

    expect(hourText.value).to.equal('')
    expect(minutesText.value).to.equal('')
    expect(toggleBtn.textContent).to.equal('AM')

    triggerEvent(hourPlus, 'click')

    await vm.$nextTick()
    expect(hourText.value).to.equal('01')
    expect(minutesText.value).to.equal('00')
    expect(toggleBtn.textContent).to.equal('AM')
  })
  it('should display empty fields when date is reset at runtime', async () => {
    vm = createVm(`<div> <time-picker v-model="time" :controls="false"/></div>`, {
      time: new Date()
    })
    await vm.$nextTick()
    // Set an invalid date at runtime (not via the initial config)
    vm.time = new Date('')
    await vm.$nextTick()
    const hourText = vm.$el.querySelectorAll('input')[0]
    const minutesText = vm.$el.querySelectorAll('input')[1]
    expect(hourText.value).to.equal('')
    expect(minutesText.value).to.equal('')
  })
  it('should have a default input width to 50px', async () => {
    vm = baseVm()
    const hoursInput = vm.$el.querySelectorAll('input')[0]
    expect(hoursInput.style.width).to.equal('50px')
    const minutesInput = vm.$el.querySelectorAll('input')[1]
    expect(minutesInput.style.width).to.equal('50px')
  })
  it('should accept an input-width prop that sets the specified width to the hours and minutes input', async () => {
    vm = createVm(`<div><time-picker v-model="time" :input-width="inputWidth"/></div>`, {
      time: new Date(''),
      inputWidth: 180
    })
    const inputWidth = vm.inputWidth
    // Check that the passed value is not the default value
    expect(inputWidth).to.not.equal(50)
    const hoursInput = vm.$el.querySelectorAll('input')[0]
    expect(hoursInput.style.width).to.equal(`${inputWidth}px`)
    const minutesInput = vm.$el.querySelectorAll('input')[1]
    expect(minutesInput.style.width).to.equal(`${inputWidth}px`)
  })
})
