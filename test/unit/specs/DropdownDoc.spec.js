import Vue from 'vue'
import DropdownDoc from '@/docs/DropdownDoc.vue'

describe('DropdownDoc', () => {
  it('should be able to open dropdown on trigger click', (done) => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    for (let i = 0; i < 3; i++) {
      let dropdown = vm.$el.querySelector(`#dropdown-${i + 1}`)
      let trigger = dropdown.querySelector('.dropdown-toggle')
      expect(dropdown.tagName.toLowerCase()).to.equal('div')
      expect(dropdown.className).to.not.contain('open')
      trigger.click()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        done()
      })
    }
  })

  it('should be able to close dropdown on trigger click', (done) => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    for (let i = 0; i < 3; i++) {
      let dropdown = vm.$el.querySelector(`#dropdown-${i + 1}`)
      let trigger = dropdown.querySelector('.dropdown-toggle')
      expect(dropdown.tagName.toLowerCase()).to.equal('div')
      expect(dropdown.className).to.not.contain('open')
      trigger.click()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        trigger.click()
        vm.$nextTick(() => {
          expect(dropdown.className).to.not.contain('open')
          done()
        })
      })
    }
  })

  it('should be able to close dropdown on trigger blur', (done) => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    let dropdown = vm.$el.querySelector(`#dropdown-1`)
    let trigger = dropdown.querySelector('.dropdown-toggle')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    trigger.click()
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      let event = document.createEvent('Events')
      event.initEvent('click', true, false)
      vm.$refs.dropdown1.windowClicked(event)
      vm.$nextTick(() => {
        expect(dropdown.className).to.not.contain('open')
        done()
      })
    })
  })

  it('should be able to destroy', () => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    expect(vm.$refs.dropdown1.triggerEl).to.exist
    vm.$destroy()
    expect(vm.$refs.dropdown1).to.not.exist
  })
})
