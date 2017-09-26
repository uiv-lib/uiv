import Vue from 'vue'
import CollapseDoc from '@/docs/pages/CollapseDoc.vue'
import i18n from '@/locale-docs'

describe('CollapseDoc', () => {
  let app

  beforeEach(() => {
    app = new Vue({
      i18n,
      template: '<CollapseDoc ref="doc"/>',
      components: {CollapseDoc}
    })
    app.$i18n.locale = 'en-US'
  })

  afterEach(() => {
    try {
      app.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to toggle collapse on trigger click', (done) => {
    let vm = app.$mount().$refs.doc
    let trigger = vm.$el.querySelector(`button`)
    let collapse = vm.$el.querySelector(`.collapse`)
    expect(collapse.className).to.equal('collapse')
    trigger.click()
    setTimeout(() => {
      expect(collapse.className).to.equal('collapse in')
      trigger.click()
      setTimeout(() => {
        expect(collapse.className).to.equal('collapse')
        done()
      }, 400)
    }, 400)
  })

  it('should be able to toggle accordion', (done) => {
    let vm = app.$mount().$refs.doc
    let triggers = vm.$el.querySelectorAll(`.panel-heading`)
    let collapse = vm.$el.querySelectorAll(`.collapse`)
    expect(collapse[1].className).to.equal('collapse in')
    expect(collapse[2].className).to.equal('collapse')
    triggers[1].click()
    setTimeout(() => {
      expect(collapse[1].className).to.equal('collapse')
      expect(collapse[2].className).to.equal('collapse in')
      triggers[1].click()
      setTimeout(() => {
        expect(collapse[2].className).to.equal('collapse')
        done()
      }, 400)
    }, 400)
  })
})
