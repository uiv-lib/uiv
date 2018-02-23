import Vue from 'vue'
import DatePicker from '@src/components/datepicker/DatePicker.vue'
import DatePickerDoc from '@docs/pages/components/DatePicker.md'
import $ from 'jquery'
import utils from '../utils'

describe('DatePicker', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(DatePickerDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should render correct month and year with given date on init', async () => {
    const res = Vue.compile('<date-picker v-model="date" ref="datepicker"></date-picker>')
    const _vm = new Vue({
      data () {
        return {
          date: '1991-08-14'
        }
      },
      components: {DatePicker},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    await _vm.$nextTick()
    expect(_vm.$refs.datepicker.currentMonth).to.equal(7)
    expect(_vm.$refs.datepicker.currentYear).to.equal(1991)
    $el = $(_vm.$el)
    _vm.$destroy()
    $el.remove()
  })

  it('should be able to render date view', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    expect(dateView.style.display).to.equal('')
    const yearMonthBtn = dateView.querySelectorAll('button')[1]
    const now = new Date()
    expect(yearMonthBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
    const todayBtn = dateView.querySelector('.btn-info')
    expect(todayBtn.textContent).to.equal(now.getDate().toString())
  })

  it('should be able to go prev month', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    const goPrev = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        utils.triggerEvent(actionBtn, 'click')
        await vm.$nextTick()
        now = new Date(now.getFullYear(), now.getMonth(), 0)
        expect(textBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        await goPrev(--i, actionBtn, now, textBtn)
      }
    }
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    await goPrev(
      24,
      dateView.querySelectorAll('button')[0],
      new Date(),
      dateView.querySelectorAll('button')[1])
  }).timeout(5000)

  it('should be able to go next month', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    const goNext = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        utils.triggerEvent(actionBtn, 'click')
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
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    await goNext(
      24,
      dateView.querySelectorAll('button')[2],
      new Date(),
      dateView.querySelectorAll('button')[1])
  }).timeout(5000)

  it('should be able to switch to month view from date view', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    let picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    const yearMonthBtn = dateView.querySelectorAll('button')[1]
    const monthView = picker.querySelectorAll('table')[1]
    expect(dateView.style.display).to.equal('')
    expect(monthView.style.display).to.equal('none')
    utils.triggerEvent(yearMonthBtn, 'click')
    await vm.$nextTick()
    expect(dateView.style.display).to.equal('none')
    expect(monthView.style.display).to.equal('')
    const now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear().toString())
  })

  it('should be able to switch to date view from month view', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    let yearMonthBtn = dateView.querySelectorAll('button')[1]
    const monthView = picker.querySelectorAll('table')[1]
    utils.triggerEvent(yearMonthBtn, 'click')
    await vm.$nextTick()
    utils.triggerEvent(monthView.querySelector('tbody').querySelector('button'), 'click')
    await vm.$nextTick()
    expect(dateView.style.display).to.equal('')
    expect(monthView.style.display).to.equal('none')
    yearMonthBtn = dateView.querySelectorAll('button')[1]
    let now = new Date()
    now = new Date(now.getFullYear(), 0, 1)
    expect(yearMonthBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
  })

  it('should be able to go prev year', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const monthView = picker.querySelectorAll('table')[1]
    utils.triggerEvent(monthView.querySelector('button'), 'click')
    await vm.$nextTick()
    const now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() - 1 + '')
  })

  it('should be able to go next year', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const monthView = picker.querySelectorAll('table')[1]
    utils.triggerEvent(monthView.querySelectorAll('button')[2], 'click')
    await vm.$nextTick()
    const now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() + 1 + '')
  })

  it('should be able to switch to year view from month view', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    const monthView = picker.querySelectorAll('table')[1]
    const yearBtn = monthView.querySelectorAll('button')[1]
    expect(yearView.style.display).to.equal('none')
    utils.triggerEvent(yearBtn, 'click')
    await vm.$nextTick()
    expect(monthView.style.display).to.equal('none')
    expect(yearView.style.display).to.equal('')
    const now = new Date()
    const start = now.getFullYear() - now.getFullYear() % 20
    const yearStr = `${start} ~ ${start + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
  })

  it('should be able to switch to month view from year view', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    const monthView = picker.querySelectorAll('table')[1]
    expect(monthView.style.display).to.equal('none')
    utils.triggerEvent(yearView.querySelector('tbody').querySelector('button'), 'click')
    await vm.$nextTick()
    expect(monthView.style.display).to.equal('')
    expect(yearView.style.display).to.equal('none')
    const now = new Date()
    const year = now.getFullYear() - now.getFullYear() % 20
    expect(monthView.querySelectorAll('button')[1].textContent).to.equal(year.toString())
  })

  it('should be able to go prev year group', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    utils.triggerEvent(yearView.querySelector('button'), 'click')
    await vm.$nextTick()
    const now = new Date()
    const start = now.getFullYear() - now.getFullYear() % 20
    const yearStr = `${start - 20} ~ ${start - 20 + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
  })

  it('should be able to go next year group', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    utils.triggerEvent(yearView.querySelectorAll('button')[2], 'click')
    await vm.$nextTick()
    const now = new Date()
    const start = now.getFullYear() - now.getFullYear() % 20
    const yearStr = `${start + 20} ~ ${start + 20 + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
  })

  it('should be able to select date', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    const dateView = picker.querySelectorAll('table')[0]
    const dateBtn = dateView.querySelector('tbody').querySelectorAll('button')[15]
    utils.triggerEvent(dateBtn, 'click')
    await vm.$nextTick()
    expect(dateBtn.className).to.contain('btn-primary')
  })

  it('should not close the picker on picker body click', async () => {
    const _vm = vm.$refs['date-picker-dropdown-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).not.contain('open')
    utils.triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    utils.triggerEvent(picker, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to use today btn', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    const dateView = picker.querySelectorAll('table')[0]
    utils.triggerEvent(picker.querySelector('.text-center').querySelectorAll('button')[0], 'click')
    await vm.$nextTick()
    expect(dateView.querySelector('tbody').querySelector('.btn-primary').textContent)
      .to.equal(new Date().getDate().toString())
  })

  it('should be able to use clear btn', async () => {
    const _vm = vm.$refs['date-picker-example']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    const dateView = picker.querySelectorAll('table')[0]
    const btns = picker.querySelector('.text-center').querySelectorAll('button')
    utils.triggerEvent(btns[0], 'click')
    utils.triggerEvent(btns[1], 'click')
    await vm.$nextTick()
    expect(dateView.querySelector('tbody').querySelectorAll('.btn-primary').length).to.equal(0)
  })

  it('should be able to hide today btn', async () => {
    const _vm = vm.$refs['date-picker-without-buttons']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    expect(_$el.find('button:contains(Today)').length).to.equal(0)
  })

  it('should be able to hide clear btn', async () => {
    const _vm = vm.$refs['date-picker-without-buttons']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    expect(_$el.find('button:contains(Clear)').length).to.equal(0)
  })

  it('should be able to limit date range and render correct date view', async () => {
    const _vm = vm.$refs['date-picker-range-limit']
    const _$el = $(_vm.$el)
    _vm.date = '2018-01-01'
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    let btnDisabled = picker.querySelector('tbody').querySelectorAll('button:disabled')
    expect(btnDisabled.length).to.equal(1)
    _vm.date = '2018-12-31'
    await vm.$nextTick()
    btnDisabled = picker.querySelector('tbody').querySelectorAll('button:disabled')
    expect(btnDisabled.length).to.equal(5)
  })

  it('should be able to limit date range and not able to set invalid date', async () => {
    const _vm = vm.$refs['date-picker-range-limit']
    _vm.date = '2020-01-01'
    await vm.$nextTick()
    expect(_vm.date).to.equal('')
  })

  it('should be able to toggle popup picker', async () => {
    const _vm = vm.$refs['date-picker-dropdown-example']
    utils.triggerEvent(_vm.$el.querySelector('.input-group-btn button'), 'click')
    await vm.$nextTick()
    expect(_vm.$el.querySelector('.dropdown').className).to.contain('open')
    utils.triggerEvent(_vm.$el.querySelector('.input-group-btn button'), 'click')
    await vm.$nextTick()
    expect(_vm.$el.querySelector('.dropdown').className).not.contain('open')
  })

  it('should be able to use custom icons', async () => {
    const _vm = vm.$refs['date-picker-icons-example']
    const $el = $(_vm.$el)
    const $tr = $el.find('table:first-child tr:first-child')
    expect($tr.find('td:first-child > .btn > i').get(0).className).to.contain('glyphicon-triangle-left')
    expect($tr.find('td:last-child > .btn > i').get(0).className).to.contain('glyphicon-triangle-right')
  })

  it('should be able to use custom date classes', async () => {
    const _vm = vm.$refs['date-picker-custom-date-classes']
    const _$el = $(_vm.$el)
    await vm.$nextTick()
    const picker = _$el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    expect(dateView.style.display).to.equal('')
    const yesterdayBtn = dateView.querySelector('.yesterday-class')
    const tomorrowBtn = dateView.querySelector('.tomorrow-class')
    expect(Boolean(yesterdayBtn || tomorrowBtn)).to.be.true
  })
})
