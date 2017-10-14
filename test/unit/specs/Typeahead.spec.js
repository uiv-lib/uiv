import Vue from 'vue'
import Typeahead from '@src/components/typeahead/Typeahead.vue'

describe('Typeahead', () => {
  it('should not be able to work if no trigger present', (done) => {
    const Constructor = Vue.extend(Typeahead)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$destroy()
      done()
    })
  })

  it('should not be able to work if no data source present', (done) => {
    let res = Vue.compile('<typeahead ref="typeahead"><input data-role="input" type="text"></typeahead>')
    let vm = new Vue({
      components: {Typeahead},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$nextTick(() => {
      let input = vm.$el.querySelector('input')
      let dropdown = vm.$el.querySelector('.dropdown')
      input.value = 'test'
      vm.$refs.typeahead.inputChanged()
      vm.$nextTick(() => {
        expect(dropdown.className).not.contain('open')
        vm.$destroy()
        done()
      })
    })
  })
})
