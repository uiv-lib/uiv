import Vue from 'vue'
import $ from 'jquery'
import BreadcrumbsDoc from '@docs/pages/components/Breadcrumbs.md'

describe('Breadcrumbs', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(BreadcrumbsDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render with item data', () => {
    const $breadcrumb = $($el.find('.breadcrumb').get(0))
    const $li = $('li', $breadcrumb)
    expect($li.length).to.equal(3)
    const $link1 = $('a', $li.first())
    expect($link1.attr('href')).to.equal('#')
    expect($link1.text()).to.equal('Home')
    const $link2 = $('a', $li.get(1))
    expect($link2.attr('href')).to.equal('#')
    expect($link2.text()).to.equal('Library')
    const $nav3 = $li.last()
    expect($nav3.attr('class')).to.contain('active')
    expect($nav3.find('a').length).to.equal(0)
    expect($nav3.text()).to.equal('Data')
  })

  it('should be able to render with <breadcrumb-item>', () => {
    const $breadcrumb = $($el.find('.breadcrumb').get(1))
    const $li = $('li', $breadcrumb)
    expect($li.length).to.equal(3)
    const $link1 = $('a', $li.first())
    expect($link1.attr('href')).to.equal('#')
    const $b = $link1.find('b')
    expect($b.length).to.equal(1)
    expect($b.text()).to.equal('Home')
    const $link2 = $('a', $li.get(1))
    expect($link2.attr('href')).to.equal('#')
    expect($link2.text()).to.equal('Library')
    const $nav3 = $li.last()
    expect($nav3.attr('class')).to.contain('active')
    expect($nav3.find('a').length).to.equal(0)
    expect($nav3.text()).to.equal('Data')
  })

  it('should be able to render router-link', () => {
    const $breadcrumb = $($el.find('.breadcrumb').get(2))
    const $nav1 = $breadcrumb.find('li a').first()
    expect($nav1.attr('href')).to.equal('#router-link') // router-link mock
  })

  it('should not auto active last item if using active prop', () => {
    const res = Vue.compile('<breadcrumbs :items="items"></breadcrumbs>')
    const _vm = new Vue({
      data () {
        return {
          items: [{text: 'test', href: '#', active: false, key: 0}]
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $breadcrumb = $(_vm.$el)
    const $li = $('li', $breadcrumb)
    expect($li.length).to.equal(1)
    const $link1 = $('a', $li)
    expect($link1.attr('href')).to.equal('#')
    expect($link1.text()).to.equal('test')
    expect($breadcrumb.find('.active').length).to.equal(0)
    _vm.$destroy()
  })

  it('should render nothing if no children and items', async () => {
    const res = Vue.compile('<breadcrumbs></breadcrumbs>')
    const _vm = new Vue({
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const $breadcrumb = $(_vm.$el)
    await _vm.$nextTick()
    expect($breadcrumb.children().length).to.equal(0)
    _vm.$destroy()
  })
})
