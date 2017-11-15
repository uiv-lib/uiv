import Vue from 'vue'
import $ from 'jquery'
import ProgressBarDoc from '@docs/pages/components/ProgressBar.md'

describe('ProgressBar', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(ProgressBarDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render default', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').style.width).to.equal('66%')
  })

  it('should be able to render label', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[1].querySelector('.progress-bar').textContent).to.equal('66%')
  })

  it('should be able to render custom label', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[2].querySelector('.progress-bar').textContent).to.contain('Loading...')
  })

  it('should be able to render label with min width', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[3].querySelector('.progress-bar').style.minWidth).to.equal('2em')
  })

  it('should be able to render different types', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[4].querySelector('.progress-bar').className).to.contain('progress-bar-success')
  })

  it('should be able to render striped', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[8].querySelector('.progress-bar').className).to.contain('progress-bar-striped')
  })

  it('should be able to render animation', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[12].querySelector('.progress-bar').className).to.contain('active')
  })

  it('should be able to render stacked', async () => {
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[13].querySelectorAll('.progress-bar').length).to.equal(3)
  })
})
