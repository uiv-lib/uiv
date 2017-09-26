import Vue from 'vue'
import ProgressBarDoc from '@/docs/pages/ProgressBarDoc.vue'
import i18n from '@/locale-docs'

describe('ProgressBarDoc', () => {
  let root

  beforeEach(() => {
    root = new Vue({
      i18n,
      template: '<ProgressBarDoc ref="doc"/>',
      components: {ProgressBarDoc}
    })
    root.$i18n.locale = 'en-US'
  })

  afterEach(() => {
    try {
      root.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to render', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let bars = vm.$el.querySelectorAll('.progress')
      expect(bars[0].querySelector('.progress-bar').style.width).to.equal('66%')
      expect(bars[1].querySelector('.progress-bar').textContent).to.equal('66%')
      expect(bars[2].querySelector('.progress-bar').textContent).to.equal('Loading... 66% completed')
      expect(bars[3].querySelector('.progress-bar').style.minWidth).to.equal('2em')
      expect(bars[4].querySelector('.progress-bar').className).to.contain('progress-bar-success')
      expect(bars[8].querySelector('.progress-bar').className).to.contain('progress-bar-striped')
      expect(bars[12].querySelector('.progress-bar').className).to.contain('active')
      expect(bars[13].querySelectorAll('.progress-bar').length).to.equal(3)
      done()
    })
  })
})
