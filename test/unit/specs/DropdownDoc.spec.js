import Vue from 'vue'
import DropdownDoc from '@/docs/DropdownDoc.vue'

describe('Dropdown', () => {
  it('should be able to open dropdown', () => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    for (let i = 0; i < 3; i++) {
      let dropdown = vm.$el.querySelector(`#dropdown-${i + 1}`)
      let trigger = dropdown.querySelector('.dropdown-toggle')
      expect(dropdown.tagName.toLowerCase()).to.equal('span')
      expect(dropdown.querySelector('.dropdown-menu')).to.equal(null)
      trigger.click()
      vm.$nextTick(() => {
        expect(dropdown.querySelector('.dropdown-menu')).not.equal(null)
      })
    }
  })

  it('should be able to close dropdown', () => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    for (let i = 0; i < 3; i++) {
      let dropdown = vm.$el.querySelector(`#dropdown-${i + 1}`)
      let trigger = dropdown.querySelector('.dropdown-toggle')
      expect(dropdown.tagName.toLowerCase()).to.equal('span')
      expect(dropdown.querySelector('.dropdown-menu')).to.equal(null)
      trigger.click()
      trigger.click()
      vm.$nextTick(() => {
        expect(dropdown.querySelector('.dropdown-menu')).to.equal(null)
      })
    }
  })
})
