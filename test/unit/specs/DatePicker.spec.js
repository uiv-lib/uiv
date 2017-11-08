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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
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
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    let dateView = picker.querySelectorAll('table')[0]
    await goPrev(
      24,
      dateView.querySelectorAll('button')[0],
      new Date(),
      dateView.querySelectorAll('button')[1])
  }).timeout(5000)

  it('should be able to go next month', async () => {
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
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
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    let dateView = picker.querySelectorAll('table')[0]
    await goNext(
      24,
      dateView.querySelectorAll('button')[2],
      new Date(),
      dateView.querySelectorAll('button')[1])
  }).timeout(5000)

  it('should be able to switch to month view from date view', async () => {
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    let monthView = picker.querySelectorAll('table')[1]
    monthView.querySelector('button').click()
    await vm.$nextTick()
    let now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() - 1 + '')
  })

  it('should be able to go next year', async () => {
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    let monthView = picker.querySelectorAll('table')[1]
    monthView.querySelectorAll('button')[2].click()
    await vm.$nextTick()
    let now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() + 1 + '')
  })

  it('should be able to switch to year view from month view', async () => {
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    let dateView = picker.querySelectorAll('table')[0]
    let dateBtn = dateView.querySelector('tbody').querySelectorAll('button')[15]
    dateBtn.click()
    await vm.$nextTick()
    expect(dateBtn.className).to.contain('btn-primary')
  })

  it('should not close the picker on picker body click', async () => {
    let _vm = vm.$refs['date-picker-dropdown-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
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
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    let dateView = picker.querySelectorAll('table')[0]
    picker.querySelector('.text-center').querySelectorAll('button')[0].click()
    await vm.$nextTick()
    expect(dateView.querySelector('tbody').querySelector('.btn-primary').textContent)
      .to.equal(new Date().getDate().toString())
  })

  it('should be able to use clear btn', async () => {
    let _vm = vm.$refs['date-picker-example']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    let dateView = picker.querySelectorAll('table')[0]
    picker.querySelector('.text-center').querySelectorAll('button')[0].click()
    picker.querySelector('.text-center').querySelectorAll('button')[1].click()
    await vm.$nextTick()
    expect(dateView.querySelector('tbody').querySelectorAll('.btn-primary').length).to.equal(0)
  })

  it('should be able to hide today btn', async () => {
    let _vm = vm.$refs['date-picker-without-buttons']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    expect(_$el.find('button:contains(Today)').length).to.equal(0)
  })

  it('should be able to hide clear btn', async () => {
    let _vm = vm.$refs['date-picker-without-buttons']
    let _$el = $(_vm.$el)
    await vm.$nextTick()
    expect(_$el.find('button:contains(Clear)').length).to.equal(0)
  })

  it('should be able to limit date range and render correct date view', async () => {
    let _vm = vm.$refs['date-picker-range-limit']
    let _$el = $(_vm.$el)
    _vm.date = '2017-01-01'
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    let btnDisabled = picker.querySelector('tbody').querySelectorAll('button:disabled')
    expect(btnDisabled.length).to.equal(0)
    _vm.date = '2017-12-31'
    await vm.$nextTick()
    btnDisabled = picker.querySelector('tbody').querySelectorAll('button:disabled')
    expect(btnDisabled.length).to.equal(6)
  })

  it('should be able to limit date range and not able to set invalid date', async () => {
    let _vm = vm.$refs['date-picker-range-limit']
    _vm.date = '2019-01-01'
    await vm.$nextTick()
    expect(_vm.date).to.equal('')
  })

  it('should be able to toggle popup picker', async () => {
    let _vm = vm.$refs['date-picker-dropdown-example']
    _vm.$el.querySelector('.input-group-btn button').click()
    await vm.$nextTick()
    expect(_vm.$el.querySelector('.dropdown').className).to.contain('open')
    _vm.$el.querySelector('.input-group-btn button').click()
    await vm.$nextTick()
    expect(_vm.$el.querySelector('.dropdown').className).not.contain('open')
  })

  it('should be able to use custom icons', async () => {
    let _vm = vm.$refs['date-picker-icons-example']
    let $el = $(_vm.$el)
    let $tr = $el.find('table:first-child tr:first-child')
    expect($tr.find('td:first-child > .btn > i').get(0).className).to.contain('glyphicon-triangle-left')
    expect($tr.find('td:last-child > .btn > i').get(0).className).to.contain('glyphicon-triangle-right')
  })
})
