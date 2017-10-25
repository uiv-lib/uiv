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

  it('should be able to disappear Boundary link', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.boundaryLinks = true
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let first = pagination.querySelector('[data-action="first"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(first).to.exist
    _vm.boundaryLinks = false
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    first = pagination.querySelector('[data-action="first"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(first).to.not.exist
    expect(afterLength).to.equal(beforeLength - 2)
  })

  it('should be able to appear Boundary link', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.boundaryLinks = false
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let first = pagination.querySelector('[data-action="first"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(first).to.not.exist
    _vm.boundaryLinks = true
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    first = pagination.querySelector('[data-action="first"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(first).to.exist
    expect(afterLength).to.equal(beforeLength + 2)
  })

  it('should be able to disappear direction link', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.directionLinks = true
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let prePage = pagination.querySelector('[data-action="prev-page"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(prePage).to.exist
    _vm.directionLinks = false
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    prePage = pagination.querySelector('[data-action="prev-page"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(prePage).to.not.exist
    expect(afterLength).to.equal(beforeLength - 2)
  })

  it('should be able to appear direction link', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.directionLinks = false
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let prePage = pagination.querySelector('[data-action="prev-page"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(prePage).to.not.exist
    _vm.directionLinks = true
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    prePage = pagination.querySelector('[data-action="prev-page"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(prePage).to.exist
    expect(afterLength).to.equal(beforeLength + 2)
  })

  it('should be able to change current page', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.currentPage = 1
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let currentPageElement = pagination.querySelector('li.active a')
    expect(Number(currentPageElement.text)).to.equal(_vm.currentPage)
    _vm.currentPage = 6
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    currentPageElement = pagination.querySelector('li.active a')
    expect(Number(currentPageElement.text)).to.equal(_vm.currentPage)
  })

  it('should be able to change size', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.size = ''
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    expect(pagination.className).to.equal('pagination')
    _vm.size = 'lg'
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    expect(pagination.className).to.equal('pagination pagination-lg')
    _vm.size = 'sm'
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    expect(pagination.className).to.equal('pagination pagination-sm')
  })

  it('should be able to change total page', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.totalSize = 18
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let lastBtn = pagination.querySelector('[data-action="last"]')
    lastBtn.click()
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalSize)
    _vm.totalSize = 100
    await vm.$nextTick()
    lastBtn.click()
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalSize)
  })

  it('should be able to go to first page', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.totalSize = 18
    _vm.currentPage = 18
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let lastBtn = pagination.querySelector('[data-action="last"]')
    lastBtn.click()
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalSize)
    let firstBtn = pagination.querySelector('[data-action="first"]')
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
    let pagination = vm.$el.querySelector('ul.pagination')
    let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(_vm.totalSize - _vm.maxSize + 1)
    _vm.currentPage = 12
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(_vm.currentPage - _vm.maxSize + 1)
  })

  it('should be go to next group', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.totalSize = 13
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let nextGroupBtn = pagination.querySelector('[data-action="next-group"]')
    let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(1)
    nextGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(1 + _vm.maxSize)
    nextGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(_vm.totalSize - _vm.maxSize + 1)
  })

  it('should be go to perv group', async () => {
    let _vm = vm.$refs['pagination-example']
    _vm.totalSize = 13
    _vm.currentPage = 12
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let prevGroupBtn = pagination.querySelector('[data-action="prev-group"]')
    let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(_vm.totalSize - _vm.maxSize + 1)
    prevGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(_vm.totalSize - _vm.maxSize * 2 + 1)
    prevGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(1)
  })
})
