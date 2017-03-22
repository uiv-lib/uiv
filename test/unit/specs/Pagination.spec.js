import Vue from 'vue'
import PaginationDoc from '@/docs/PaginationDoc.vue'

describe('PaginationDoc', () => {
  it('current page can be changed outside', (done) => {
    const Constructor = Vue.extend(PaginationDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      // TODO
      done()
    })
  })

  it('should be able to disappear dispBoundary link', (done) => {
    const Constructor = Vue.extend(PaginationDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      // TODO
      done()
    })
  })
})
