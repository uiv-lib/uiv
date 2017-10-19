import Vue from 'vue'
import DatePicker from '@src/components/datepicker/DatePicker.vue'
import DatePickerDoc from '@docs/pages/components/DatePicker.md'
import $ from 'jquery'

describe('DatePicker', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(DatePickerDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should render correct month and year with given date on init', async () => {
    let res = Vue.compile('<date-picker v-model="date" ref="datepicker"></date-picker>')
    let vm = new Vue({
      data () {
        return {
          date: '1991-08-14'
        }
      },
      components: {DatePicker},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await vm.$nextTick()
    expect(vm.$refs.datepicker.currentMonth).to.equal(7)
    expect(vm.$refs.datepicker.currentYear).to.equal(1991)
    let $el = $(vm.$el)
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render date view', async () => {
    await vm.$nextTick()
    let picker = $el.find('#date-picker-1').get(0)
    expect(picker).to.exist
    let dateView = picker.querySelectorAll('table')[0]
    expect(dateView.style.display).to.equal('')
    let yearMonthBtn = dateView.querySelectorAll('button')[1]
    let now = new Date()
    expect(yearMonthBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
    let todayBtn = dateView.querySelector('.btn-info')
    expect(todayBtn.textContent).to.equal(now.getDate().toString())
  })

  it('should be able to go prev month', async () => {
    const goPrev = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        actionBtn.click()
        await vm.$nextTick()
        now = new Date(now.getFullYear(), now.getMonth(), 0)
        expect(textBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        await goPrev(--i, actionBtn, now, textBtn)
      }
    }
    await vm.$nextTick()
    let picker = $el.find('#date-picker-1').get(0)
    expect(picker).to.exist
    let dateView = picker.querySelectorAll('table')[0]
    await goPrev(
      24,
      dateView.querySelectorAll('button')[0],
      new Date(),
      dateView.querySelectorAll('button')[1])
  }).timeout(5000)

  it('should be able to go next month', async () => {
    const goNext = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        actionBtn.click()
        await vm.$nextTick()
        if (now.getMonth() === 11) {
          now = new Date(now.getFullYear() + 1, 0, 1)
        } else {
          now = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        }
        expect(textBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        await goNext(--i, actionBtn, now, textBtn)
      }
    }
    await vm.$nextTick()
    let picker = $el.find('#date-picker-1').get(0)
    expect(picker).to.exist
    let dateView = picker.querySelectorAll('table')[0]
    await goNext(
      12,
      dateView.querySelectorAll('button')[2],
      new Date(),
      dateView.querySelectorAll('button')[1])
  }).timeout(5000)

  it('should be able to switch to month view from date view', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let dateView = picker.querySelectorAll('table')[0]
    let yearMonthBtn = dateView.querySelectorAll('button')[1]
    let monthView = picker.querySelectorAll('table')[1]
    expect(dateView.style.display).to.equal('')
    expect(monthView.style.display).to.equal('none')
    yearMonthBtn.click()
    await vm.$nextTick()
    expect(dateView.style.display).to.equal('none')
    expect(monthView.style.display).to.equal('')
    let now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear().toString())
  })

  it('should be able to switch to date view from month view', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let dateView = picker.querySelectorAll('table')[0]
    let yearMonthBtn = dateView.querySelectorAll('button')[1]
    let monthView = picker.querySelectorAll('table')[1]
    yearMonthBtn.click()
    await vm.$nextTick()
    monthView.querySelector('tbody').querySelector('button').click()
    await vm.$nextTick()
    expect(dateView.style.display).to.equal('')
    expect(monthView.style.display).to.equal('none')
    yearMonthBtn = dateView.querySelectorAll('button')[1]
    let now = new Date()
    now = new Date(now.getFullYear(), 0, 1)
    expect(yearMonthBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
  })

  it('should be able to go prev year', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let monthView = picker.querySelectorAll('table')[1]
    monthView.querySelector('button').click()
    await vm.$nextTick()
    let now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() - 1 + '')
  })

  it('should be able to go next year', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let monthView = picker.querySelectorAll('table')[1]
    monthView.querySelectorAll('button')[2].click()
    await vm.$nextTick()
    let now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() + 1 + '')
  })

  it('should be able to switch to year view from month view', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let yearView = picker.querySelectorAll('table')[2]
    let monthView = picker.querySelectorAll('table')[1]
    let yearBtn = monthView.querySelectorAll('button')[1]
    expect(yearView.style.display).to.equal('none')
    yearBtn.click()
    await vm.$nextTick()
    expect(monthView.style.display).to.equal('none')
    expect(yearView.style.display).to.equal('')
    let now = new Date()
    let start = now.getFullYear() - now.getFullYear() % 20
    let yearStr = `${start} ~ ${start + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
  })

  it('should be able to switch to month view from year view', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let yearView = picker.querySelectorAll('table')[2]
    let monthView = picker.querySelectorAll('table')[1]
    expect(monthView.style.display).to.equal('none')
    yearView.querySelector('tbody').querySelector('button').click()
    await vm.$nextTick()
    expect(monthView.style.display).to.equal('')
    expect(yearView.style.display).to.equal('none')
    let now = new Date()
    let year = now.getFullYear() - now.getFullYear() % 20
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(year.toString())
  })

  it('should be able to go prev year group', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let yearView = picker.querySelectorAll('table')[2]
    yearView.querySelector('button').click()
    await vm.$nextTick()
    let now = new Date()
    let start = now.getFullYear() - now.getFullYear() % 20
    let yearStr = `${start - 20} ~ ${start - 20 + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
  })

  it('should be able to go next year group', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker).to.exist
    let yearView = picker.querySelectorAll('table')[2]
    yearView.querySelectorAll('button')[2].click()
    await vm.$nextTick()
    let now = new Date()
    let start = now.getFullYear() - now.getFullYear() % 20
    let yearStr = `${start + 20} ~ ${start + 20 + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
  })

  it('should be able to select date', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    let dateView = picker.querySelectorAll('table')[0]
    let dateBtn = dateView.querySelector('tbody').querySelectorAll('button')[15]
    dateBtn.click()
    await vm.$nextTick()
    expect(dateBtn.className).to.contain('btn-primary')
  })

  it('should not close the picker on picker body click', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-2')
    let dropdown = vm.$el.querySelector('.dropdown')
    let trigger = dropdown.querySelector('button')
    expect(dropdown.className).not.contain('open')
    trigger.click()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    picker.click()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to use today btn', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    let dateView = picker.querySelectorAll('table')[0]
    picker.querySelector('.text-center').querySelectorAll('button')[0].click()
    await vm.$nextTick()
    expect(dateView.querySelector('tbody').querySelector('.btn-primary').textContent)
      .to.equal(new Date().getDate().toString())
  })

  it('should be able to use clear btn', async () => {
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    let dateView = picker.querySelectorAll('table')[0]
    picker.querySelector('.text-center').querySelectorAll('button')[0].click()
    picker.querySelector('.text-center').querySelectorAll('button')[1].click()
    await vm.$nextTick()
    expect(dateView.querySelector('tbody').querySelectorAll('.btn-primary').length).to.equal(0)
  })

  it('should be able to hide today btn', async () => {
    vm.todayBtn = false
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker.querySelector('.text-center').querySelector('.btn-info')).not.exist
  })

  it('should be able to hide clear btn', async () => {
    vm.clearBtn = false
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    expect(picker.querySelector('.text-center').querySelector('.btn-default')).not.exist
  })

  it('should be able to limit date range and render correct date view', async () => {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    vm.limitFrom = new Date()
    vm.limitTo = tomorrow
    await vm.$nextTick()
    let picker = vm.$el.querySelector('#date-picker-1')
    let dateInRange = picker.querySelector('tbody').querySelectorAll('button:not([disabled])')
    expect(dateInRange[0].textContent).to.equal(new Date().getDate().toString())
    if (dateInRange.length > 1) {
      expect(dateInRange[1].textContent).to.equal(tomorrow.getDate().toString())
    }
  })

  it('should be able to limit date range and not able to set invalid date', async () => {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    vm.limitFrom = '2017-01-01'
    vm.limitTo = '2017-01-03'
    vm.date = '2017-01-04'
    await vm.$nextTick()
    expect(vm.date).to.equal('')
  })

  it('should be able handle invalid limit params', async () => {
    vm.limitFrom = 'foo'
    vm.limitTo = 'bar'
    await vm.$nextTick()
  })

  it('should be able to toggle popup picker', async () => {
    vm.$el.querySelector('.input-group-btn button').click()
    await vm.$nextTick()
    expect(vm.$el.querySelector('.dropdown').className).to.contain('open')
    vm.$el.querySelector('.input-group-btn button').click()
    await vm.$nextTick()
    expect(vm.$el.querySelector('.dropdown').className).not.contain('open')
  })
})
