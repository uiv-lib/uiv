/**
 * Created by zhengjingchun on 2017/3/28.
 */
import Vue from 'vue'
import TimePickerDoc from '@/docs/TimePickerDoc.vue'

describe('TimePickerDoc', () => {
  it('should be able to toggle meridian', (done) => {
    const Constructor = Vue.extend(TimePickerDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let now = new Date()
      let toggleBtn = vm.$el.querySelector('#toggleMeridian')
      let meridianText = toggleBtn.textContent
      if (now.getHours() > 12) {
        expect(meridianText).to.equal('PM')
      } else {
        expect(meridianText).to.equal('AM')
      }
      toggleBtn.click()
      vm.$nextTick(() => {
        toggleBtn = vm.$el.querySelector('#toggleMeridian')
        let meridianTextAfterClick = toggleBtn.textContent
        if (meridianText == 'PM') {
          expect(meridianTextAfterClick).to.equal('AM')
        } else {
          expect(meridianTextAfterClick).to.equal('PM')
        }
        done()
      })
    })
  })
})
