import Vue from 'vue'
import CollapseDoc from '@/docs/CollapseDoc.vue'
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
})
