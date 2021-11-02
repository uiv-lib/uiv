import newLocale from '../../locale/lang/zh-CN'
import {
  createWrapper,
  keyCodes,
  nextTick,
  sleep,
  transition,
  triggerEvent,
} from '../../__test__/utils'
import { RouterLinkStub } from '@vue/test-utils'
import _ from 'lodash'

describe('MultiSelect', () => {
  it('should be able to render with no options', async () => {
    const wrapper = createWrapper(
      '<div><multi-select v-model="selected" :options="options"/></div>',
      {
        selected: [],
        options: [],
      }
    )
    await nextTick()
    const trigger = wrapper.element.querySelector('.dropdown-toggle')
    trigger.click()
    await nextTick()
    expect(wrapper.element.querySelectorAll('li > a').length).toEqual(0)
  })

  it('should be able to use custom placeholder', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" placeholder="someplaceholder..."/>
</div>`,
      {
        selected: [],
        options: [{ value: 1, label: 'Option1' }],
      }
    )
    await nextTick()
    expect(
      wrapper.element.querySelector('[data-role="trigger"] .text-muted')
        .textContent
    ).toEqual('someplaceholder...')
  })

  it('should be able to open dropdown and select options', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options"/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.toContain('open')
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
    expect(display.textContent).toEqual('Select...')
    expect(dropdown.querySelectorAll('li > a')[0].textContent).toEqual(
      'Option1'
    )
    expect(dropdown.querySelectorAll('li > a')[1].textContent).toEqual(
      'Option2'
    )
    expect(dropdown.querySelectorAll('li > a')[2].textContent).toEqual(
      'Option3'
    )
    expect(dropdown.querySelectorAll('li > a')[3].textContent).toEqual(
      'Option4'
    )
    expect(dropdown.querySelectorAll('li > a')[4].textContent).toEqual(
      'Option5'
    )
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1')
    expect(_.isEqual(wrapper.vm.selected, [1])).toBeTruthy()
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2')
    expect(_.isEqual(wrapper.vm.selected, [1, 2])).toBeTruthy()
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option3')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3])).toBeTruthy()
    // select option 4
    dropdown.querySelectorAll('li')[3].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option3, Option4')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4])).toBeTruthy()
    // select option 5
    dropdown.querySelectorAll('li')[4].click()
    await nextTick()
    expect(display.textContent).toEqual(
      'Option1, Option2, Option3, Option4, Option5'
    )
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4, 5])).toBeTruthy()
    // unselect option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(display.textContent).toEqual('Option2, Option3, Option4, Option5')
    expect(_.isEqual(wrapper.vm.selected, [2, 3, 4, 5])).toBeTruthy()
    // unselect option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(display.textContent).toEqual('Option3, Option4, Option5')
    expect(_.isEqual(wrapper.vm.selected, [3, 4, 5])).toBeTruthy()
    // unselect option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Option4, Option5')
    expect(_.isEqual(wrapper.vm.selected, [4, 5])).toBeTruthy()
    // unselect option 4
    dropdown.querySelectorAll('li')[3].click()
    await nextTick()
    expect(display.textContent).toEqual('Option5')
    expect(_.isEqual(wrapper.vm.selected, [5])).toBeTruthy()
    // unselect option 5
    dropdown.querySelectorAll('li')[4].click()
    await nextTick()
    expect(display.textContent).toEqual('Select...')
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
  })

  it('should be able to use custom `itemSelectedClass`', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" item-selected-class="someclass"/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    // select option 1
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Option3')
    expect(dropdown.querySelectorAll('li')[2].className).toContain('someclass')
    expect(_.isEqual(wrapper.vm.selected, [3])).toBeTruthy()
  })

  it('should be able to limit selected length', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" :limit="3"/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    trigger.click()
    await nextTick()
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1')
    expect(_.isEqual(wrapper.vm.selected, [1])).toBeTruthy()
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2')
    expect(_.isEqual(wrapper.vm.selected, [1, 2])).toBeTruthy()
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option3')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3])).toBeTruthy()
    // select option 4 (should not work)
    dropdown.querySelectorAll('li')[3].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option3')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3])).toBeTruthy()
    // select option 5 (should not work)
    dropdown.querySelectorAll('li')[4].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option3')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3])).toBeTruthy()
    // unselect option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(display.textContent).toEqual('Option2, Option3')
    expect(_.isEqual(wrapper.vm.selected, [2, 3])).toBeTruthy()
    // unselect option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(display.textContent).toEqual('Option3')
    expect(_.isEqual(wrapper.vm.selected, [3])).toBeTruthy()
    // unselect option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Select...')
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
  })

  it('should be able to render optional sizes', async () => {
    const wrapper = createWrapper(
      `  <section>
      <multi-select v-model="selected" :options="options" size="sm"/>
      <multi-select v-model="selected" :options="options"/>
      <multi-select v-model="selected" :options="options" size="lg"/>
      <multi-select v-model="selected" :options="options" size="lg" block/>
  </section>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const _el = wrapper.element
    const dropdown1 = _el.querySelectorAll('.dropdown')[0]
    const dropdown2 = _el.querySelectorAll('.dropdown')[1]
    const dropdown3 = _el.querySelectorAll('.dropdown')[2]
    const dropdown4 = _el.querySelectorAll('.dropdown')[3]
    const className1 = dropdown1.querySelector('.form-control').className
    const className2 = dropdown2.querySelector('.form-control').className
    const className3 = dropdown3.querySelector('.form-control').className
    const className4 = dropdown4.querySelector('.form-control').className
    // sm size
    expect(dropdown1.style.width).toEqual('')
    expect(className1).toContain('input-sm')
    expect(className1).not.toContain('input-lg')
    // normal
    expect(dropdown2.style.width).toEqual('')
    expect(className2).not.toContain('input-sm')
    expect(className2).not.toContain('input-lg')
    // lg size
    expect(dropdown3.style.width).toEqual('')
    expect(className3).not.toContain('input-sm')
    expect(className3).toContain('input-lg')
    // block + lg size
    expect(dropdown4.style.width).toEqual('100%')
    expect(className4).not.toContain('input-sm')
    expect(className4).toContain('input-lg')
  })

  it('should be able to disable options', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options"/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3', disabled: true },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5', disabled: true },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    trigger.click()
    await nextTick()
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1')
    expect(_.isEqual(wrapper.vm.selected, [1])).toBeTruthy()
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2')
    expect(_.isEqual(wrapper.vm.selected, [1, 2])).toBeTruthy()
    // select option 3 (should not work)
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2')
    expect(_.isEqual(wrapper.vm.selected, [1, 2])).toBeTruthy()
    // select option 4
    dropdown.querySelectorAll('li')[3].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option4')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 4])).toBeTruthy()
    // select option 5 (should not work)
    dropdown.querySelectorAll('li')[4].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option4')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 4])).toBeTruthy()
  })

  it('should be able to disable dropdown', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" disabled/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    expect(
      dropdown.querySelector('.form-control').getAttribute('disabled')
    ).toEqual('disabled')
    expect(dropdown.className).not.toContain('open')
    trigger.click()
    await nextTick()
    expect(dropdown.className).not.toContain('open')
  })

  it('should be able to collapse selected', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" collapse-selected/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.toContain('open')
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
    expect(display.textContent).toEqual('Select...')
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1')
    expect(_.isEqual(wrapper.vm.selected, [1])).toBeTruthy()
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, +1')
    expect(_.isEqual(wrapper.vm.selected, [1, 2])).toBeTruthy()
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, +2')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3])).toBeTruthy()
    // select option 4
    dropdown.querySelectorAll('li')[3].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, +3')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4])).toBeTruthy()
    // select option 5
    dropdown.querySelectorAll('li')[4].click()
    await nextTick()
    expect(display.textContent).toEqual('Option1, +4')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4, 5])).toBeTruthy()
    // unselect option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(display.textContent).toEqual('Option2, +3')
    expect(_.isEqual(wrapper.vm.selected, [2, 3, 4, 5])).toBeTruthy()
    // unselect option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(display.textContent).toEqual('Option3, +2')
    expect(_.isEqual(wrapper.vm.selected, [3, 4, 5])).toBeTruthy()
    // unselect option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(display.textContent).toEqual('Option4, +1')
    expect(_.isEqual(wrapper.vm.selected, [4, 5])).toBeTruthy()
    // unselect option 4
    dropdown.querySelectorAll('li')[3].click()
    await nextTick()
    expect(display.textContent).toEqual('Option5')
    expect(_.isEqual(wrapper.vm.selected, [5])).toBeTruthy()
    // unselect option 5
    dropdown.querySelectorAll('li')[4].click()
    await nextTick()
    expect(display.textContent).toEqual('Select...')
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
  })

  it('should be able to filter options', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" filterable/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const searchInput = dropdown.querySelector('.form-control.input-sm')
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    // + 1 is the search box
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
    searchInput.value = 'option'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
    searchInput.value = '1'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).toEqual('Option1')
    searchInput.value = 'Option1'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).toEqual('Option1')
    searchInput.value = '5'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).toEqual('Option5')
    searchInput.value = ''
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
  })

  it('should be able to use custom filter placeholder', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" filterable filter-placeholder="someplaceholder..."/>
</div>`,
      {
        selected: [],
        options: [{ value: 1, label: 'Option1' }],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const searchInput = dropdown.querySelector('.form-control.input-sm')
    expect(searchInput.getAttribute('placeholder')).toEqual(
      'someplaceholder...'
    )
  })

  it('should be able to use custom labelKey and valueKey', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options" filterable label-key="someLabel" value-key="someVal"/>
</div>`,
      {
        selected: [],
        options: [
          { someVal: 1, someLabel: 'Option1' },
          { someVal: 2, someLabel: 'Option2' },
          { someVal: 3, someLabel: 'Option3' },
          { someVal: 4, someLabel: 'Option4' },
          { someVal: 5, someLabel: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const searchInput = dropdown.querySelector('.form-control.input-sm')
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    // + 1 is the search box
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
    searchInput.value = 'option'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
    searchInput.value = '1'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).toEqual('Option1')
    searchInput.value = 'Option1'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).toEqual('Option1')
    searchInput.value = '5'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).toEqual('Option5')
    searchInput.value = ''
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
  })

  it('should be ok if value not present in options', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options"/>
</div>`,
      {
        selected: [5],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
        ],
      }
    )
    await nextTick()
    expect(
      wrapper.element.querySelectorAll('.dropdown-toggle > div')[1].textContent
    ).toEqual('5')
  })

  it('should be able use custom filter function', async () => {
    const wrapper = createWrapper(
      '<multi-select v-model="selected" :options="options" filterable :filter-function="filterFunction"/>',
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      },
      {
        methods: {
          filterFunction(query) {
            // always return option 1 and 5
            return [this.options[0], this.options[4]]
          },
        },
      }
    )
    const dropdown = wrapper.element
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const searchInput = dropdown.querySelector('.form-control.input-sm')
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    // + 1 is the search box
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
    searchInput.value = 'option'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(2 + 1)
    expect(dropdown.querySelectorAll('li > a')[0].textContent).toEqual(
      'Option1'
    )
    expect(dropdown.querySelectorAll('li > a')[1].textContent).toEqual(
      'Option5'
    )
    searchInput.value = '3'
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(2 + 1)
    expect(dropdown.querySelectorAll('li > a')[0].textContent).toEqual(
      'Option1'
    )
    expect(dropdown.querySelectorAll('li > a')[1].textContent).toEqual(
      'Option5'
    )
    searchInput.value = ''
    triggerEvent(searchInput, 'input')
    await nextTick()
    expect(dropdown.querySelectorAll('li').length).toEqual(5 + 1)
  })

  it('should be able to use keyboard nav & select', async () => {
    const wrapper = createWrapper(
      `<div>
<multi-select v-model="selected" :options="options"/>
</div>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = wrapper.find('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.toContain('open')
    // nothing happens
    triggerEvent(trigger, 'keydown.up')
    await nextTick()
    // nothing happens
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    // open dropdown
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(dropdown.className).toContain('open')
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
    // nothing happens
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
    // select option 1
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[0].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Option1')
    expect(_.isEqual(wrapper.vm.selected, [1])).toBeTruthy()
    // select option 2
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[1].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2')
    expect(_.isEqual(wrapper.vm.selected, [1, 2])).toBeTruthy()
    // select option 3
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[2].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option3')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3])).toBeTruthy()
    // select option 4
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[3].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Option1, Option2, Option3, Option4')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4])).toBeTruthy()
    // select option 5
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[4].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual(
      'Option1, Option2, Option3, Option4, Option5'
    )
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4, 5])).toBeTruthy()
    // unselect option 1
    // go next (option 1)
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[0].className).toContain('active')
    // go prev (option 5)
    triggerEvent(trigger, 'keydown.up')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[4].className).toContain('active')
    // go prev (option 4)
    triggerEvent(trigger, 'keydown.up')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[3].className).toContain('active')
    // go next (option 5)
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[4].className).toContain('active')
    // go next (option 1)
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[0].className).toContain('active')
    // todo: why failed?
    // // unselect option 1
    // await triggerEvent(trigger, 'keydown.enter')
    // expect(display.textContent).toEqual('Option2, Option3, Option4, Option5')
    // expect(_.isEqual(wrapper.vm.selected, [2, 3, 4, 5])).toBeTruthy()
    // // unselect option 2
    // triggerEvent(trigger, 'keydown.down')
    // await nextTick()
    // expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    // expect(dropdown.querySelectorAll('li')[1].className).toContain('active')
    // triggerEvent(trigger, 'keydown.enter')
    // await nextTick()
    // expect(display.textContent).toEqual('Option3, Option4, Option5')
    // expect(_.isEqual(wrapper.vm.selected, [3, 4, 5])).toBeTruthy()
    // // unselect option 3
    // triggerEvent(trigger, 'keydown.down')
    // await nextTick()
    // expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    // expect(dropdown.querySelectorAll('li')[2].className).toContain('active')
    // triggerEvent(trigger, 'keydown.enter')
    // await nextTick()
    // expect(display.textContent).toEqual('Option4, Option5')
    // expect(_.isEqual(wrapper.vm.selected, [4, 5])).toBeTruthy()
    // // unselect option 4
    // triggerEvent(trigger, 'keydown.down')
    // await nextTick()
    // expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    // expect(dropdown.querySelectorAll('li')[3].className).toContain('active')
    // triggerEvent(trigger, 'keydown.enter')
    // await nextTick()
    // expect(display.textContent).toEqual('Option5')
    // expect(_.isEqual(wrapper.vm.selected, [5])).toBeTruthy()
    // // unselect option 5
    // triggerEvent(trigger, 'keydown.down')
    // await nextTick()
    // expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    // expect(dropdown.querySelectorAll('li')[4].className).toContain('active')
    // triggerEvent(trigger, 'keydown.enter')
    // await nextTick()
    // expect(display.textContent).toEqual('Select...')
    // expect(_.isEmpty(wrapper.vm.selected)).toBeTruthy()
  })

  it('should behave like single toggle while limit=1', async () => {
    const wrapper = createWrapper(
      '<multi-select v-model="selected" :options="options" :limit="1"/>',
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element
    const trigger = dropdown.querySelector('.dropdown-toggle')
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await nextTick()
    expect(_.isEqual(wrapper.vm.selected, [1])).toBeTruthy()
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await nextTick()
    expect(_.isEqual(wrapper.vm.selected, [2])).toBeTruthy()
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(_.isEqual(wrapper.vm.selected, [3])).toBeTruthy()
    // un-select option 3
    dropdown.querySelectorAll('li')[2].click()
    await nextTick()
    expect(_.isEqual(wrapper.vm.selected, [])).toBeTruthy()
  })

  it('should be able to display grouped options', async () => {
    const wrapper = createWrapper(
      '<div><multi-select v-model="selected" :options="options"/></div>',
      {
        selected: [],
        options: [
          { value: 1, label: 'Apple', group: 'Fruit' },
          { value: 2, label: 'Banana', group: 'Fruit' },
          { value: 3, label: 'Orange', group: 'Fruit' },
          { value: 4, label: 'Red', group: 'Color' },
          { value: 5, label: 'Green', group: 'Color' },
        ],
      }
    )
    const dropdown = wrapper.element.querySelector('.dropdown')
    const trigger = wrapper.find('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.toContain('open')
    expect(dropdown.querySelectorAll('.dropdown-header').length).toEqual(2)
    expect(
      dropdown.querySelectorAll('.dropdown-header')[0].textContent
    ).toEqual('Fruit')
    expect(
      dropdown.querySelectorAll('.dropdown-header')[1].textContent
    ).toEqual('Color')
    // open dropdown
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    // select option 1
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[1].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Apple')
    expect(_.isEqual(wrapper.vm.selected, [1])).toBeTruthy()
    // select option 2
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[2].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Apple, Banana')
    expect(_.isEqual(wrapper.vm.selected, [1, 2])).toBeTruthy()
    // select option 3
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[3].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Apple, Banana, Orange')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3])).toBeTruthy()
    // select option 4
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[5].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Apple, Banana, Orange, Red')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4])).toBeTruthy()
    // select option 5
    triggerEvent(trigger, 'keydown.down')
    await nextTick()
    expect(dropdown.querySelectorAll('li.active').length).toEqual(1)
    expect(dropdown.querySelectorAll('li')[6].className).toContain('active')
    triggerEvent(trigger, 'keydown.enter')
    await nextTick()
    expect(display.textContent).toEqual('Apple, Banana, Orange, Red, Green')
    expect(_.isEqual(wrapper.vm.selected, [1, 2, 3, 4, 5])).toBeTruthy()
  })

  it('should be able to use option slot', async () => {
    const wrapper = createWrapper(
      `
    <multi-select v-model="selected" :options="options">
      <template v-slot:option="slotProps">
        <i>{{ slotProps.item.label }}</i>
      </template>
    </multi-select>`,
      {
        selected: [],
        options: [
          { value: 1, label: 'Option1' },
          { value: 2, label: 'Option2' },
          { value: 3, label: 'Option3' },
          { value: 4, label: 'Option4' },
          { value: 5, label: 'Option5' },
        ],
      }
    )
    const dropdown = wrapper.element
    const trigger = dropdown.querySelector('.dropdown-toggle')
    trigger.click()
    await nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li a i').length).toEqual(5)
  })
})
