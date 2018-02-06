import Vue from 'vue'
import $ from 'jquery'
import MultiSelectDoc from '@docs/pages/components/MultiSelect.md'
import _ from 'lodash'
// import utils from '../utils'

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
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[0]
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
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[0]
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
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[0]
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
    const display = dropdown.querySelectorAll('.dropdown-toggle > div')[0]
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
})
