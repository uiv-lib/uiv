import Vue from 'vue'
import PaginationDoc from '@/docs/pages/PaginationDoc.vue'
import i18n from '@/locale-docs'

describe('PaginationDoc', () => {
  let app

  beforeEach(() => {
    app = new Vue({
      i18n,
      template: '<PaginationDoc ref="doc"/>',
      components: {PaginationDoc}
    })
    app.$i18n.locale = 'en-US'
  })

  afterEach(() => {
    try {
      app.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should be able to disappear Boundary link', (done) => {
    let vm = app.$mount().$refs.doc
    vm.boundaryLinks = true
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let first = pagination.querySelector('[data-action="first"]')
      let beforeLength = pagination.querySelectorAll('li').length
      expect(first).to.exist
      vm.boundaryLinks = false
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        first = pagination.querySelector('[data-action="first"]')
        let afterLength = pagination.querySelectorAll('li').length
        expect(first).to.not.exist
        expect(afterLength).to.equal(beforeLength - 2)
        done()
      })
    })
  })

  it('should be able to appear Boundary link', (done) => {
    let vm = app.$mount().$refs.doc
    vm.boundaryLinks = false
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let first = pagination.querySelector('[data-action="first"]')
      let beforeLength = pagination.querySelectorAll('li').length
      expect(first).to.not.exist
      vm.boundaryLinks = true
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        first = pagination.querySelector('[data-action="first"]')
        let afterLength = pagination.querySelectorAll('li').length
        expect(first).to.exist
        expect(afterLength).to.equal(beforeLength + 2)
        done()
      })
    })
  })

  it('should be able to disappear direction link', (done) => {
    let vm = app.$mount().$refs.doc
    vm.directionLinks = true
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let prePage = pagination.querySelector('[data-action="prev-page"]')
      let beforeLength = pagination.querySelectorAll('li').length
      expect(prePage).to.exist
      vm.directionLinks = false
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        prePage = pagination.querySelector('[data-action="prev-page"]')
        let afterLength = pagination.querySelectorAll('li').length
        expect(prePage).to.not.exist
        expect(afterLength).to.equal(beforeLength - 2)
        done()
      })
    })
  })

  it('should be able to appear direction link', (done) => {
    let vm = app.$mount().$refs.doc
    vm.directionLinks = false
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let prePage = pagination.querySelector('[data-action="prev-page"]')
      let beforeLength = pagination.querySelectorAll('li').length
      expect(prePage).to.not.exist
      vm.directionLinks = true
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        prePage = pagination.querySelector('[data-action="prev-page"]')
        let afterLength = pagination.querySelectorAll('li').length
        expect(prePage).to.exist
        expect(afterLength).to.equal(beforeLength + 2)
        done()
      })
    })
  })

  it('should be able to change current page', (done) => {
    let vm = app.$mount().$refs.doc
    vm.currentPage = 1
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let currentPageElement = pagination.querySelector('li.active a')
      expect(Number(currentPageElement.text)).to.equal(vm.currentPage)
      vm.currentPage = 6
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        currentPageElement = pagination.querySelector('li.active a')
        expect(Number(currentPageElement.text)).to.equal(vm.currentPage)
        done()
      })
    })
  })

  it('should be able to change size', (done) => {
    let vm = app.$mount().$refs.doc
    vm.size = ''
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      expect(pagination.className).to.equal('pagination')
      vm.size = 'lg'
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        expect(pagination.className).to.equal('pagination pagination-lg')
        vm.size = 'sm'
        vm.$nextTick(() => {
          pagination = vm.$el.querySelector('ul.pagination')
          expect(pagination.className).to.equal('pagination pagination-sm')
          done()
        })
      })
    })
  })

  it('should be able to change total page', (done) => {
    let vm = app.$mount().$refs.doc
    vm.totalSize = 18
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let lastBtn = pagination.querySelector('[data-action="last"]')
      lastBtn.click()
      vm.$nextTick(() => {
        let activeBtn = pagination.querySelector('.active a')
        expect(Number(activeBtn.text)).to.equal(vm.totalSize)
        vm.totalSize = 100
        vm.$nextTick(() => {
          lastBtn.click()
          vm.$nextTick(() => {
            activeBtn = pagination.querySelector('.active a')
            expect(Number(activeBtn.text)).to.equal(vm.totalSize)
            done()
          })
        })
      })
    })
  })

  it('should be able to go to first page', (done) => {
    let vm = app.$mount().$refs.doc
    vm.totalSize = 18
    vm.currentPage = 18
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let lastBtn = pagination.querySelector('[data-action="last"]')
      lastBtn.click()
      vm.$nextTick(() => {
        let activeBtn = pagination.querySelector('.active a')
        expect(Number(activeBtn.text)).to.equal(vm.totalSize)
        let firstBtn = pagination.querySelector('[data-action="first"]')
        firstBtn.click()
        vm.$nextTick(() => {
          activeBtn = pagination.querySelector('.active a')
          expect(vm.currentPage).to.equal(1)
          expect(Number(activeBtn.text)).to.equal(vm.currentPage)
          done()
        })
      })
    })
  })

  it('last group has max size item', (done) => {
    let vm = app.$mount().$refs.doc
    vm.currentPage = 18
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
      expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize + 1)
      vm.currentPage = 12
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
        expect(Number(startBtn.text)).to.equal(vm.currentPage - vm.maxSize + 1)
        done()
      })
    })
  })

  it('should be go to next group', (done) => {
    let vm = app.$mount().$refs.doc
    vm.totalSize = 13
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let nextGroupBtn = pagination.querySelector('[data-action="next-group"]')
      let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
      expect(Number(startBtn.text)).to.equal(1)
      nextGroupBtn.click()
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
        expect(Number(startBtn.text)).to.equal(1 + vm.maxSize)
        nextGroupBtn.click()
        vm.$nextTick(() => {
          pagination = vm.$el.querySelector('ul.pagination')
          startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
          expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize + 1)
          done()
        })
      })
    })
  })

  it('should be go to perv group', (done) => {
    let vm = app.$mount().$refs.doc
    vm.totalSize = 13
    vm.currentPage = 12
    vm.$nextTick(() => {
      let pagination = vm.$el.querySelector('ul.pagination')
      let prevGroupBtn = pagination.querySelector('[data-action="prev-group"]')
      let startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
      expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize + 1)
      prevGroupBtn.click()
      vm.$nextTick(() => {
        pagination = vm.$el.querySelector('ul.pagination')
        startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
        expect(Number(startBtn.text)).to.equal(vm.totalSize - vm.maxSize * 2 + 1)
        prevGroupBtn.click()
        vm.$nextTick(() => {
          pagination = vm.$el.querySelector('ul.pagination')
          startBtn = pagination.querySelectorAll('li.pagination-page a')[0]
          expect(Number(startBtn.text)).to.equal(1)
          done()
        })
      })
    })
  })
})
