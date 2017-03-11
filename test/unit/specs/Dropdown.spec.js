import Vue from 'vue'
import Dropdown from '@/components/Dropdown.vue'

describe('Dropdown', () => {
  it('should not be able to work if no trigger present', (done) => {
    const Constructor = Vue.extend(Dropdown)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelector('.dropdown-toggle')
    expect(trigger).to.not.exist
    let event = document.createEvent('Events')
    event.initEvent('click', true, false)
    vm.windowClicked(event)
    vm.$destroy()
    done()
  })
})
