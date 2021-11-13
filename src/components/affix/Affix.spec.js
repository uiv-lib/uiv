import Affix from './Affix'
import { createWrapper, nextTick } from '../../__test__/utils'

describe('Affix', () => {
  let wrapper

  beforeEach(() => {
    window.scrollTo(0, 0)
    wrapper = createWrapper(
      `
<div>
  <affix :offset="offset">
    <ul>
      <li>Test1</li>
      <li>Test2</li>
      <li>Test3</li>
    </ul>
  </affix>
</div>`,
      {
        offset: 0,
      }
    )
  })

  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be able to toggle affix class', async () => {
    expect(wrapper.findAll('.affix').length).toEqual(0)
    wrapper.findComponent(Affix).vm.$el.getClientRects = jest.fn(() => 'emt')
    wrapper.findComponent(Affix).vm.$el.getBoundingClientRect = jest.fn(() => ({
      top: -200,
      left: 0,
    }))
    window.scrollTo(0, 200)
    // console.log(document.body.innerHTML)
    await nextTick()
    // console.log(document.body.innerHTML)
    expect(wrapper.findAll('.affix').length).toEqual(1)
    wrapper.findComponent(Affix).vm.$el.getBoundingClientRect = jest.fn(() => ({
      top: -1,
      left: 0,
    }))
    window.scrollTo(0, 500)
    await nextTick()
    expect(wrapper.findAll('.affix').length).toEqual(1)
    wrapper.findComponent(Affix).vm.$el.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
    }))
    window.scrollTo(0, 0)
    await nextTick()
    expect(wrapper.findAll('.affix').length).toEqual(0)
  })

  it('should not toggle affix class if element is hidden', async () => {
    expect(wrapper.findAll('.affix').length).toEqual(0)
    window.scrollTo(0, 500)
    await nextTick()
    expect(wrapper.findAll('.affix').length).toEqual(0)
    window.scrollTo(0, 0)
    await nextTick()
    expect(wrapper.findAll('.affix').length).toEqual(0)
  })

  it('should be able to use offset', async () => {
    wrapper.findComponent(Affix).vm.$el.getClientRects = jest.fn(() => 'emt')
    await wrapper.setData({
      offset: 50,
    })
    wrapper.findComponent(Affix).vm.$el.getBoundingClientRect = jest.fn(() => ({
      top: 60,
      left: 0,
    }))
    window.scrollTo(0, 40)
    await nextTick()
    expect(wrapper.findAll('.affix').length).toEqual(0)
    wrapper.findComponent(Affix).vm.$el.getBoundingClientRect = jest.fn(() => ({
      top: 45,
      left: 0,
    }))
    window.scrollTo(0, 55)
    await nextTick()
    expect(wrapper.findAll('.affix').length).toEqual(1)
  })
})
