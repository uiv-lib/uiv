import newLocale from '../../locale/lang/zh-CN'
import {
  createWrapper,
  nextTick,
  sleep,
  triggerEvent,
} from '../../__test__/utils'
import { RouterLinkStub } from '@vue/test-utils'
import DatePicker from './DatePicker'

describe('DatePicker.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(
      `<section>
    <date-picker v-model="date"/>
    <br/>
    <alert type="info" v-show="date">You selected <b>{{date}}</b>.</alert>
  </section>`,
      {
        date: null,
      }
    )
  })

  it('should render correct month and year with given date on init', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" ref="datepicker"></date-picker>',
      {
        date: '1991-08-14',
      }
    )
    await nextTick()
    expect(wrapper.vm.$refs.datepicker.currentMonth).toEqual(7)
    expect(wrapper.vm.$refs.datepicker.currentYear).toEqual(1991)
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
    await nextTick()
    const now = new Date()
    expect(wrapper.findAll('.btn').at(1).text()).toEqual(
      now.getFullYear() + ' ' + now.getMonth()
    )
  })

  it('should be able to render date view', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const dateView = picker.findAll('table').at(0)
    expect(dateView.attributes('style')).not.toContain('display')
    const yearMonthBtn = dateView.findAll('button').at(1)
    const now = new Date()
    expect(yearMonthBtn.text()).toContain(
      `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
    )
    const todayBtn = dateView.find('.btn-info')
    expect(todayBtn.text()).toEqual(now.getDate().toString())
  })

  it('should be able to go prev month', async () => {
    const goPrev = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        await triggerEvent(actionBtn, 'click')
        now = new Date(now.getFullYear(), now.getMonth(), 0)
        expect(textBtn.text()).toContain(
          `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
        )
        // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        await goPrev(--i, actionBtn, now, textBtn)
      }
    }
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const dateView = picker.findAll('table').at(0)
    await goPrev(
      24,
      dateView.findAll('button').at(0),
      new Date(),
      dateView.findAll('button').at(1)
    )
  })

  it('should be able to go next month', async () => {
    const goNext = async (i, actionBtn, now, textBtn) => {
      if (i > 0) {
        await triggerEvent(actionBtn, 'click')
        if (now.getMonth() === 11) {
          now = new Date(now.getFullYear() + 1, 0, 1)
        } else {
          now = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        }
        expect(textBtn.text()).toContain(
          `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
        )
        // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
        await goNext(--i, actionBtn, now, textBtn)
      }
    }
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const dateView = picker.findAll('table').at(0)
    await goNext(
      24,
      dateView.findAll('button').at(2),
      new Date(),
      dateView.findAll('button').at(1)
    )
  })

  it('should be able to switch to month view from date view', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const dateView = picker.findAll('table').at(0)
    const yearMonthBtn = dateView.findAll('button').at(1)
    const monthView = picker.findAll('table').at(1)
    expect(dateView.attributes('style')).not.toContain('display')
    expect(monthView.attributes('style')).toContain('display: none')
    await triggerEvent(yearMonthBtn, 'click')
    expect(dateView.attributes('style')).toContain('display: none')
    expect(monthView.attributes('style')).not.toContain('display')
    const now = new Date()
    expect(monthView.findAll('button').at(1).text()).toEqual(
      now.getFullYear().toString()
    )
  })

  it('should be able to switch to date view from month view', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const dateView = picker.findAll('table').at(0)
    let yearMonthBtn = dateView.findAll('button').at(1)
    const monthView = picker.findAll('table').at(1)
    triggerEvent(yearMonthBtn, 'click')
    await nextTick()
    triggerEvent(monthView.find('tbody').find('button'), 'click')
    await nextTick()
    expect(dateView.attributes('style')).not.toContain('display')
    expect(monthView.attributes('style')).toContain('display: none')
    yearMonthBtn = dateView.findAll('button').at(1)
    let now = new Date()
    now = new Date(now.getFullYear(), 0, 1)
    expect(yearMonthBtn.text()).toContain(
      `${now.getFullYear()} ${now.toDateString().split(' ')[1]}`
    )
  })

  it('should be able to go prev year', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const monthView = picker.findAll('table').at(1)
    await triggerEvent(monthView.find('button'), 'click')
    const now = new Date()
    expect(monthView.findAll('button').at(1).text()).toEqual(
      now.getFullYear() - 1 + ''
    )
  })

  it('should be able to go next year', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const monthView = picker.findAll('table').at(1)
    await triggerEvent(monthView.findAll('button').at(2), 'click')
    const now = new Date()
    expect(monthView.findAll('button').at(1).text()).toEqual(
      now.getFullYear() + 1 + ''
    )
  })

  it('should be able to switch to year view from month view', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const yearView = picker.findAll('table').at(2)
    const monthView = picker.findAll('table').at(1)
    const yearBtn = monthView.findAll('button').at(1)
    expect(yearView.attributes('style')).toContain('display: none')
    await triggerEvent(yearBtn, 'click')
    expect(monthView.attributes('style')).toContain('display: none')
    expect(yearView.attributes('style')).not.toContain('display')
    const now = new Date()
    const start = now.getFullYear() - (now.getFullYear() % 20)
    const yearStr = `${start} ~ ${start + 19}`
    expect(yearView.findAll('button').at(1).text()).toEqual(yearStr)
  })

  it('should be able to switch to month view from year view', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const yearView = picker.findAll('table').at(2)
    const monthView = picker.findAll('table').at(1)
    expect(monthView.attributes('style')).toContain('display: none')
    triggerEvent(yearView.find('tbody').find('button'), 'click')
    await nextTick()
    expect(monthView.attributes('style')).not.toContain('display')
    expect(yearView.attributes('style')).toContain('display: none')
    const now = new Date()
    const year = now.getFullYear() - (now.getFullYear() % 20)
    expect(monthView.findAll('button').at(1).text()).toEqual(year.toString())
  })

  it('should be able to go prev year group', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const yearView = picker.findAll('table').at(2)
    await triggerEvent(yearView.find('button'), 'click')
    const now = new Date()
    const start = now.getFullYear() - (now.getFullYear() % 20)
    const yearStr = `${start - 20} ~ ${start - 20 + 19}`
    expect(yearView.findAll('button').at(1).text()).toEqual(yearStr)
  })

  it('should be able to go next year group', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const yearView = picker.findAll('table').at(2)
    await triggerEvent(yearView.findAll('button').at(2), 'click')
    const now = new Date()
    const start = now.getFullYear() - (now.getFullYear() % 20)
    const yearStr = `${start + 20} ~ ${start + 20 + 19}`
    expect(yearView.findAll('button').at(1).text()).toEqual(yearStr)
  })

  it('should be able to select date', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    const dateView = picker.findAll('table').at(0)
    const dateBtn = dateView.find('tbody').findAll('button').at(15)
    await triggerEvent(dateBtn, 'click')
    expect(dateBtn.classes()).toContain('btn-primary')
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
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    const dropdown = wrapper.find('.dropdown')
    const trigger = dropdown.find('button')
    expect(dropdown.classes()).not.toContain('open')
    await triggerEvent(trigger, 'click')
    expect(dropdown.classes()).toContain('open')
    await triggerEvent(picker, 'click')
    expect(dropdown.classes()).toContain('open')
  })

  it('should be able to use today btn', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    const dateView = picker.findAll('table').at(0)
    await triggerEvent(
      picker.find('.text-center').findAll('button').at(0),
      'click'
    )
    expect(dateView.find('tbody').find('.btn-primary').text()).toEqual(
      new Date().getDate().toString()
    )
  })

  it('should be able to use clear btn', async () => {
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    const dateView = picker.findAll('table').at(0)
    const btns = picker.find('.text-center').findAll('button')
    await triggerEvent(btns.at(0), 'click')
    await triggerEvent(btns.at(1), 'click')
    expect(dateView.find('tbody').findAll('.btn-primary').length).toEqual(0)
  })

  it('should be able to hide today btn', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" :today-btn="false" :clear-btn="false"/>',
      {
        date: null,
      }
    )
    await nextTick()
    expect(wrapper.findAll('button[data-type=today]').length).toEqual(0)
  })

  it('should be able to hide clear btn', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" :today-btn="false" :clear-btn="false"/>',
      {
        date: null,
      }
    )
    await nextTick()
    expect(wrapper.findAll('button[data-type=clear]').length).toEqual(0)
  })

  it('should be able to limit date range and render correct date view', async () => {
    const wrapper = createWrapper(
      '<div><date-picker v-model="date" limit-from="2018-01-01" limit-to="2019-01-01"/></div>',
      {
        date: null,
      }
    )
    wrapper.vm.date = '2018-01-01'
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    let btnDisabled = picker.find('tbody').findAll('button:disabled')
    expect(btnDisabled.length).toEqual(1)
    wrapper.vm.date = '2018-12-31'
    await nextTick()
    btnDisabled = picker.find('tbody').findAll('button:disabled')
    expect(btnDisabled.length).toEqual(5)
  })

  it('should be able to limit date range and not able to set invalid date', async () => {
    const wrapper = createWrapper(
      '<date-picker v-model="date" limit-from="2018-01-01" limit-to="2019-01-01"/>',
      {
        date: null,
      }
    )
    wrapper.vm.date = '2020-01-01'
    await nextTick()
    expect(wrapper.vm.date).toEqual('')
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
    await triggerEvent(wrapper.find('.input-group-btn button'), 'click')
    expect(wrapper.find('.dropdown').classes()).toContain('open')
    await triggerEvent(wrapper.find('.input-group-btn button'), 'click')
    expect(wrapper.find('.dropdown').classes()).not.toContain('open')
  })

  it('should be able to use custom icons', async () => {
    const wrapper = createWrapper(`<section>
    <date-picker icon-control-left="glyphicon glyphicon-triangle-left" icon-control-right="glyphicon glyphicon-triangle-right"/>
  </section>`)
    const $tr = wrapper.find('table:first-child tr:first-child')
    expect($tr.findAll('td:first-child > .btn > i').at(0).classes()).toContain(
      'glyphicon-triangle-left'
    )
    expect($tr.findAll('td:last-child > .btn > i').at(0).classes()).toContain(
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
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const dateView = picker.findAll('table').at(0)
    expect(dateView.attributes('style')).not.toContain('display')
    const sundayBtn = dateView.findAll('.btn-sunday')
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
    const locale = newLocale.uiv.datePicker
    await nextTick()
    const picker = wrapper.findAll('[data-role="date-picker"]').at(0)
    expect(picker).toBeDefined()
    const dateView = picker.findAll('table').at(0)
    const yearMonthBtn = dateView.find(
      'thead tr:first-child td:nth-child(2) button'
    )
    const now = new Date()
    expect(yearMonthBtn.text()).toContain(locale[`month${now.getMonth() + 1}`])
    const weekdays = dateView.findAll('thead tr:last-child td')
    const weekdayNames = []
    for (let i = 0; i < weekdays.length; i++)
      weekdayNames.push(weekdays.at(i).text())
    const { week1, week2, week3, week4, week5, week6, week7 } = locale
    expect(weekdayNames).toEqual([
      week7,
      week1,
      week2,
      week3,
      week4,
      week5,
      week6,
    ])
    const { today, clear } = locale
    const todayBtn = picker.find('.text-center .btn-info')
    expect(todayBtn.text()).toEqual(today)
    const clearBtn = picker.find('.text-center .btn-default')
    expect(clearBtn.text()).toEqual(clear)
  })
})
