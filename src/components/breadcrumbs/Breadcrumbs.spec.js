import Breadcrumbs from './Breadcrumbs'
import { createWrapper, nextTick, sleep } from '../../__test__/utils'
import { RouterLinkStub } from '@vue/test-utils'

describe('Breadcrumbs', () => {
  it('should be able to render with item data', () => {
    const wrapper = createWrapper('<breadcrumbs :items="items"/>', {
      items: [
        { text: 'Home', href: '#' },
        { text: 'Library', href: '#' },
        { text: 'Data', href: '#' },
      ],
    })

    const links = wrapper.findAll('li')
    expect(links.length).toEqual(3)
    const $link1 = links[0].find('a')
    expect($link1.attributes('href')).toEqual('#')
    expect($link1.text()).toEqual('Home')
    const $link2 = links[1].find('a')
    expect($link2.attributes('href')).toEqual('#')
    expect($link2.text()).toEqual('Library')
    const $nav3 = links[2]
    // console.log(wrapper.html())
    expect($nav3.classes()).toContain('active')
    expect($nav3.findAll('a').length).toEqual(0)
    expect($nav3.text()).toEqual('Data')
  })

  it('should be able to render with <breadcrumb-item>', () => {
    const wrapper = createWrapper(`
      <breadcrumbs>
    <breadcrumb-item href="#"><b>Home</b></breadcrumb-item>
    <breadcrumb-item href="#">Library</breadcrumb-item>
    <breadcrumb-item active>Data</breadcrumb-item>
  </breadcrumbs>
      `)
    const links = wrapper.findAll('li')
    expect(links.length).toEqual(3)
    const $link1 = links[0].find('a')
    expect($link1.attributes('href')).toEqual('#')
    const $b = $link1.findAll('b')
    expect($b.length).toEqual(1)
    expect($b[0].text()).toEqual('Home')
    const $link2 = links[1].find('a')
    expect($link2.attributes('href')).toEqual('#')
    expect($link2.text()).toEqual('Library')
    const $nav3 = links[2]
    expect($nav3.classes()).toContain('active')
    expect($nav3.findAll('a').length).toEqual(0)
    expect($nav3.text()).toEqual('Data')
  })

  it('should be able to render router-link', () => {
    const wrapper = createWrapper('<breadcrumbs :items="items"/>', {
      items: [
        { text: 'Home', to: '/', exact: true },
        { text: 'Breadcrumbs', to: '/breadcrumbs' },
      ],
    })
    expect(wrapper.findAllComponents(RouterLinkStub)[0].props('to')).toEqual(
      '/'
    )
    expect(wrapper.findAllComponents(RouterLinkStub).length).toEqual(1)
  })

  it('should not auto active last item if using active prop', () => {
    const wrapper = createWrapper(
      '<breadcrumbs :items="items"></breadcrumbs>',
      {
        items: [{ text: 'test', href: '#', active: false, key: 0 }],
      }
    )
    const $li = wrapper.findAll('li')
    expect($li.length).toEqual(1)
    const $link1 = $li[0].find('a')
    expect($link1.attributes('href')).toEqual('#')
    expect($link1.text()).toEqual('test')
    expect(wrapper.findAll('.active').length).toEqual(0)
  })

  it('should render nothing if no children and items', async () => {
    const wrapper = createWrapper('<breadcrumbs></breadcrumbs>')
    await nextTick()
    expect(wrapper.html()).toEqual('<ol class="breadcrumb"></ol>')
  })
})
