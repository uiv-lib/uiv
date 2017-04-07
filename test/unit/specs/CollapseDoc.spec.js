import Vue from 'vue'
import CollapseDoc from '@/docs/pages/CollapseDoc.vue'
import config from './../config'

describe('CollapseDoc', () => {
  it('should be able to toggle collapse on trigger click', (done) => {
    const Constructor = Vue.extend(CollapseDoc)
    const vm = new Constructor().$mount()
    let trigger = vm.$el.querySelector(`button`)
    let collapse = vm.$el.querySelector(`.collapse`)
    expect(collapse.style.display).to.equal('none')
    trigger.click()
    setTimeout(() => {
      expect(collapse.style.display).to.equal('')
      trigger.click()
      setTimeout(() => {
        expect(collapse.style.display).to.equal('none')
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })

  it('should be able to toggle accordion', (done) => {
    const Constructor = Vue.extend(CollapseDoc)
    const vm = new Constructor().$mount()
    let triggers = vm.$el.querySelectorAll(`.panel-heading`)
    let collapse = vm.$el.querySelectorAll(`.collapse`)
    expect(collapse[1].style.display).to.equal('')
    expect(collapse[2].style.display).to.equal('none')
    triggers[1].click()
    setTimeout(() => {
      expect(collapse[1].style.display).to.equal('none')
      expect(collapse[2].style.display).to.equal('')
      triggers[1].click()
      setTimeout(() => {
        expect(collapse[2].style.display).to.equal('none')
        done()
      }, config.transitionDuration)
    }, config.transitionDuration)
  })
})
