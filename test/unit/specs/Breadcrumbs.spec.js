import Vue from 'vue'
import $ from 'jquery'
import BreadcrumbsDoc from '@docs/pages/components/Breadcrumbs.md'

describe('Breadcrumbs', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(BreadcrumbsDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render with items data', () => {
    let b = $el.find('.breadcrumb').get(0)
    expect(b.querySelectorAll('li').length).to.equal(3)
    let nav1 = b.querySelectorAll('li a')[0]
    expect(nav1.getAttribute('href')).to.equal('#')
    expect(nav1.getAttribute('target')).to.equal('_self')
    expect(nav1.textContent).to.equal('Home')
    let nav2 = b.querySelectorAll('li a')[1]
    expect(nav2.getAttribute('href')).to.equal('#')
    expect(nav2.getAttribute('target')).to.equal('_self')
    expect(nav2.textContent).to.equal('Library')
    let nav3 = b.querySelectorAll('li')[2]
    expect(nav3.className).to.contain('active')
    expect(nav3.querySelector('a')).not.exist
    expect(nav3.textContent).to.equal('Data')
  })

  it('should be able to render with <breadcrumb-item>', () => {
    let b = $el.find('.breadcrumb').get(1)
    expect(b.querySelectorAll('li').length).to.equal(3)
    let nav1 = b.querySelectorAll('li a')[0]
    expect(nav1.getAttribute('href')).to.equal('#')
    expect(nav1.getAttribute('target')).to.equal('_self')
    expect(nav1.querySelector('b')).to.exist
    expect(nav1.querySelector('b').textContent).to.equal('Home')
    let nav2 = b.querySelectorAll('li a')[1]
    expect(nav2.getAttribute('href')).to.equal('#')
    expect(nav2.getAttribute('target')).to.equal('_self')
    expect(nav2.textContent).to.equal('Library')
    let nav3 = b.querySelectorAll('li')[2]
    expect(nav3.className).to.contain('active')
    expect(nav3.querySelector('a')).not.exist
    expect(nav3.textContent).to.equal('Data')
  })

  it('should be able to render router-link', () => {
    let b = $el.find('.breadcrumb').get(2)
    let nav1 = b.querySelectorAll('li a')[0]
    expect(nav1.getAttribute('href')).to.equal('#router-link') // router-link mock
  })

  it('should not auto active last item if using active prop', () => {
    let res = Vue.compile('<breadcrumbs :items="items"></breadcrumbs>')
    let vm = new Vue({
      data () {
        return {
          items: [{text: 'test', href: '#', active: false, key: 0}]
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el)
    expect(vm.$el.querySelectorAll('li').length).to.equal(1)
    let nav1 = vm.$el.querySelectorAll('li a')[0]
    expect(nav1.getAttribute('href')).to.equal('#')
    expect(nav1.getAttribute('target')).to.equal('_self')
    expect(nav1.textContent).to.equal('test')
    expect($el.find('.active').length).to.equal(0)
    vm.$destroy()
  })

  it('should render nothing if no children and items', async () => {
    let res = Vue.compile('<breadcrumbs></breadcrumbs>')
    let vm = new Vue({
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el)
    await vm.$nextTick()
    expect($el.children().length).to.equal(0)
    vm.$destroy()
  })
})
