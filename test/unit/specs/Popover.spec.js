import Vue from 'vue'
import Popover from '@/components/popover/Popover.vue'

describe('Popover', () => {
  it('should be ok if no trigger present', (done) => {
    const Constructor = Vue.extend(Popover)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$destroy()
      done()
    })
  })
})
