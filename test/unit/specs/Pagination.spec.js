import Vue from 'vue'
import $ from 'jquery'
import PaginationDoc from '@docs/pages/components/Pagination.md'
import utils from '../utils'

describe('Pagination', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(PaginationDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should be able to hide boundary links', async () => {
    const _vm = vm.$refs['pagination-example']
    await vm.$nextTick()
    const pagination = _vm.$el.querySelector('.pagination')
    const first = pagination.querySelector('[aria-label="First"]')
    const last = pagination.querySelector('[aria-label="Last"]')
    expect(first).to.not.exist
    expect(last).to.not.exist
  })

  it('should be able to show boundary links', async () => {
    const _vm = vm.$refs['pagination-boundary-links']
    const pagination = _vm.$el.querySelector('.pagination')
    const first = pagination.querySelector('[aria-label="First"]')
    const last = pagination.querySelector('[aria-label="Last"]')
    expect(first).to.exist
    expect(last).to.exist
  })

  it('should be able to hide direction links', async () => {
    const _vm = vm.$refs['pagination-direction-links']
    _vm.directionLinks = true
    await vm.$nextTick()
    const pagination = _vm.$el.querySelectorAll('ul.pagination')[1]
    const pre = pagination.querySelector('[aria-label="Previous"]')
    const next = pagination.querySelector('[aria-label="Next"]')
    expect(pre).to.not.exist
    expect(next).to.not.exist
  })

  it('should be able to show direction links', async () => {
    const _vm = vm.$refs['pagination-direction-links']
    _vm.directionLinks = true
    await vm.$nextTick()
    const pagination = _vm.$el.querySelectorAll('ul.pagination')[0]
    const pre = pagination.querySelector('[aria-label="Previous"]')
    const next = pagination.querySelector('[aria-label="Next"]')
    expect(pre).to.exist
    expect(next).to.exist
  })

  it('should be able to change current page', async () => {
    const _vm = vm.$refs['pagination-example']
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
    const _vm = vm.$refs['pagination-sizing']
    await vm.$nextTick()
    expect(_vm.$el.querySelectorAll('.pagination')[0].className).to.equal('pagination pagination-lg')
    expect(_vm.$el.querySelectorAll('.pagination')[1].className).to.equal('pagination')
    expect(_vm.$el.querySelectorAll('.pagination')[2].className).to.equal('pagination pagination-sm')
  })

  it('should be able to change total page', async () => {
    const _vm = vm.$refs['pagination-boundary-links']
    _vm.totalPage = 18
    await vm.$nextTick()
    const pagination = _vm.$el.querySelector('ul.pagination')
    const lastBtn = pagination.querySelector('[aria-label="Last"]')
    utils.triggerEvent(lastBtn, 'click')
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalPage)
    _vm.totalPage = 100
    await vm.$nextTick()
    utils.triggerEvent(lastBtn, 'click')
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalPage)
  })

  it('should be able to go to first page', async () => {
    const _vm = vm.$refs['pagination-boundary-links']
    _vm.totalPage = 18
    _vm.currentPage = 18
    await vm.$nextTick()
    const pagination = _vm.$el.querySelector('ul.pagination')
    const lastBtn = pagination.querySelector('[aria-label="Last"]')
    utils.triggerEvent(lastBtn, 'click')
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(_vm.totalPage)
    const firstBtn = pagination.querySelector('[aria-label="First"]')
    utils.triggerEvent(firstBtn, 'click')
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(_vm.currentPage).to.equal(1)
    expect(Number(activeBtn.text)).to.equal(_vm.currentPage)
  })

  it('last group has max size item', async () => {
    const _vm = vm.$refs['pagination-example']
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
    const _vm = vm.$refs['pagination-example']
    _vm.totalPage = 13
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    const nextGroupBtn = pagination.querySelector('[aria-label="Next group"]')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1)
    utils.triggerEvent(nextGroupBtn, 'click')
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1 + 5)
    utils.triggerEvent(nextGroupBtn, 'click')
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.totalPage - 5 + 1)
  })

  it('should be go to perv group', async () => {
    const _vm = vm.$refs['pagination-example']
    _vm.totalPage = 13
    _vm.currentPage = 12
    await vm.$nextTick()
    let pagination = _vm.$el.querySelector('ul.pagination')
    const prevGroupBtn = pagination.querySelector('[aria-label="Previous group"]')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.totalPage - 5 + 1)
    utils.triggerEvent(prevGroupBtn, 'click')
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(_vm.totalPage - 5 * 2 + 1)
    utils.triggerEvent(prevGroupBtn, 'click')
    await vm.$nextTick()
    pagination = _vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1)
  })
})
