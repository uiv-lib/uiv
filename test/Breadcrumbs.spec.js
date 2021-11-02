import $ from 'jquery'
import { createVm, destroyVm } from '../utils'

describe('Breadcrumbs', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to render with item data', () => {
    vm = createVm('<breadcrumbs :items="items"/>', {
      items: [
        { text: 'Home', href: '#' },
        { text: 'Library', href: '#' },
        { text: 'Data', href: '#' },
      ],
    })
    const $breadcrumb = $(vm.$el)
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
    vm = createVm(`
    <breadcrumbs>
  <breadcrumb-item href="#"><b>Home</b></breadcrumb-item>
  <breadcrumb-item href="#">Library</breadcrumb-item>
  <breadcrumb-item active>Data</breadcrumb-item>
</breadcrumbs>
    `)
    const $breadcrumb = $(vm.$el)
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
    vm = createVm('<breadcrumbs :items="items"/>', {
      items: [
        { text: 'Home', to: '/', exact: true },
        { text: 'Breadcrumbs', to: '/breadcrumbs' },
      ],
    })
    const $breadcrumb = $(vm.$el)
    const $nav1 = $breadcrumb.find('li a').first()
    expect($nav1.attr('href')).to.equal('#router-link') // router-link mock
  })

  it('should not auto active last item if using active prop', () => {
    vm = createVm('<breadcrumbs :items="items"></breadcrumbs>', {
      items: [{ text: 'test', href: '#', active: false, key: 0 }],
    })
    const $breadcrumb = $(vm.$el)
    const $li = $('li', $breadcrumb)
    expect($li.length).to.equal(1)
    const $link1 = $('a', $li)
    expect($link1.attr('href')).to.equal('#')
    expect($link1.text()).to.equal('test')
    expect($breadcrumb.find('.active').length).to.equal(0)
  })

  it('should render nothing if no children and items', async () => {
    vm = createVm('<breadcrumbs></breadcrumbs>')
    const $breadcrumb = $(vm.$el)
    await vm.$nextTick()
    expect($breadcrumb.children().length).to.equal(0)
  })
})
