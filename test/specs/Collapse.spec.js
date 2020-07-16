import Vue from 'vue'
import $ from 'jquery'
import CollapseDoc from '@docs/pages/components/Collapse.md'
import * as utils from '../utils'

describe('Collapse', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(CollapseDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to toggle collapse on trigger click', async () => {
    const trigger = $el.find('button').get(0)
    const collapse = $el.find('.collapse').get(0)
    expect(collapse.className).to.equal('collapse')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(400)
    expect(collapse.className).to.equal('collapse in')
    utils.triggerEvent(trigger, 'click')
    await utils.sleep(400)
    expect(collapse.className).to.equal('collapse')
  })

  it('should be able to toggle accordion', async () => {
    const triggers = $el.find('.panel-heading')
    const collapse = $el.find('.collapse')
    expect(collapse.get(1).className).to.equal('collapse in')
    expect(collapse.get(2).className).to.equal('collapse')
    utils.triggerEvent(triggers.get(1), 'click')
    await utils.sleep(400)
    expect(collapse.get(1).className).to.equal('collapse')
    expect(collapse.get(2).className).to.equal('collapse in')
    utils.triggerEvent(triggers.get(1), 'click')
    await utils.sleep(400)
    expect(collapse.get(2).className).to.equal('collapse')
  })
})
