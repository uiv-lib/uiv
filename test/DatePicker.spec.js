import newLocale from '../src/locale/lang/zh-CN'
import $ from 'jquery'
import { createWrapper, destroyVm, triggerEvent } from '../utils'

describe('DatePicker', () => {
  let vm
  let $el

  beforeEach(() => {
    const wrapper = createWrapper(
      `<section>
    <date-picker v-model="date"/>
    <br/>
    <alert type="info" v-show="date">You selected <b>{{date}}</b>.</alert>
  </section>`,
      {
        date: null,
      }
    )
    $el = $(vm.$el)
  })

  afterEach(() => {
    destroyVm(vm)
  })

  it('should render correct month and year with given date on init', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" ref="datepicker"></date-picker>',
      {
        date: '1991-08-14',
      }
    )
    await vm.$nextTick()
    expect(vm.$refs.datepicker.currentMonth).toEqual(7)
    expect(vm.$refs.datepicker.currentYear).toEqual(1991)
  })

  it('should be able to render custom year month str', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" :year-month-formatter="formatter"></date-picker>',
      {
        date: '',
      },
      {
        methods: {
          formatter(year, month) {
            return year + ' ' + month
          },
        },
      }
    )
    await vm.$nextTick()
    $el = $(vm.$el)
    const now = new Date()
    expect($el.find('.btn').get(1).textContent).toEqual(
      now.getFullYear() + ' ' + now.getMonth()
    )
  })

  it('should be able to render date view', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    expect(dateView.style.display).toEqual('')
    const yearMonthBtn = dateView.querySelectorAll('button')[1]
    const now = new Date()
    expect(yearMonthBtn.textContent).toContain(
      `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
    )
    const todayBtn = dateView.querySelector('.btn-info')
    expect(todayBtn.textContent).toEqual(now.getDate().toString())
  })

  it('should be able to go prev month', async () => {
    const goPrev = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        triggerEvent(actionBtn, 'click')
        await vm.$nextTick()
        now = new Date(now.getFullYear(), now.getMonth(), 0)
        expect(textBtn.textContent).toContain(
          `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
        )
        // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        await goPrev(--i, actionBtn, now, textBtn)
      }
    }
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    await goPrev(
      24,
      dateView.querySelectorAll('button')[0],
      new Date(),
      dateView.querySelectorAll('button')[1]
    )
  }).timeout(5000)

  it('should be able to go next month', async () => {
    const goNext = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        triggerEvent(actionBtn, 'click')
        await vm.$nextTick()
        if (now.getMonth() === 11) {
          now = new Date(now.getFullYear() + 1, 0, 1)
        } else {
          now = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        }
        expect(textBtn.textContent).toContain(
          `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
        )
        // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        await goNext(--i, actionBtn, now, textBtn)
      }
    }
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    await goNext(
      24,
      dateView.querySelectorAll('button')[2],
      new Date(),
      dateView.querySelectorAll('button')[1]
    )
  }).timeout(5000)

  it('should be able to switch to month view from date view', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    const yearMonthBtn = dateView.querySelectorAll('button')[1]
    const monthView = picker.querySelectorAll('table')[1]
    expect(dateView.style.display).toEqual('')
    expect(monthView.style.display).toEqual('none')
    triggerEvent(yearMonthBtn, 'click')
    await vm.$nextTick()
    expect(dateView.style.display).toEqual('none')
    expect(monthView.style.display).toEqual('')
    const now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).toEqual(
      now.getFullYear().toString()
    )
  })

  it('should be able to switch to date view from month view', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    let yearMonthBtn = dateView.querySelectorAll('button')[1]
    const monthView = picker.querySelectorAll('table')[1]
    triggerEvent(yearMonthBtn, 'click')
    await vm.$nextTick()
    triggerEvent(
      monthView.querySelector('tbody').querySelector('button'),
      'click'
    )
    await vm.$nextTick()
    expect(dateView.style.display).toEqual('')
    expect(monthView.style.display).toEqual('none')
    yearMonthBtn = dateView.querySelectorAll('button')[1]
    let now = new Date()
    now = new Date(now.getFullYear(), 0, 1)
    expect(yearMonthBtn.textContent).toContain(
      `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
    )
  })

  it('should be able to go prev year', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const monthView = picker.querySelectorAll('table')[1]
    triggerEvent(monthView.querySelector('button'), 'click')
    await vm.$nextTick()
    const now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).toEqual(
      now.getFullYear() - 1 + ''
    )
  })

  it('should be able to go next year', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const monthView = picker.querySelectorAll('table')[1]
    triggerEvent(monthView.querySelectorAll('button')[2], 'click')
    await vm.$nextTick()
    const now = new Date()
    expect(monthView.querySelectorAll('button')[1].textContent).toEqual(
      now.getFullYear() + 1 + ''
    )
  })

  it('should be able to switch to year view from month view', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    const monthView = picker.querySelectorAll('table')[1]
    const yearBtn = monthView.querySelectorAll('button')[1]
    expect(yearView.style.display).toEqual('none')
    triggerEvent(yearBtn, 'click')
    await vm.$nextTick()
    expect(monthView.style.display).toEqual('none')
    expect(yearView.style.display).toEqual('')
    const now = new Date()
    const start = now.getFullYear() - (now.getFullYear() % 20)
    const yearStr = `${start} ~ ${start + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).toEqual(yearStr)
  })

  it('should be able to switch to month view from year view', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    const monthView = picker.querySelectorAll('table')[1]
    expect(monthView.style.display).toEqual('none')
    triggerEvent(
      yearView.querySelector('tbody').querySelector('button'),
      'click'
    )
    await vm.$nextTick()
    expect(monthView.style.display).toEqual('')
    expect(yearView.style.display).toEqual('none')
    const now = new Date()
    const year = now.getFullYear() - (now.getFullYear() % 20)
    expect(monthView.querySelectorAll('button')[1].textContent).toEqual(
      year.toString()
    )
  })

  it('should be able to go prev year group', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    triggerEvent(yearView.querySelector('button'), 'click')
    await vm.$nextTick()
    const now = new Date()
    const start = now.getFullYear() - (now.getFullYear() % 20)
    const yearStr = `${start - 20} ~ ${start - 20 + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).toEqual(yearStr)
  })

  it('should be able to go next year group', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const yearView = picker.querySelectorAll('table')[2]
    triggerEvent(yearView.querySelectorAll('button')[2], 'click')
    await vm.$nextTick()
    const now = new Date()
    const start = now.getFullYear() - (now.getFullYear() % 20)
    const yearStr = `${start + 20} ~ ${start + 20 + 19}`
    expect(yearView.querySelectorAll('button')[1].textContent).toEqual(yearStr)
  })

  it('should be able to select date', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    const dateView = picker.querySelectorAll('table')[0]
    const dateBtn = dateView
      .querySelector('tbody')
      .querySelectorAll('button')[15]
    triggerEvent(dateBtn, 'click')
    await vm.$nextTick()
    expect(dateBtn.className).toContain('btn-primary')
  })

  it('should not close the picker on picker body click', async () => {
    const wrapper = createWrapper(
      `  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" v-model="date">
        <div class="input-group-btn">
          <btn class="dropdown-toggle"><i class="glyphicon glyphicon-calendar"></i></btn>
        </div>
      </div>
      <template slot="dropdown">
        <li>
          <date-picker v-model="date"/>
        </li>
      </template>
    </dropdown>
  </form>`,
      {
        date: null,
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    const dropdown = vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('button')
    expect(dropdown.className).not.contain('open')
    triggerEvent(trigger, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    triggerEvent(picker, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
  })

  it('should be able to use today btn', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    const dateView = picker.querySelectorAll('table')[0]
    triggerEvent(
      picker.querySelector('.text-center').querySelectorAll('button')[0],
      'click'
    )
    await vm.$nextTick()
    expect(
      dateView.querySelector('tbody').querySelector('.btn-primary').textContent
    ).toEqual(new Date().getDate().toString())
  })

  it('should be able to use clear btn', async () => {
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    const dateView = picker.querySelectorAll('table')[0]
    const btns = picker.querySelector('.text-center').querySelectorAll('button')
    triggerEvent(btns[0], 'click')
    triggerEvent(btns[1], 'click')
    await vm.$nextTick()
    expect(
      dateView.querySelector('tbody').querySelectorAll('.btn-primary').length
    ).toEqual(0)
  })

  it('should be able to hide today btn', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" :today-btn="false" :clear-btn="false"/>',
      {
        date: null,
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    expect($el.find('button:contains(Today)').length).toEqual(0)
  })

  it('should be able to hide clear btn', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" :today-btn="false" :clear-btn="false"/>',
      {
        date: null,
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    expect($el.find('button:contains(Clear)').length).toEqual(0)
  })

  it('should be able to limit date range and render correct date view', async () => {
    const wrapper = createWrapper(
      '<div><date-picker v-model="date" limit-from="2018-01-01" limit-to="2019-01-01"/></div>',
      {
        date: null,
      }
    )
    const $el = $(vm.$el)
    vm.date = '2018-01-01'
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    let btnDisabled = picker
      .querySelector('tbody')
      .querySelectorAll('button:disabled')
    expect(btnDisabled.length).toEqual(1)
    vm.date = '2018-12-31'
    await vm.$nextTick()
    btnDisabled = picker
      .querySelector('tbody')
      .querySelectorAll('button:disabled')
    expect(btnDisabled.length).toEqual(5)
  })

  it('should be able to limit date range and not able to set invalid date', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" limit-from="2018-01-01" limit-to="2019-01-01"/>',
      {
        date: null,
      }
    )
    vm.date = '2020-01-01'
    await vm.$nextTick()
    expect(vm.date).toEqual('')
  })

  it('should be able to toggle popup picker', async () => {
    const wrapper = createWrapper(
      `  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" v-model="date">
        <div class="input-group-btn">
          <btn class="dropdown-toggle"><i class="glyphicon glyphicon-calendar"></i></btn>
        </div>
      </div>
      <template slot="dropdown">
        <li>
          <date-picker v-model="date"/>
        </li>
      </template>
    </dropdown>
  </form>`,
      {
        date: null,
      }
    )
    triggerEvent(vm.$el.querySelector('.input-group-btn button'), 'click')
    await vm.$nextTick()
    expect(vm.$el.querySelector('.dropdown').className).toContain('open')
    triggerEvent(vm.$el.querySelector('.input-group-btn button'), 'click')
    await vm.$nextTick()
    expect(vm.$el.querySelector('.dropdown').className).not.contain('open')
  })

  it('should be able to use custom icons', async () => {
    const wrapper = createWrapper(`<section>
    <date-picker icon-control-left="glyphicon glyphicon-triangle-left" icon-control-right="glyphicon glyphicon-triangle-right"/>
  </section>`)
    const $el = $(vm.$el)
    const $tr = $el.find('table:first-child tr:first-child')
    expect($tr.find('td:first-child > .btn > i').get(0).className).toContain(
      'glyphicon-triangle-left'
    )
    expect($tr.find('td:last-child > .btn > i').get(0).className).toContain(
      'glyphicon-triangle-right'
    )
  })

  it('should be able to use custom date classes', async () => {
    const wrapper = createWrapper(
      '<div><date-picker v-model="date" :date-class="dateClass"/></div>',
      {
        date: null,
      },
      {
        methods: {
          dateClass(date) {
            return date.getDay() === 0 ? 'btn-sunday' : ''
          },
        },
      }
    )
    const $el = $(vm.$el)
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    expect(dateView.style.display).toEqual('')
    const sundayBtn = dateView.querySelectorAll('.btn-sunday')
    expect(sundayBtn.length).toEqual(6)
  })

  it('should be able to use locale for custom translations', async () => {
    const wrapper = createWrapper(
      `<section>
    <date-picker :locale="locale" v-model="date"/>
  </section>`,
      {
        date: null,
        locale: newLocale,
      }
    )
    const $el = $(vm.$el)
    const locale = newLocale.uiv.datePicker
    await vm.$nextTick()
    const picker = $el.find('[data-role="date-picker"]').get(0)
    expect(picker).to.exist
    const dateView = picker.querySelectorAll('table')[0]
    const yearMonthBtn = dateView.querySelector(
      'thead tr:first-child td:nth-child(2) button'
    )
    const now = new Date()
    expect(yearMonthBtn.textContent).toContain(
      locale[`month${now.getMonth() + 1}`]
    )
    const weekdays = dateView.querySelectorAll('thead tr:last-child td')
    const weekdayNames = []
    for (let i = 0; i < weekdays.length; i++)
      weekdayNames.push(weekdays[i].textContent)
    const { week1, week2, week3, week4, week5, week6, week7 } = locale
    expect(weekdayNames).to.eql([
      week7,
      week1,
      week2,
      week3,
      week4,
      week5,
      week6,
    ])
    const { today, clear } = locale
    const todayBtn = picker.querySelector('.text-center .btn-info')
    expect(todayBtn.textContent).toEqual(today)
    const clearBtn = picker.querySelector('.text-center .btn-default')
    expect(clearBtn.textContent).toEqual(clear)
  })
})
