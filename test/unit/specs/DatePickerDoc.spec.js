import Vue from 'vue'
import DatePickerDoc from '@/docs/DatePickerDoc.vue'

describe('DatePickerDoc', () => {
  it('should be able to render date view', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      expect(dateView.style.display).to.equal('')
      let yearMonthBtn = dateView.querySelectorAll('button')[1]
      let now = new Date()
      expect(yearMonthBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
      let todayBtn = dateView.querySelector('.btn-info')
      expect(todayBtn.textContent).to.equal(now.getDate().toString())
      done()
    })
  })

  it('should be able to destroy', () => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$destroy()
  })

  it('should be able to go prev month', (done) => {
    const goPrev = (i, actionBtn, now, textBtn, done) => {
      if (i === 0) {
        done()
      } else {
        actionBtn.click()
        vm.$nextTick(() => {
          now = new Date(now.getFullYear(), now.getMonth(), 0)
          expect(textBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
          // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
          goPrev(--i, actionBtn, now, textBtn, done)
        })
      }
    }
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      goPrev(
        36,
        dateView.querySelectorAll('button')[0],
        new Date(),
        dateView.querySelectorAll('button')[1],
        done)
    })
  })

  it('should be able to go next month', (done) => {
    const goNext = (i, actionBtn, now, textBtn, done) => {
      if (i === 0) {
        done()
      } else {
        actionBtn.click()
        vm.$nextTick(() => {
          if (now.getMonth() === 11) {
            now = new Date(now.getFullYear() + 1, 0, 1)
          } else {
            now = new Date(now.getFullYear(), now.getMonth() + 1, 1)
          }
          expect(textBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
          // console.log(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
          goNext(--i, actionBtn, now, textBtn, done)
        })
      }
    }
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let dateView = picker.querySelectorAll('table')[0]
      goNext(
        36,
        dateView.querySelectorAll('button')[2],
        new Date(),
        dateView.querySelectorAll('button')[1],
        done)
    })
  })

  it('should be able to switch to month view from date view', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
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
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear().toString())
        done()
      })
    })
  })

  it('should be able to switch to date view from month view', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
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
          now = new Date(now.getFullYear(), 0, 1)
          expect(yearMonthBtn.textContent).to.contain(`${now.getFullYear()} ${now.toDateString().split(' ')[1]}`)
          done()
        })
      })
    })
  })

  it('should be able to go prev year', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let monthView = picker.querySelectorAll('table')[1]
      monthView.querySelector('button').click()
      vm.$nextTick(() => {
        let now = new Date()
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() - 1 + '')
        done()
      })
    })
  })

  it('should be able to go next year', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let monthView = picker.querySelectorAll('table')[1]
      monthView.querySelectorAll('button')[2].click()
      vm.$nextTick(() => {
        let now = new Date()
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(now.getFullYear() + 1 + '')
        done()
      })
    })
  })

  it('should be able to switch to year view from month view', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
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
        let start = now.getFullYear() - now.getFullYear() % 20
        let yearStr = `${start} ~ ${start + 19}`
        expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
        done()
      })
    })
  })

  it('should be able to switch to month view from year view', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let yearView = picker.querySelectorAll('table')[2]
      let monthView = picker.querySelectorAll('table')[1]
      expect(monthView.style.display).to.equal('none')
      yearView.querySelector('tbody').querySelector('button').click()
      vm.$nextTick(() => {
        expect(monthView.style.display).to.equal('')
        expect(yearView.style.display).to.equal('none')
        let now = new Date()
        let year = now.getFullYear() - now.getFullYear() % 20
        expect(monthView.querySelectorAll('button')[1].textContent).to.equal(year.toString())
        done()
      })
    })
  })

  it('should be able to go prev year group', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let yearView = picker.querySelectorAll('table')[2]
      yearView.querySelector('button').click()
      vm.$nextTick(() => {
        let now = new Date()
        let start = now.getFullYear() - now.getFullYear() % 20
        let yearStr = `${start - 20} ~ ${start - 20 + 19}`
        expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
        done()
      })
    })
  })

  it('should be able to go next year group', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker).to.exist
      let yearView = picker.querySelectorAll('table')[2]
      yearView.querySelectorAll('button')[2].click()
      vm.$nextTick(() => {
        let now = new Date()
        let start = now.getFullYear() - now.getFullYear() % 20
        let yearStr = `${start + 20} ~ ${start + 20 + 19}`
        expect(yearView.querySelectorAll('button')[1].textContent).to.equal(yearStr)
        done()
      })
    })
  })

  it('should be able to select date', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      let dateView = picker.querySelectorAll('table')[0]
      let dateBtn = dateView.querySelector('tbody').querySelectorAll('button')[15]
      dateBtn.click()
      vm.$nextTick(() => {
        expect(dateBtn.className).to.contain('btn-primary')
        done()
      })
    })
  })

  it('should be able to use today btn', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      let dateView = picker.querySelectorAll('table')[0]
      picker.querySelector('.text-center').querySelectorAll('button')[0].click()
      vm.$nextTick(() => {
        expect(dateView.querySelector('tbody').querySelector('.btn-primary').textContent)
          .to.equal(new Date().getDate().toString())
        done()
      })
    })
  })

  it('should be able to use clear btn', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
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
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.todayBtn = false
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker.querySelector('.text-center').querySelector('.btn-info')).not.exist
      done()
    })
  })

  it('should be able to hide clear btn', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    vm.clearBtn = false
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      expect(picker.querySelector('.text-center').querySelector('.btn-default')).not.exist
      done()
    })
  })

  it('should be able to limit date range', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    vm.limitFrom = new Date()
    vm.limitTo = tomorrow
    vm.$nextTick(() => {
      let picker = vm.$el.querySelector('.date-picker')
      let dateInRange = picker.querySelector('tbody').querySelectorAll('button:not([disabled])')
      expect(dateInRange[0].textContent).to.equal(new Date().getDate().toString())
      if (dateInRange.length > 1) {
        expect(dateInRange[1].textContent).to.equal(tomorrow.getDate().toString())
      }
      done()
    })
  })

  it('should be able to toggle popup picker', (done) => {
    const Constructor = Vue.extend(DatePickerDoc)
    const vm = new Constructor().$mount()
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
