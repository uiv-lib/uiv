import Vue from 'vue'
import $ from 'jquery'
import BtnGroup from '@docs/pages/components/BtnGroup.md'

describe('BtnGroup', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(BtnGroup)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render btn group', () => {
    let _$el = $(vm.$refs['btn-group-example'].$el)
    expect(_$el.find('.btn-group').length).to.equal(1)
    expect(_$el.find('.btn-group > .btn').length).to.equal(3)
  })

  it('should be able to render btn toolbar', () => {
    let _$el = $(vm.$refs['btn-group-toolbar'].$el)
    expect(_$el.find('.btn-toolbar').length).to.equal(1)
    expect(_$el.find('.btn-toolbar > .btn-group').length).to.equal(3)
  })

  it('should be able to render different sizes', () => {
    let _$el = $(vm.$refs['btn-group-sizes'].$el)
    expect(_$el.find('.btn-group').length).to.equal(4)
    expect(_$el.find('.btn-group').get(0).className).to.contain('btn-group-lg')
    expect(_$el.find('.btn-group').get(2).className).to.contain('btn-group-sm')
    expect(_$el.find('.btn-group').get(3).className).to.contain('btn-group-xs')
  })

  it('should be able to render nesting btn group', () => {
    let _$el = $(vm.$refs['btn-group-nesting'].$el)
    expect(_$el.find('.btn-group > .btn').length).to.equal(4)
    expect(_$el.find('.btn-group > .btn-group').length).to.equal(1)
  })

  it('should be able to render vertical btn group', () => {
    let _$el = $(vm.$refs['btn-group-vertical'].$el)
    expect(_$el.find('.btn-group-vertical').length).to.equal(1)
  })

  it('should be able to render justified btn group', async () => {
    let _$el = $(vm.$refs['btn-group-justified'].$el)
    await vm.$nextTick()
    expect(_$el.find('.btn-group-justified').length).to.equal(2)
    expect(_$el.find('.btn-group-justified > .btn-group').length).to.equal(6)
    expect(_$el.find('.btn-group-justified > .btn-group > .btn').length).to.equal(6)
  })
})
