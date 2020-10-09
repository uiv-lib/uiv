import $ from 'jquery'
import { createVm, destroyVm, triggerEvent } from '../utils'

describe('Pagination', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to hide boundary links', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage"/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    await vm.$nextTick()
    const pagination = vm.$el.querySelector('.pagination')
    const first = pagination.querySelector('[aria-label="First"]')
    const last = pagination.querySelector('[aria-label="Last"]')
    expect(first).to.not.exist
    expect(last).to.not.exist
  })

  it('should be able to show boundary links', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage" boundary-links/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    const pagination = vm.$el.querySelector('.pagination')
    const first = pagination.querySelector('[aria-label="First"]')
    const last = pagination.querySelector('[aria-label="Last"]')
    expect(first).to.exist
    expect(last).to.exist
  })

  it('should be able to hide direction links', async () => {
    vm = createVm(`<section>
    <pagination v-model="currentPage" :total-page="totalPage"/>
    <pagination v-model="currentPage" :total-page="totalPage" :direction-links="false"/>
  </section>`, {
      totalPage: 18,
      currentPage: 1
    })
    await vm.$nextTick()
    const pagination = vm.$el.querySelectorAll('ul.pagination')[1]
    const pre = pagination.querySelector('[aria-label="Previous"]')
    const next = pagination.querySelector('[aria-label="Next"]')
    expect(pre).to.not.exist
    expect(next).to.not.exist
  })

  it('should be able to show direction links', async () => {
    vm = createVm(`<section>
    <pagination v-model="currentPage" :total-page="totalPage"/>
    <pagination v-model="currentPage" :total-page="totalPage" :direction-links="false"/>
  </section>`, {
      totalPage: 18,
      currentPage: 1
    })
    await vm.$nextTick()
    const pagination = vm.$el.querySelectorAll('ul.pagination')[0]
    const pre = pagination.querySelector('[aria-label="Previous"]')
    const next = pagination.querySelector('[aria-label="Next"]')
    expect(pre).to.exist
    expect(next).to.exist
  })

  it('should be able to change current page', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage"/></div>', {
      totalPage: 18,
      currentPage: 1
    })
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
    vm = createVm(`<section>
    <pagination v-model="currentPage" :total-page="totalPage" size="lg"/>
    <pagination v-model="currentPage" :total-page="totalPage"/>
    <pagination v-model="currentPage" :total-page="totalPage" size="sm"/>
  </section>`, {
      totalPage: 18,
      currentPage: 1
    })
    await vm.$nextTick()
    expect(vm.$el.querySelectorAll('.pagination')[0].className).to.equal('pagination pagination-lg')
    expect(vm.$el.querySelectorAll('.pagination')[1].className).to.equal('pagination')
    expect(vm.$el.querySelectorAll('.pagination')[2].className).to.equal('pagination pagination-sm')
  })

  it('should be able to change alignment', async () => {
    vm = createVm(`<section>
    <pagination v-model="currentPage" :total-page="totalPage"/>
    <pagination v-model="currentPage" :total-page="totalPage" align="center"/>
    <pagination v-model="currentPage" :total-page="totalPage" align="right"/>
  </section>`, {
      totalPage: 18,
      currentPage: 1
    })
    await vm.$nextTick()
    expect(vm.$el.querySelectorAll('nav')[0].className).to.equal('')
    expect(vm.$el.querySelectorAll('nav')[1].className).to.equal('text-center')
    expect(vm.$el.querySelectorAll('nav')[2].className).to.equal('text-right')
  })

  it('should be able to change total page', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage" boundary-links/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    await vm.$nextTick()
    const pagination = vm.$el.querySelector('ul.pagination')
    const lastBtn = pagination.querySelector('[aria-label="Last"]')
    triggerEvent(lastBtn, 'click')
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(vm.totalPage)
    vm.totalPage = 100
    await vm.$nextTick()
    triggerEvent(lastBtn, 'click')
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(vm.totalPage)
  })

  it('should be able to go to first page', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage" boundary-links/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    vm.currentPage = 18
    await vm.$nextTick()
    const pagination = vm.$el.querySelector('ul.pagination')
    const lastBtn = pagination.querySelector('[aria-label="Last"]')
    triggerEvent(lastBtn, 'click')
    await vm.$nextTick()
    let activeBtn = pagination.querySelector('.active a')
    expect(Number(activeBtn.text)).to.equal(vm.totalPage)
    const firstBtn = pagination.querySelector('[aria-label="First"]')
    triggerEvent(firstBtn, 'click')
    await vm.$nextTick()
    activeBtn = pagination.querySelector('.active a')
    expect(vm.currentPage).to.equal(1)
    expect(Number(activeBtn.text)).to.equal(vm.currentPage)
  })

  it('last group has max size item', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage"/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    vm.currentPage = 18
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(vm.totalPage - 5 + 1)
    vm.currentPage = 12
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(vm.currentPage - 5 + 1)
  })

  it('should be go to next group', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage"/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    vm.totalPage = 13
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    const nextGroupBtn = pagination.querySelector('[aria-label="Next group"]')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1)
    triggerEvent(nextGroupBtn, 'click')
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1 + 5)
    triggerEvent(nextGroupBtn, 'click')
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(vm.totalPage - 5 + 1)
  })

  it('should be go to perv group', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage"/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    vm.totalPage = 13
    vm.currentPage = 12
    await vm.$nextTick()
    let pagination = vm.$el.querySelector('ul.pagination')
    const prevGroupBtn = pagination.querySelector('[aria-label="Previous group"]')
    let startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(vm.totalPage - 5 + 1)
    triggerEvent(prevGroupBtn, 'click')
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(vm.totalPage - 5 * 2 + 1)
    triggerEvent(prevGroupBtn, 'click')
    await vm.$nextTick()
    pagination = vm.$el.querySelector('ul.pagination')
    startBtn = $(pagination).find('a:not([aria-label])').get(0)
    expect(Number(startBtn.text)).to.equal(1)
  })

  it('should be able to disable component', async () => {
    vm = createVm('<div><pagination v-model="currentPage" :total-page="totalPage" disabled/></div>', {
      totalPage: 18,
      currentPage: 1
    })
    await vm.$nextTick()
    const pagination = vm.$el.querySelector('ul.pagination')
    // all btns has disabled class
    expect(pagination.querySelectorAll('li').length).to.equal(pagination.querySelectorAll('.disabled').length)
    expect(pagination.querySelector('.active > a').textContent).to.equal('1')
    // all btns function are disabled
    const btns = pagination.querySelectorAll('li > a')
    for (let i = 0; i < btns.length; i++) {
      btns[i].click()
      await vm.$nextTick()
      expect(pagination.querySelector('.active > a').textContent).to.equal('1')
    }
  })
})
