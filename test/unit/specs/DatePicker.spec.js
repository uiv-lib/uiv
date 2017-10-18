import Vue from 'vue'
import DatePicker from '@src/components/datepicker/DatePicker.vue'
import DatePickerDoc from '@docs/pages/components/DatePicker.md'

describe('DatePicker', () => {
  let app

  beforeEach(() => {
    app = new Vue({
      template: '<DatePickerDoc ref="doc"/>',
      components: {DatePickerDoc}
    })
  })

  afterEach(() => {
    try {
      app.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should render correct month and year with given date on init', (done) => {
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
    })
    vm.$mount()
    vm.$nextTick(() => {
      expect(vm.$refs.datepicker.currentMonth).to.equal(7)
      expect(vm.$refs.datepicker.currentYear).to.equal(1991)
      vm.$destroy()
      done()
    })
  })

  it('should be able to render date view', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      expect(dateView.style.display).to.equal('')
      let yearMonthBtn = dateView.querySelectorAll('button')[1]
      let now = new Date()
      expect(yearMonthBtn.textContent).to.contain(`${now.getUTCFullYear()} ${now.toDateString().split(' ')[1]}`)
      let todayBtn = dateView.querySelector('.btn-info')
      expect(todayBtn.textContent).to.equal(now.getUTCDate().toString())
      done()
    })
  })

  it('should be able to destroy', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$destroy()
    done()
  })

  it('should be able to go prev month', (done) => {
    let vm = app.$mount().$refs.doc
    const goPrev = (i, actionBtn, now, textBtn, done) => {
      if (i === 0) {
        done()
      } else {
        actionBtn.click()
        vm.$nextTick(() => {
          now = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0))
          expect(textBtn.textContent).to.contain(`${now.getUTCFullYear()} ${now.toDateString().split(' ')[1]}`)
          // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
          goPrev(--i, actionBtn, now, textBtn, done)
        })
      }
    }
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      goPrev(
        12,
        dateView.querySelectorAll('button')[0],
        new Date(),
        dateView.querySelectorAll('button')[1],
        done)
    })
  }).timeout(5000)

  it('should be able to go next month', (done) => {
    let vm = app.$mount().$refs.doc
    const goNext = (i, actionBtn, now, textBtn, done) => {
      if (i === 0) {
        done()
      } else {
        actionBtn.click()
        vm.$nextTick(() => {
          if (now.getUTCMonth() === 11) {
            now = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1))
          } else {
            now = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1))
          }
          expect(textBtn.textContent).to.contain(`${now.getUTCFullYear()} ${now.toDateString().split(' ')[1]}`)
          // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
          goNext(--i, actionBtn, now, textBtn, done)
        })
      }
    }
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      goNext(
        12,
        dateView.querySelectorAll('button')[2],
        new Date(),
        dateView.querySelectorAll('button')[1],
        done)
    })
  }).timeout(5000)

  it('should be able to switch to month view from date view', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      let yearMonthBtn = dateView.querySelectorAll('button')[1]
      let monthView = picker.querySelectorAll('table')[1]
      expect(dateView.style.display).to.equal('')
      expect(monthView.style.display).to.equal('none')
      yearMonthBtn.click()
      vm.$nextTick(() => {
        expect(dateView.style.display).to.equal('none')
        expect(monthView.style.display).to.equal('')
        let now = new Date()
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getUTCFullYear().toString())
        done()
      })
    })
  })

  it('should be able to switch to date view from month view', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      let yearMonthBtn = dateView.querySelectorAll('button')[1]
      let monthView = picker.querySelectorAll('table')[1]
      yearMonthBtn.click()
      vm.$nextTick(() => {
        monthView.querySelector('tbody').querySelector('button').click()
        vm.$nextTick(() => {
          expect(dateView.style.display).to.equal('')
          expect(monthView.style.display).to.equal('none')
          let yearMonthBtn = dateView.querySelectorAll('button')[1]
          let now = new Date()
          now = new Date(Date.UTC(now.getUTCFullYear(), 0, 1))
          expect(yearMonthBtn.textContent).to.contain(`${now.getUTCFullYear()} ${now.toDateString().split(' ')[1]}`)
          done()
        })
      })
    })
  })

  it('should be able to go prev year', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let monthView = picker.querySelectorAll('table')[1]
      monthView.querySelector('button').click()
      vm.$nextTick(() => {
        let now = new Date()
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getUTCFullYear() - 1 + '')
        done()
      })
    })
  })

  it('should be able to go next year', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let monthView = picker.querySelectorAll('table')[1]
      monthView.querySelectorAll('button')[2].click()
      vm.$nextTick(() => {
        let now = new Date()
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getUTCFullYear() + 1 + '')
        done()
      })
    })
  })

  it('should be able to switch to year view from month view', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let yearView = picker.querySelectorAll('table')[2]
      let monthView = picker.querySelectorAll('table')[1]
      let yearBtn = monthView.querySelectorAll('button')[1]
      expect(yearView.style.display).to.equal('none')
      yearBtn.click()
      vm.$nextTick(() => {
        expect(monthView.style.display).to.equal('none')
        expect(yearView.style.display).to.equal('')
        let now = new Date()
        let start = now.getUTCFullYear() - now.getFullYear() % 20
        let yearStr = `${start} ~ ${start + 19}`
        expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
        done()
      })
    })
  })

  it('should be able to switch to month view from year view', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let yearView = picker.querySelectorAll('table')[2]
      let monthView = picker.querySelectorAll('table')[1]
      expect(monthView.style.display).to.equal('none')
      yearView.querySelector('tbody').querySelector('button').click()
      vm.$nextTick(() => {
        expect(monthView.style.display).to.equal('')
        expect(yearView.style.display).to.equal('none')
        let now = new Date()
        let year = now.getUTCFullYear() - now.getFullYear() % 20
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(year.toString())
        done()
      })
    })
  })

  it('should be able to go prev year group', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let yearView = picker.querySelectorAll('table')[2]
      yearView.querySelector('button').click()
      vm.$nextTick(() => {
        let now = new Date()
        let start = now.getUTCFullYear() - now.getUTCFullYear() % 20
        let yearStr = `${start - 20} ~ ${start - 20 + 19}`
        expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
        done()
      })
    })
  })

  it('should be able to go next year group', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker).to.exist
      let yearView = picker.querySelectorAll('table')[2]
      yearView.querySelectorAll('button')[2].click()
      vm.$nextTick(() => {
        let now = new Date()
        let start = now.getUTCFullYear() - now.getUTCFullYear() % 20
        let yearStr = `${start + 20} ~ ${start + 20 + 19}`
        expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
        done()
      })
    })
  })

  it('should be able to select date', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      let dateView = picker.querySelectorAll('table')[0]
      let dateBtn = dateView.querySelector('tbody').querySelectorAll('button')[15]
      dateBtn.click()
      vm.$nextTick(() => {
        expect(dateBtn.className).to.contain('btn-primary')
        done()
      })
    })
  })

  it('should not close the picker on picker body click', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-2')
      let dropdown = vm.$el.querySelector('.dropdown')
      let trigger = dropdown.querySelector('button')
      expect(dropdown.className).not.contain('open')
      trigger.click()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        picker.click()
        vm.$nextTick(() => {
          expect(dropdown.className).to.contain('open')
          done()
        })
      })
    })
  })

  it('should be able to use today btn', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      let dateView = picker.querySelectorAll('table')[0]
      picker.querySelector('.text-center').querySelectorAll('button')[0].click()
      vm.$nextTick(() => {
        expect(dateView.querySelector('tbody').querySelector('.btn-primary').textContent)
          .to.equal(new Date().getUTCDate().toString())
        done()
      })
    })
  })

  it('should be able to use clear btn', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      let dateView = picker.querySelectorAll('table')[0]
      picker.querySelector('.text-center').querySelectorAll('button')[0].click()
      picker.querySelector('.text-center').querySelectorAll('button')[1].click()
      vm.$nextTick(() => {
        expect(dateView.querySelector('tbody').querySelectorAll('.btn-primary').length).to.equal(0)
        done()
      })
    })
  })

  it('should be able to hide today btn', (done) => {
    let vm = app.$mount().$refs.doc
    vm.todayBtn = false
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker.querySelector('.text-center').querySelector('.btn-info')).not.exist
      done()
    })
  })

  it('should be able to hide clear btn', (done) => {
    let vm = app.$mount().$refs.doc
    vm.clearBtn = false
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      expect(picker.querySelector('.text-center').querySelector('.btn-default')).not.exist
      done()
    })
  })

  it('should be able to limit date range and render correct date view', (done) => {
    let vm = app.$mount().$refs.doc
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getUTCDate() + 1)
    vm.limitFrom = new Date()
    vm.limitTo = tomorrow
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('#date-picker-1')
      let dateInRange = picker.querySelector('tbody').querySelectorAll('button:not([disabled])')
      expect(dateInRange[0].textContent).to.equal(new Date().getUTCDate().toString())
      if (dateInRange.length > 1) {
        expect(dateInRange[1].textContent).to.equal(tomorrow.getUTCDate().toString())
      }
      done()
    })
  })

  it('should be able to limit date range and not able to set invalid date', (done) => {
    let vm = app.$mount().$refs.doc
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getUTCDate() + 1)
    vm.limitFrom = '2017-01-01'
    vm.limitTo = '2017-01-03'
    vm.date = '2017-01-04'
    vm.$nextTick(() => {
      expect(vm.date).to.equal('')
      done()
    })
  })

  it('should be able handle invalid limit params', (done) => {
    let vm = app.$mount().$refs.doc
    vm.limitFrom = 'foo'
    vm.limitTo = 'bar'
    vm.$nextTick(() => {
      done()
    })
  })

  it('should be able to toggle popup picker', (done) => {
    let vm = app.$mount().$refs.doc
    vm.$el.querySelector('.input-group-btn button').click()
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.dropdown').className).to.contain('open')
      vm.$el.querySelector('.input-group-btn button').click()
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.dropdown').className).not.contain('open')
        done()
      })
    })
  })
})
