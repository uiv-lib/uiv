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
    vm.boundaryLinks = true
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let first = pagination.querySelector('[data-action="first"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(first).to.exist
    vm.boundaryLinks = false
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    first = pagination.querySelector('[data-action="first"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(first).to.not.exist
    expect(afterLength).to.equal(beforeLength - 2)
  })

  it('should be able to appear Boundary link', async () => {
    vm.boundaryLinks = false
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let first = pagination.querySelector('[data-action="first"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(first).to.not.exist
    vm.boundaryLinks = true
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    first = pagination.querySelector('[data-action="first"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(first).to.exist
    expect(afterLength).to.equal(beforeLength + 2)
  })

  it('should be able to disappear direction link', async () => {
    vm.directionLinks = true
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let prePage = pagination.querySelector('[data-action="prev-page"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(prePage).to.exist
    vm.directionLinks = false
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    prePage = pagination.querySelector('[data-action="prev-page"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(prePage).to.not.exist
    expect(afterLength).to.equal(beforeLength - 2)
  })

  it('should be able to appear direction link', async () => {
    vm.directionLinks = false
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let prePage = pagination.querySelector('[data-action="prev-page"]')
    let beforeLength = pagination.querySelectorAll('li').length
    expect(prePage).to.not.exist
    vm.directionLinks = true
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    prePage = pagination.querySelector('[data-action="prev-page"]')
    let afterLength = pagination.querySelectorAll('li').length
    expect(prePage).to.exist
    expect(afterLength).to.equal(beforeLength + 2)
  })

  it('should be able to change current page', async () => {
    vm.currentPage = 1
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let currentPageElement = pagination.querySelector('li.active a')
    expect(Number(currentPageElement.text)).to.equal(vm.currentPage)
    vm.currentPage = 6
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    currentPageElement = pagination.querySelector('li.active a')
    expect(Number(currentPageElement.text)).to.equal(vm.currentPage)
  })

  it('should be able to change size', async () => {
    vm.size = ''
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    expect(pagination.className).to.equal('pagination')
    vm.size = 'lg'
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    expect(pagination.className).to.equal('pagination pagination-lg')
    vm.size = 'sm'
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    expect(pagination.className).to.equal('pagination pagination-sm')
  })

  it('should be able to change total page', async () => {
    vm.totalSize = 18
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let lastBtn = pagination.querySelector('[data-action="last"]')
    lastBtn.click()
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(vm.totalSize)
    vm.totalSize = 100
    await vm.$nextTick()
    lastBtn.click()
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(vm.totalSize)
  })

  it('should be able to go to first page', async () => {
    vm.totalSize = 18
    vm.currentPage = 18
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let lastBtn = pagination.querySelector('[data-action="last"]')
    lastBtn.click()
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(vm.totalSize)
    let firstBtn = pagination.querySelector('[data-action="first"]')
    firstBtn.click()
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(vm.currentPage).to.equal(1)
    expect(Number(activeBtn.text)).to.equal(vm.currentPage)
  })

  it('last group has max size item', async () => {
    vm.currentPage = 18
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize + 1)
    vm.currentPage = 12
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(vm.currentPage - vm.maxSize + 1)
  })

  it('should be go to next group', async () => {
    vm.totalSize = 13
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let nextGroupBtn = pagination.querySelector('[data-action="next-group"]')
    let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(1)
    nextGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(1 + vm.maxSize)
    nextGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize + 1)
  })

  it('should be go to perv group', async () => {
    vm.totalSize = 13
    vm.currentPage = 12
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let prevGroupBtn = pagination.querySelector('[data-action="prev-group"]')
    let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize + 1)
    prevGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize * 2 + 1)
    prevGroupBtn.click()
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
    expect(Number(startBtn.text)).to.equal(1)
  })
})
