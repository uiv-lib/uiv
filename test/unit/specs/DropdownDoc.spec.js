import Vue from 'vue'
import DropdownDoc from '@/docs/pages/DropdownDoc.vue'

describe('DropdownDoc', () => {
  it('should be able to open dropdown on trigger click', (done) => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    trigger.click()
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      done()
    })
  })

  it('should be able to close dropdown on trigger click', (done) => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
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
  })

  it('should be able to close dropdown on window click', (done) => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    let dropdown = vm.$el.querySelector(`.dropdown`)
    let trigger = dropdown.querySelector('button')
    expect(dropdown.tagName.toLowerCase()).to.equal('div')
    expect(dropdown.className).to.not.contain('open')
    trigger.click()
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      vm.$refs.dropdown.windowClicked({target: document.body})
      vm.$nextTick(() => {
        expect(dropdown.className).to.not.contain('open')
        done()
      })
    })
  })

  it('should be able to open dropdown append to body on trigger click', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount('#app')
    let dropdown = vm.$el.querySelectorAll(`.dropdown`)[3]
    let trigger = dropdown.querySelector('button')
    expect(dropdown.className).to.not.contain('open')
    expect(dropdown.querySelector('.dropdown-menu')).to.exist
    trigger.click()
    vm.$nextTick(() => {
      expect(dropdown.className).to.contain('open')
      expect(dropdown.querySelector('.dropdown-menu')).not.exist
      trigger.click()
      vm.$nextTick(() => {
        expect(dropdown.className).not.contain('open')
        expect(dropdown.querySelector('.dropdown-menu')).to.exist
        app.remove()
        done()
      })
    })
  })

  it('should be able to use dropup & menu-right style', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount('#app')
    vm.dropup = true
    vm.menuRight = true
    vm.$nextTick(() => {
      let dropdown = vm.$el.querySelectorAll(`.dropup`)[3]
      let trigger = dropdown.querySelector('button')
      expect(dropdown.className).to.not.contain('open')
      expect(dropdown.querySelector('.dropdown-menu')).to.exist
      expect(dropdown.querySelector('.dropdown-menu').className).to.contain('dropdown-menu-right')
      trigger.click()
      vm.$nextTick(() => {
        expect(dropdown.className).to.contain('open')
        expect(dropdown.querySelector('.dropdown-menu')).not.exist
        trigger.click()
        vm.$nextTick(() => {
          expect(dropdown.className).not.contain('open')
          expect(dropdown.querySelector('.dropdown-menu')).to.exist
          app.remove()
          done()
        })
      })
    })
  })

  it('should be able to destroy', () => {
    const Constructor = Vue.extend(DropdownDoc)
    const vm = new Constructor().$mount()
    vm.$destroy()
  })
})
