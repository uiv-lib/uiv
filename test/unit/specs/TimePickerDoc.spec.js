/**
 * Created by zhengjingchun on 2017/3/28.
 */
import Vue from 'vue'
import TimePickerDoc from '@/docs/TimePickerDoc.vue'

describe('TimePickerDoc', () => {
  it('should be able to toggle meridian', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
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
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
    vm.hourStep = 1
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[0].value
      let hourPlus = vm.$el.querySelectorAll('td')[0].querySelector('a')
      hourPlus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[0].value
        if (parseInt(beforeText) != 12) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
        } else {
          expect(parseInt(afterText)).to.equal(1)
        }
        done()
      })
    })
  })

  it('should be able to add 1 minutes', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
    vm.minStep = 1
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[1].value
      let minutesPlus = vm.$el.querySelectorAll('tr td a')[1]
      minutesPlus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[1].value
        if (parseInt(beforeText) != 59) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 1)
        } else {
          expect(parseInt(afterText)).to.equal(0)
        }
        done()
      })
    })
  })

  it('should be able to minus 1 hours', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
    vm.hourStep = 1
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[0].value
      let hourMinus = vm.$el.querySelectorAll('tr')[2].querySelector('td a')
      hourMinus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[0].value
        if (parseInt(beforeText) != 1) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
        } else {
          expect(parseInt(afterText)).to.equal(12)
        }
        done()
      })
    })
  })

  it('should be able to minus 1 minutes', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
    vm.minStep = 1
    vm.$nextTick(() => {
      let beforeText = vm.$el.querySelectorAll('input')[1].value
      let minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td a')[1]
      minutesMinus.click()
      vm.$nextTick(() => {
        let afterText = vm.$el.querySelectorAll('input')[1].value
        if (parseInt(beforeText) != 0) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) - 1)
        } else {
          expect(parseInt(afterText)).to.equal(59)
        }
        done()
      })
    })
  })

  it('should be change to 24H', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
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
        if (toggleBtnText == 'PM' && parseInt(beforeText) != 12) {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText) + 12)
        } else if (toggleBtnText == 'PM' && parseInt(beforeText) == 12) {
          expect(parseInt(afterText)).to.equal(12)
        } else if (toggleBtnText == 'AM' && parseInt(beforeText) == 12) {
          expect(parseInt(afterText)).to.equal(0)
        } else {
          expect(parseInt(afterText)).to.equal(parseInt(beforeText))
        }
        done()
      })
    })
  })

  it('when hour is zero it can display true', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
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
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
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

  it('when minutes is 59 then plus minutes it can display true', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
    vm.myTime.setHours(9)
    vm.myTime.setMinutes(59)
    vm.myTime = new Date(vm.myTime)
    vm.$nextTick(() => {
      let beforeHourText = vm.$el.querySelectorAll('input')[0].value
      let minutesPlus = vm.$el.querySelectorAll('tr td a')[1]
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
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
    vm.myTime.setHours(9)
    vm.myTime.setMinutes(0)
    vm.myTime = new Date(vm.myTime)
    vm.$nextTick(() => {
      let beforeHourText = vm.$el.querySelectorAll('input')[0].value
      let minutesMinus = vm.$el.querySelectorAll('tr')[2].querySelectorAll('td a')[1]
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

  // it('can be set to 9:00', (done) => {
  //   const Constructor = Vue.extend(TimePickerDoc)
  //   const vm = new Constructor().$mount()
  //   vm.$nextTick(() => {
  //     let setNine = vm.$el.querySelector('[data-action="setNine"]')
  //     setNine.click()
  //     vm.$nextTick(() => {
  //       let hourText = vm.$el.querySelectorAll('input')[0].value
  //       let minutesText = vm.$el.querySelectorAll('input')[1].value
  //       let toggleBtn = vm.$el.querySelector('[data-action="toggleMeridian"]')
  //       expect(hourText).to.equal('09')
  //       expect(minutesText).to.equal('00')
  //       expect(toggleBtn.textContent).to.equal('AM')
  //       done()
  //     })
  //   })
  // })
})
