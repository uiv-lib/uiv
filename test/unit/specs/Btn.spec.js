import Vue from 'vue'
import $ from 'jquery'
import BtnDoc from '@docs/pages/components/Btn.md'

describe('Btn', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(BtnDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render btn types', () => {
    let _$el = $(vm.$refs['btn-examples'].$el)
    expect(_$el.find('button.btn').length).to.equal(7)
    // all render as type=button
    expect(_$el.find('[type=button]').length).to.equal(7)
    expect(_$el.find('.btn').get(0).className).to.contain('btn-default')
    expect(_$el.find('.btn').get(1).className).to.contain('btn-primary')
    expect(_$el.find('.btn').get(2).className).to.contain('btn-success')
    expect(_$el.find('.btn').get(3).className).to.contain('btn-info')
    expect(_$el.find('.btn').get(4).className).to.contain('btn-warning')
    expect(_$el.find('.btn').get(5).className).to.contain('btn-danger')
    expect(_$el.find('.btn').get(6).className).to.contain('btn-link')
  })

  it('should be able to render link btn', () => {
    let _$el = $(vm.$refs['btn-links'].$el)
    expect(_$el.find('button').length).to.equal(0)
    expect(_$el.find('a.btn').length).to.equal(4)
    // native links
    expect(_$el.find('.btn').get(0).className).to.contain('btn-default')
    expect(_$el.find('.btn').get(0).getAttribute('href')).to.equal('#')
    expect(_$el.find('.btn').get(0).getAttribute('role')).to.equal('button')
    expect(_$el.find('.btn').get(1).className).to.contain('btn-primary')
    expect(_$el.find('.btn').get(1).getAttribute('href')).to.equal('#')
    expect(_$el.find('.btn').get(1).getAttribute('role')).to.equal('button')
    // router links
    expect(_$el.find('.btn').get(2).className).to.contain('btn-default')
    expect(_$el.find('.btn').get(2).getAttribute('href')).to.equal('#router-link')
    expect(_$el.find('.btn').get(2).getAttribute('role')).to.equal('button')
    expect(_$el.find('.btn').get(3).className).to.contain('btn-primary')
    expect(_$el.find('.btn').get(3).getAttribute('href')).to.equal('#router-link')
    expect(_$el.find('.btn').get(3).getAttribute('role')).to.equal('button')
  })

  it('should be able to render different size btn', () => {
    let _$el = $(vm.$refs['btn-sizes'].$el)
    expect(_$el.find('.btn').length).to.equal(8)
    expect(_$el.find('.btn').get(0).className).to.contain('btn-lg')
    expect(_$el.find('.btn').get(1).className).to.contain('btn-lg')
    expect(_$el.find('.btn').get(4).className).to.contain('btn-sm')
    expect(_$el.find('.btn').get(5).className).to.contain('btn-sm')
    expect(_$el.find('.btn').get(6).className).to.contain('btn-xs')
    expect(_$el.find('.btn').get(7).className).to.contain('btn-xs')
  })

  it('should be able to render block level btn', () => {
    let _$el = $(vm.$refs['btn-block'].$el)
    expect(_$el.find('.btn.btn-block').length).to.equal(2)
  })

  it('should be able to render active btn', () => {
    let _$el = $(vm.$refs['btn-active'].$el)
    expect(_$el.find('.btn.active').length).to.equal(4)
    expect(_$el.find('button.active').length).to.equal(2)
    expect(_$el.find('a.active').length).to.equal(2)
  })

  it('should be able to render disabled btn', () => {
    let _$el = $(vm.$refs['btn-disabled'].$el)
    expect(_$el.find('.btn').length).to.equal(4)
    expect(_$el.find('.btn[disabled]').length).to.equal(2)
    expect(_$el.find('.btn.disabled').length).to.equal(2)
  })
})
