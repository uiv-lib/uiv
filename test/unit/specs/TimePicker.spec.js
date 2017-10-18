/**
 * Created by zhengjingchun on 2017/3/28.
 */
import Vue from 'vue'
import TimePickerDoc from '@docs/pages/components/TimePicker.md'

describe('TimePicker', () => {
  let root

  beforeEach(() => {
    root = new Vue({
      template: '<TimePickerDoc ref="doc"/>',
      components: {TimePickerDoc}
    })
  })

  afterEach(() => {
    try {
      root.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to toggle meridian', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(9)
    vm.myTime = new Date(vm.myTime)
    vm.$nextTick(() => {
      let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
      let meridianText = toggleBtn.textContent
      expect(meridianText).to.equal('AM')
      toggleBtn.click()
      vm.$nextTick(() => {
        toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
        let meridianTextAfterClick = toggleBtn.textContent
        expect(meridianTextAfterClick).to.equal('PM')
        toggleBtn.click()
        vm.$nextTick(() => {
          toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
          let meridianTextAfterTwoClick = toggleBtn.textContent
          expect(meridianTextAfterTwoClick).to.equal('AM')
          done()
        })
      })
    })
  })

  it('should be able to add 1 hours', (done) => {
    let vm = root.$mount().$refs.doc
    vm.hourStep = 1
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[0].value
      let hourPlus = vm.$el.querySelectorAll('td')[0].querySelector('button')
      hourPlus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[0].value
        if (parseInt(beforeText) !== 12) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
        } else {
          expect(parseInt(afterText)).to.equal(1)
        }
        vm.myTime.setHours(23)
        vm.myTime = new Date(vm.myTime)
        vm.$nextTick(() => {
          hourPlus.click()
          vm.$nextTick(() => {
            afterText = vm.$el.querySelectorAll('input')[0].value
            expect(parseInt(afterText)).to.equal(12)
            done()
          })
        })
      })
    })
  })

  it('should be able to add 1 minutes', (done) => {
    let vm = root.$mount().$refs.doc
    vm.minStep = 1
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[1].value
      let minutesPlus = vm.$el.querySelectorAll('tr td button')[1]
      minutesPlus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[1].value
        if (parseInt(beforeText) !== 59) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
        } else {
          expect(parseInt(afterText)).to.equal(0)
        }
        done()
      })
    })
  })

  it('should be able to minus 1 hours', (done) => {
    let vm = root.$mount().$refs.doc
    vm.hourStep = 1
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[0].value
      let hourMinus = vm.$el.querySelectorAll('tr')[2].querySelector('td button')
      hourMinus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[0].value
        if (parseInt(beforeText) !== 1) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
        } else {
          expect(parseInt(afterText)).to.equal(12)
        }
        vm.myTime.setHours(0)
        vm.myTime = new Date(vm.myTime)
        vm.$nextTick(() => {
          hourMinus.click()
          vm.$nextTick(() => {
            afterText = vm.$el.querySelectorAll('input')[0].value
            expect(parseInt(afterText)).to.equal(11)
            done()
          })
        })
      })
    })
  })

  it('should be able to minus 1 minutes', (done) => {
    let vm = root.$mount().$refs.doc
    vm.minStep = 1
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[1].value
      let minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
      minutesMinus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[1].value
        if (parseInt(beforeText) !== 0) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
        } else {
          expect(parseInt(afterText)).to.equal(59)
        }
        done()
      })
    })
  })

  it('should be change to 24H', (done) => {
    let vm = root.$mount().$refs.doc
    vm.showMeridian = true
    vm.$nextTick(() => {
      let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
      let toggleBtnText = toggleBtn.textContent
      let beforeText = vm.$el.querySelectorAll('input')[0].value
      expect(toggleBtn).to.exist
      vm.showMeridian = false
      vm.$nextTick(() => {
        toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
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
        done()
      })
    })
  })

  it('when hour is zero it can display true', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(0)
    vm.myTime = new Date(vm.myTime)
    vm.$nextTick(() => {
      let hourText = vm.$el.querySelectorAll('input')[0].value
      let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
      expect(parseInt(hourText)).to.equal(12)
      expect(toggleBtn.textContent).to.equal('AM')
      done()
    })
  })

  it('when hour is 12 it can display true', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(12)
    vm.myTime = new Date(vm.myTime)
    vm.$nextTick(() => {
      let hourText = vm.$el.querySelectorAll('input')[0].value
      let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
      expect(parseInt(hourText)).to.equal(12)
      expect(toggleBtn.textContent).to.equal('PM')
      done()
    })
  })

  it('should be able to set hour using input in 24h mode', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(12)
    vm.myTime = new Date(vm.myTime)
    vm.showMeridian = false
    let timePicker = vm.$refs.timepicker
    vm.$nextTick(() => {
      let hourInput = vm.$el.querySelectorAll('input')[0]
      expect(parseInt(hourInput.value)).to.equal(12)
      timePicker.hoursText = -1
      vm.$nextTick(() => {
        expect(parseInt(hourInput.value)).to.equal(12)
        timePicker.hoursText = 25
        vm.$nextTick(() => {
          expect(parseInt(hourInput.value)).to.equal(12)
          timePicker.hoursText = 13
          vm.$nextTick(() => {
            expect(parseInt(hourInput.value)).to.equal(13)
            done()
          })
        })
      })
    })
  })

  it('should be able to set hour using input in 12h mode', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(12)
    vm.myTime = new Date(vm.myTime)
    vm.showMeridian = true
    let timePicker = vm.$refs.timepicker
    vm.$nextTick(() => {
      let hourInput = vm.$el.querySelectorAll('input')[0]
      expect(parseInt(hourInput.value)).to.equal(12)
      timePicker.hoursText = -1
      vm.$nextTick(() => {
        expect(parseInt(hourInput.value)).to.equal(12)
        timePicker.hoursText = 13
        vm.$nextTick(() => {
          expect(parseInt(hourInput.value)).to.equal(12)
          timePicker.hoursText = 5
          vm.$nextTick(() => {
            expect(parseInt(hourInput.value)).to.equal(5)
            done()
          })
        })
      })
    })
  })

  it('should be able to set minute using input', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(12)
    vm.myTime.setMinutes(0)
    vm.myTime = new Date(vm.myTime)
    vm.showMeridian = true
    let timePicker = vm.$refs.timepicker
    vm.$nextTick(() => {
      let minuteInput = vm.$el.querySelectorAll('input')[1]
      expect(parseInt(minuteInput.value)).to.equal(0)
      timePicker.minutesText = -1
      vm.$nextTick(() => {
        expect(parseInt(minuteInput.value)).to.equal(0)
        timePicker.minutesText = 60
        vm.$nextTick(() => {
          expect(parseInt(minuteInput.value)).to.equal(0)
          timePicker.minutesText = 5
          vm.$nextTick(() => {
            expect(parseInt(minuteInput.value)).to.equal(5)
            done()
          })
        })
      })
    })
  })

  it('when minutes is 59 then plus minutes it can display true', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(9)
    vm.myTime.setMinutes(59)
    vm.myTime = new Date(vm.myTime)
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let beforeHourText = vm.$el.querySelectorAll('input')[0].value
      let minutesPlus = vm.$el.querySelectorAll('tr td button')[1]
      minutesPlus.click()
      vm.$nextTick(() => {
        let afterHourText = vm.$el.querySelectorAll('input')[0].value
        let afterMinutesText = vm.$el.querySelectorAll('input')[1].value
        expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) + 1)
        expect(parseInt(afterMinutesText)).to.equal(0)
        done()
      })
    })
  })

  it('when minutes is 0 then minus minutes it can display true', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(9)
    vm.myTime.setMinutes(0)
    vm.myTime = new Date(vm.myTime)
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let beforeHourText = vm.$el.querySelectorAll('input')[0].value
      let minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td button')[1]
      minutesMinus.click()
      vm.$nextTick(() => {
        let afterHourText = vm.$el.querySelectorAll('input')[0].value
        let afterMinutesText = vm.$el.querySelectorAll('input')[1].value
        expect(parseInt(afterHourText)).to.equal(parseInt(beforeHourText) - 1)
        expect(parseInt(afterMinutesText)).to.equal(59)
        done()
      })
    })
  })

  it('can be set to 9:00', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let setNine = vm.$el.querySelector('[data-action="setNine"]')
      setNine.click()
      vm.$nextTick(() => {
        let hourText = vm.$el.querySelectorAll('input')[0].value
        let minutesText = vm.$el.querySelectorAll('input')[1].value
        let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
        expect(hourText).to.equal('09')
        expect(minutesText).to.equal('00')
        expect(toggleBtn.textContent).to.equal('AM')
        done()
      })
    })
  })

  it('can be plus and minus hour after wheel', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setHours(9)
    vm.myTime = new Date(vm.myTime)
    vm.$nextTick(() => {
      vm.$refs.timepicker.hoursWheel({deltaY: 1, preventDefault: () => true})
      vm.$nextTick(() => {
        let hourText = vm.$el.querySelectorAll('input')[0].value
        expect(hourText).to.equal('08')
        vm.$refs.timepicker.hoursWheel({deltaY: -1, preventDefault: () => true})
        vm.$nextTick(() => {
          hourText = vm.$el.querySelectorAll('input')[0].value
          expect(hourText).to.equal('09')
          done()
        })
      })
    })
  })

  it('can be plus and minus minutes after wheel', (done) => {
    let vm = root.$mount().$refs.doc
    vm.myTime.setMinutes(30)
    vm.myTime = new Date(vm.myTime)
    vm.$nextTick(() => {
      vm.$refs.timepicker.minutesWheel({deltaY: 1, preventDefault: () => true})
      vm.$nextTick(() => {
        let minutesText = vm.$el.querySelectorAll('input')[1].value
        expect(minutesText).to.equal('29')
        vm.$refs.timepicker.minutesWheel({deltaY: -1, preventDefault: () => true})
        vm.$nextTick(() => {
          minutesText = vm.$el.querySelectorAll('input')[1].value
          expect(minutesText).to.equal('30')
          done()
        })
      })
    })
  })

  it('shouldnt add a time bigger then max', (done) => {
    let vm = root.$mount().$refs.doc
    vm.max = '09:01'
    vm.myTime.setHours(9)
    vm.myTime = new Date(vm.myTime)
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let hourText = vm.$el.querySelectorAll('input')[0].value
      let hourPlus = vm.$el.querySelectorAll('td')[0].querySelector('button')
      expect(hourText).to.equal('09')
      hourPlus.click()
      vm.$nextTick(() => {
        hourText = vm.$el.querySelectorAll('input')[0].value
        expect(hourText).to.equal('09')
        done()
      })
    })
  })

  it('shouldnt add a time smaller then min', (done) => {
    let vm = root.$mount().$refs.doc
    vm.min = '08:30'
    vm.myTime.setHours(9)
    vm.myTime.setMinutes(0)
    vm.myTime = new Date(vm.myTime)
    vm.isReadOnly = false
    vm.$nextTick(() => {
      let hourText = vm.$el.querySelectorAll('input')[0].value
      expect(hourText).to.equal('09')
      let hourMinus = vm.$el.querySelectorAll('tr')[2].querySelector('td button')
      hourMinus.click()
      vm.$nextTick(() => {
        hourText = vm.$el.querySelectorAll('input')[0].value
        let minutesText = vm.$el.querySelectorAll('input')[1].value
        expect(hourText).to.equal('08')
        expect(minutesText).to.equal('30')
        done()
      })
    })
  })
})
