import Vue from 'vue'
import DatePicker from '@src/components/datepicker/DatePicker.vue'
import i18n from '@docs/locale'

describe('DatePicker', () => {
  it('should render correct month and year with given date on init', (done) => {
    let res = Vue.compile('<date-picker v-model="date" ref="datepicker"></date-picker>')
    let vm = new Vue({
      i18n,
      data () {
        return {
          date: '1991-08-14'
        }
      },
      components: {DatePicker},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$i18n.locale = 'en-US'
    vm.$mount()
    vm.$nextTick(() => {
      expect(vm.$refs.datepicker.currentMonth).to.equal(7)
      expect(vm.$refs.datepicker.currentYear).to.equal(1991)
      vm.$destroy()
      done()
    })
  })
})
