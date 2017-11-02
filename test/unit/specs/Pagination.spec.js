import Vue from 'vue'
import $ from 'jquery'
import PaginationDoc from '@docs/pages/components/Pagination.md'

describe('Pagination', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(PaginationDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to hide boundary links', async () => {
    let _vm = vm.$refs['pagination-example']
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('.pagination')
    let first = pagination.querySelector('[aria-label="First"]')
    let last = pagination.querySelector('[aria-label="Last"]')
    expect(first).to.not.exist
    expect(last).to.not.exist
  })

  it('should be able to show boundary links', async () => {
    let _vm = vm.$refs['pagination-boundary-links']
    let pagination = _vm.$el.querySelector('.pagination')
    let first = pagination.querySelector('[aria-label="First"]')
    let last = pagination.querySelector('[aria-label="Last"]')
    expect(first).to.exist
    expect(last).to.exist
  })

  it('should be able to hide direction links', async () => {
    let _vm = vm.$refs['pagination-direction-links']
    _vm.directionLinks = true
    await vm.$nextTick()
    let pagination = _vm.$el.querySelectorAll('ul.pagination')[1]
    let pre = pagination.querySelector('[aria-label="Previous"]')
    let next = pagination.querySelector('[aria-label="Next"]')
    expect(pre).to.not.exist
    expect(next).to.not.exist
  })

  it('should be able to show direction links', async () => {
    let _vm = vm.$refs['pagination-direction-links']
    _vm.directionLinks = true
    await vm.$nextTick()
    let pagination = _vm.$el.querySelectorAll('ul.pagination')[0]
    let pre = pagination.querySelector('[aria-label="Previous"]')
    let next = pagination.querySelector('[aria-label="Next"]')
    expect(pre).to.exist
    expect(next).to.exist
  })

  it('should be able to change current page', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.currentPage = 1
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    let currentPageElement = pagination.querySelector('li.active a')
    expect(Number(currentPageElement.text)).to.equal(_vm.currentPage)
    _vm.currentPage = 6
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    currentPageElement = pagination.querySelector('li.active a')
    expect(Number(currentPageElement.text)).to.equal(_vm.currentPage)
  })

  it('should be able to change size', async () => {
    let _vm = vm.$refs['pagination-sizing']
    await vm.$nextTick()
    expect(_vm.$el.querySelectorAll('.pagination')[0].className).to.equal('pagination pagination-lg')
    expect(_vm.$el.querySelectorAll('.pagination')[1].className).to.equal('pagination')
    expect(_vm.$el.querySelectorAll('.pagination')[2].className).to.equal('pagination pagination-sm')
  })

  it('should be able to change total page', async () => {
    let _vm = vm.$refs['pagination-boundary-links']
    _vm.totalPage = 18
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    let lastBtn = pagination.querySelector('[aria-label="Last"]')
    lastBtn.click()
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalPage)
    _vm.totalPage = 100
    await vm.$nextTick()
    lastBtn.click()
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalPage)
  })

  it('should be able to go to first page', async () => {
    let _vm = vm.$refs['pagination-boundary-links']
    _vm.totalPage = 18
    _vm.currentPage = 18
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    let lastBtn = pagination.querySelector('[aria-label="Last"]')
    lastBtn.click()
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalPage)
    let firstBtn = pagination.querySelector('[aria-label="First"]')
    firstBtn.click()
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(_vm.currentPage).to.equal(1)
    expect(Number(activeBtn.text)).to.equal(_vm.currentPage)
  })

  it('last group has max size item', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.currentPage = 18
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.totalPage - 5 + 1)
    _vm.currentPage = 12
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.currentPage - 5 + 1)
  })

  it('should be go to next group', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.totalPage = 13
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    let nextGroupBtn = pagination.querySelector('[aria-label="Next group"]')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1)
    nextGroupBtn.click()
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1 + 5)
    nextGroupBtn.click()
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.totalPage - 5 + 1)
  })

  it('should be go to perv group', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.totalPage = 13
    _vm.currentPage = 12
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    let prevGroupBtn = pagination.querySelector('[aria-label="Previous group"]')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.totalPage - 5 + 1)
    prevGroupBtn.click()
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.totalPage - 5 * 2 + 1)
    prevGroupBtn.click()
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1)
  })
})
