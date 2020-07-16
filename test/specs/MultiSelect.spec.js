import Vue from 'vue'
import $ from 'jquery'
import MultiSelectDoc from '@docs/pages/components/MultiSelect.md'
import _ from 'lodash'
import * as utils from '../utils'

describe('MultiSelect', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(MultiSelectDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to open dropdown and select options', async () => {
    const _vm = vm.$refs['multi-select-example']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.contain('open')
    trigger.click()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(_.isEmpty(_vm.selected)).to.be.true
    expect(display.textContent).to.equal('Select...')
    expect(dropdown.querySelectorAll('li > a')[0].textContent).to.equal('Option1')
    expect(dropdown.querySelectorAll('li > a')[1].textContent).to.equal('Option2')
    expect(dropdown.querySelectorAll('li > a')[2].textContent).to.equal('Option3')
    expect(dropdown.querySelectorAll('li > a')[3].textContent).to.equal('Option4')
    expect(dropdown.querySelectorAll('li > a')[4].textContent).to.equal('Option5')
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1')
    expect(_.isEqual(_vm.selected, [1])).to.be.true
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2')
    expect(_.isEqual(_vm.selected, [1, 2])).to.be.true
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3')
    expect(_.isEqual(_vm.selected, [1, 2, 3])).to.be.true
    // select option 4
    dropdown.querySelectorAll('li')[3].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3, Option4')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4])).to.be.true
    // select option 5
    dropdown.querySelectorAll('li')[4].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3, Option4, Option5')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4, 5])).to.be.true
    // unselect option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option2, Option3, Option4, Option5')
    expect(_.isEqual(_vm.selected, [2, 3, 4, 5])).to.be.true
    // unselect option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option3, Option4, Option5')
    expect(_.isEqual(_vm.selected, [3, 4, 5])).to.be.true
    // unselect option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option4, Option5')
    expect(_.isEqual(_vm.selected, [4, 5])).to.be.true
    // unselect option 4
    dropdown.querySelectorAll('li')[3].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option5')
    expect(_.isEqual(_vm.selected, [5])).to.be.true
    // unselect option 5
    dropdown.querySelectorAll('li')[4].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Select...')
    expect(_.isEmpty(_vm.selected)).to.be.true
  })

  it('should be able to limit selected length', async () => {
    const _vm = vm.$refs['multi-select-limit']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    trigger.click()
    await vm.$nextTick()
    expect(_.isEmpty(_vm.selected)).to.be.true
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1')
    expect(_.isEqual(_vm.selected, [1])).to.be.true
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2')
    expect(_.isEqual(_vm.selected, [1, 2])).to.be.true
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3')
    expect(_.isEqual(_vm.selected, [1, 2, 3])).to.be.true
    // select option 4 (should not work)
    dropdown.querySelectorAll('li')[3].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3')
    expect(_.isEqual(_vm.selected, [1, 2, 3])).to.be.true
    // select option 5 (should not work)
    dropdown.querySelectorAll('li')[4].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3')
    expect(_.isEqual(_vm.selected, [1, 2, 3])).to.be.true
    // unselect option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option2, Option3')
    expect(_.isEqual(_vm.selected, [2, 3])).to.be.true
    // unselect option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option3')
    expect(_.isEqual(_vm.selected, [3])).to.be.true
    // unselect option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Select...')
    expect(_.isEmpty(_vm.selected)).to.be.true
  })

  it('should be able to render optional sizes', async () => {
    const _vm = vm.$refs['multi-select-sizes']
    const _el = _vm.$el
    const dropdown1 = _el.querySelectorAll('.dropdown')[0]
    const dropdown2 = _el.querySelectorAll('.dropdown')[1]
    const dropdown3 = _el.querySelectorAll('.dropdown')[2]
    const dropdown4 = _el.querySelectorAll('.dropdown')[3]
    const className1 = dropdown1.querySelector('.form-control').className
    const className2 = dropdown2.querySelector('.form-control').className
    const className3 = dropdown3.querySelector('.form-control').className
    const className4 = dropdown4.querySelector('.form-control').className
    // sm size
    expect(dropdown1.style.width).to.equal('')
    expect(className1).to.contain('input-sm')
    expect(className1).not.contain('input-lg')
    // normal
    expect(dropdown2.style.width).to.equal('')
    expect(className2).not.contain('input-sm')
    expect(className2).not.contain('input-lg')
    // lg size
    expect(dropdown3.style.width).to.equal('')
    expect(className3).not.contain('input-sm')
    expect(className3).to.contain('input-lg')
    // block + lg size
    expect(dropdown4.style.width).to.equal('100%')
    expect(className4).not.contain('input-sm')
    expect(className4).to.contain('input-lg')
  })

  it('should be able to disable options', async () => {
    const _vm = vm.$refs['multi-select-disabled-options']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    trigger.click()
    await vm.$nextTick()
    expect(_.isEmpty(_vm.selected)).to.be.true
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1')
    expect(_.isEqual(_vm.selected, [1])).to.be.true
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2')
    expect(_.isEqual(_vm.selected, [1, 2])).to.be.true
    // select option 3 (should not work)
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2')
    expect(_.isEqual(_vm.selected, [1, 2])).to.be.true
    // select option 4
    dropdown.querySelectorAll('li')[3].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option4')
    expect(_.isEqual(_vm.selected, [1, 2, 4])).to.be.true
    // select option 5 (should not work)
    dropdown.querySelectorAll('li')[4].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option4')
    expect(_.isEqual(_vm.selected, [1, 2, 4])).to.be.true
  })

  it('should be able to disable dropdown', async () => {
    const _vm = vm.$refs['multi-select-disabled-select']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    expect(dropdown.querySelector('.form-control').getAttribute('disabled')).to.equal('disabled')
    expect(dropdown.className).not.contain('open')
    trigger.click()
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should be able to collapse selected', async () => {
    const _vm = vm.$refs['multi-select-collapse-selected']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.contain('open')
    trigger.click()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(_.isEmpty(_vm.selected)).to.be.true
    expect(display.textContent).to.equal('Select...')
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1')
    expect(_.isEqual(_vm.selected, [1])).to.be.true
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, +1')
    expect(_.isEqual(_vm.selected, [1, 2])).to.be.true
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, +2')
    expect(_.isEqual(_vm.selected, [1, 2, 3])).to.be.true
    // select option 4
    dropdown.querySelectorAll('li')[3].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, +3')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4])).to.be.true
    // select option 5
    dropdown.querySelectorAll('li')[4].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, +4')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4, 5])).to.be.true
    // unselect option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option2, +3')
    expect(_.isEqual(_vm.selected, [2, 3, 4, 5])).to.be.true
    // unselect option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option3, +2')
    expect(_.isEqual(_vm.selected, [3, 4, 5])).to.be.true
    // unselect option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option4, +1')
    expect(_.isEqual(_vm.selected, [4, 5])).to.be.true
    // unselect option 4
    dropdown.querySelectorAll('li')[3].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option5')
    expect(_.isEqual(_vm.selected, [5])).to.be.true
    // unselect option 5
    dropdown.querySelectorAll('li')[4].click()
    await vm.$nextTick()
    expect(display.textContent).to.equal('Select...')
    expect(_.isEmpty(_vm.selected)).to.be.true
  })

  it('should be able to filter options', async () => {
    const _vm = vm.$refs['multi-select-filterable']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const searchInput = dropdown.querySelector('.form-control.input-sm')
    trigger.click()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    // + 1 is the search box
    expect(dropdown.querySelectorAll('li').length).to.equal(5 + 1)
    searchInput.value = 'option'
    utils.triggerEvent(searchInput, 'input')
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(5 + 1)
    searchInput.value = '1'
    utils.triggerEvent(searchInput, 'input')
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).to.equal('Option1')
    searchInput.value = 'Option1'
    utils.triggerEvent(searchInput, 'input')
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).to.equal('Option1')
    searchInput.value = '5'
    utils.triggerEvent(searchInput, 'input')
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(1 + 1)
    expect(dropdown.querySelector('li > a').textContent).to.equal('Option5')
    searchInput.value = ''
    utils.triggerEvent(searchInput, 'input')
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(5 + 1)
  })

  it('should be able use custom filter function', async () => {
    const res = Vue.compile('<multi-select v-model="selected" :options="options" filterable :filter-function="filterFunction"/>')
    const _vm = new Vue({
      data () {
        return {
          selected: [],
          options: [
            {value: 1, label: 'Option1'},
            {value: 2, label: 'Option2'},
            {value: 3, label: 'Option3'},
            {value: 4, label: 'Option4'},
            {value: 5, label: 'Option5'}
          ]
        }
      },
      methods: {
        filterFunction (query) {
          // always return option 1 and 5
          return [this.options[0], this.options[4]]
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const dropdown = _vm.$el
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const searchInput = dropdown.querySelector('.form-control.input-sm')
    trigger.click()
    await _vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    // + 1 is the search box
    expect(dropdown.querySelectorAll('li').length).to.equal(5 + 1)
    searchInput.value = 'option'
    utils.triggerEvent(searchInput, 'input')
    await _vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(2 + 1)
    expect(dropdown.querySelectorAll('li > a')[0].textContent).to.equal('Option1')
    expect(dropdown.querySelectorAll('li > a')[1].textContent).to.equal('Option5')
    searchInput.value = '3'
    utils.triggerEvent(searchInput, 'input')
    await _vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(2 + 1)
    expect(dropdown.querySelectorAll('li > a')[0].textContent).to.equal('Option1')
    expect(dropdown.querySelectorAll('li > a')[1].textContent).to.equal('Option5')
    searchInput.value = ''
    utils.triggerEvent(searchInput, 'input')
    await _vm.$nextTick()
    expect(dropdown.querySelectorAll('li').length).to.equal(5 + 1)
    _vm.$destroy()
  })

  it('should be able to use keyboard nav & select', async () => {
    const _vm = vm.$refs['multi-select-example']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.contain('open')
    // nothing happens
    utils.triggerKey(trigger, utils.keyCodes.up)
    await vm.$nextTick()
    // nothing happens
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    // open dropdown
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(_.isEmpty(_vm.selected)).to.be.true
    // nothing happens
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(_.isEmpty(_vm.selected)).to.be.true
    // select option 1
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[0].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1')
    expect(_.isEqual(_vm.selected, [1])).to.be.true
    // select option 2
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[1].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2')
    expect(_.isEqual(_vm.selected, [1, 2])).to.be.true
    // select option 3
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[2].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3')
    expect(_.isEqual(_vm.selected, [1, 2, 3])).to.be.true
    // select option 4
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[3].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3, Option4')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4])).to.be.true
    // select option 5
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[4].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option1, Option2, Option3, Option4, Option5')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4, 5])).to.be.true
    // unselect option 1
    // go next (option 1)
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[0].className).to.contain('active')
    // go prev (option 5)
    utils.triggerKey(trigger, utils.keyCodes.up)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[4].className).to.contain('active')
    // go prev (option 4)
    utils.triggerKey(trigger, utils.keyCodes.up)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[3].className).to.contain('active')
    // go next (option 5)
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[4].className).to.contain('active')
    // go next (option 1)
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[0].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option2, Option3, Option4, Option5')
    expect(_.isEqual(_vm.selected, [2, 3, 4, 5])).to.be.true
    // unselect option 2
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[1].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option3, Option4, Option5')
    expect(_.isEqual(_vm.selected, [3, 4, 5])).to.be.true
    // unselect option 3
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[2].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option4, Option5')
    expect(_.isEqual(_vm.selected, [4, 5])).to.be.true
    // unselect option 4
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[3].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Option5')
    expect(_.isEqual(_vm.selected, [5])).to.be.true
    // unselect option 5
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[4].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Select...')
    expect(_.isEmpty(_vm.selected)).to.be.true
  })

  it('should behave like single toggle while limit=1', async () => {
    const res = Vue.compile('<multi-select v-model="selected" :options="options" :limit="1"/>')
    const _vm = new Vue({
      data () {
        return {
          selected: [],
          options: [
            {value: 1, label: 'Option1'},
            {value: 2, label: 'Option2'},
            {value: 3, label: 'Option3'},
            {value: 4, label: 'Option4'},
            {value: 5, label: 'Option5'}
          ]
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    const dropdown = _vm.$el
    const trigger = dropdown.querySelector('.dropdown-toggle')
    trigger.click()
    await _vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    // select option 1
    dropdown.querySelectorAll('li')[0].click()
    await vm.$nextTick()
    expect(_.isEqual(_vm.selected, [1])).to.be.true
    // select option 2
    dropdown.querySelectorAll('li')[1].click()
    await vm.$nextTick()
    expect(_.isEqual(_vm.selected, [2])).to.be.true
    // select option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(_.isEqual(_vm.selected, [3])).to.be.true
    // un-select option 3
    dropdown.querySelectorAll('li')[2].click()
    await vm.$nextTick()
    expect(_.isEqual(_vm.selected, [])).to.be.true
    _vm.$destroy()
  })

  it('should be able to display grouped options', async () => {
    const _vm = vm.$refs['multi-select-option-groups']
    const dropdown = _vm.$el.querySelector('.dropdown')
    const trigger = dropdown.querySelector('.dropdown-toggle')
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[1]
    expect(dropdown.className).not.contain('open')
    expect(dropdown.querySelectorAll('.dropdown-header').length).to.equal(2)
    expect(dropdown.querySelectorAll('.dropdown-header')[0].textContent).to.equal('Fruit')
    expect(dropdown.querySelectorAll('.dropdown-header')[1].textContent).to.equal('Color')
    // open dropdown
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    // select option 1
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[1].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Apple')
    expect(_.isEqual(_vm.selected, [1])).to.be.true
    // select option 2
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[2].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Apple, Banana')
    expect(_.isEqual(_vm.selected, [1, 2])).to.be.true
    // select option 3
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[3].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Apple, Banana, Orange')
    expect(_.isEqual(_vm.selected, [1, 2, 3])).to.be.true
    // select option 4
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[5].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Apple, Banana, Orange, Red')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4])).to.be.true
    // select option 5
    utils.triggerKey(trigger, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelectorAll('li.active').length).to.equal(1)
    expect(dropdown.querySelectorAll('li')[6].className).to.contain('active')
    utils.triggerKey(trigger, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(display.textContent).to.equal('Apple, Banana, Orange, Red, Green')
    expect(_.isEqual(_vm.selected, [1, 2, 3, 4, 5])).to.be.true
  })
})
