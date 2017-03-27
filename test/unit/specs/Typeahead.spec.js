import Vue from 'vue'
import Typeahead from '@/components/typeahead/Typeahead.vue'

describe('Typeahead', () => {
  it('should not be able to work if no trigger present', (done) => {
    const Constructor = Vue.extend(Typeahead)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$destroy()
      done()
    })
  })
})
