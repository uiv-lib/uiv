import Vue from 'vue'
import Tabs from '@src/components/tabs/Tabs.vue'
import Tab from '@src/components/tabs/Tab.vue'
import TabsDoc from '@docs/pages/components/Tabs.md'
import utils from '../utils'

describe('Tabs', () => {
  let root

  beforeEach(() => {
    root = new Vue({
      template: '<TabsDoc ref="doc"/>',
      components: {TabsDoc}
    })
  })

  afterEach(() => {
    try {
      root.$destroy()
    } catch (err) {
      // Silent
    }
  })

  it('should not be able to work if not using <tabs><tab>...</tab></tabs>', () => {
    let _error = window.console.error
    window.console.error = () => {
      // Silent to remove out logs in terminal
    }
    try {
      let spy = sinon.spy(window.console, 'error')
      let res = Vue.compile('<tabs><tab><tab>{{ msg }}</tab></tab></tabs>')
      let vm = new Vue({
        data () {
          return {
            msg: 'hello'
          }
        },
        components: {Tab, Tabs},
        render: res.render,
        staticRenderFns: res.staticRenderFns
      })
      vm.$mount()
      sinon.assert.called(spy)
      vm.$destroy()
    } finally {
      window.console.error = _error
    }
  })

  it('should be ok if not <tab> present in <tabs>', () => {
    let res = Vue.compile('<tabs>{{msg}}</tabs>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tab, Tabs},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$destroy()
  })

  it('should be able to render first tab on open', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
      expect(activeTab.length).to.equal(1)
      expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 1')
      let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane.active')
      expect(activeContent.length).to.equal(1)
      expect(activeContent[0].querySelector('p').textContent).to.equal('This is tab 1.')
      done()
    })
  })

  it('should be able to open correct tab content after click on tab nav', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let tab = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[1].querySelector('a')
      utils.triggerEvent(tab, 'click')
      // Double click should be fine
      utils.triggerEvent(tab, 'click')
      vm.$nextTick(() => {
        let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
        expect(activeTab.length).to.equal(1)
        expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
        let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane.active')
        expect(activeContent.length).to.equal(1)
        expect(activeContent[0].querySelector('p').textContent).to.equal('Tab 2 goes here.')
        done()
      })
    })
  })

  it('should be able to open tab 2 on method called', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      utils.triggerEvent(vm.$el.querySelector('#tabs-btn-2'), 'click')
      vm.$nextTick(() => {
        let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
        expect(activeTab.length).to.equal(1)
        expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
        let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane.active')
        expect(activeContent.length).to.equal(1)
        expect(activeContent[0].querySelector('p').textContent).to.equal('Tab 2 goes here.')
        done()
      })
    })
  })

  it('should not be able to select disabled tab 3', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let tab3 = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[2]
      expect(tab3.className).to.equal('disabled')
      expect(tab3.querySelector('a').textContent).to.equal('Tab 3 (Disabled)')
      utils.triggerEvent(tab3.querySelector('a'), 'click')
      vm.$nextTick(() => {
        expect(tab3.className).to.equal('disabled')
        expect(tab3.querySelector('a').textContent).to.equal('Tab 3 (Disabled)')
        let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane.active')
        expect(activeContent.length).to.equal(1)
        expect(activeContent[0].querySelector('p').textContent).to.equal('This is tab 1.')
        done()
      })
    })
  })

  it('should be able to enable / disable tab 3', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let enableBtn = vm.$el.querySelector('#tabs-btn-3')
      utils.triggerEvent(enableBtn, 'click')
      vm.$nextTick(() => {
        let tab3 = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[2]
        expect(tab3.className).to.equal('')
        expect(tab3.querySelector('a').textContent).to.equal('Tab 3 (Enabled)')
        utils.triggerEvent(enableBtn, 'click')
        vm.$nextTick(() => {
          let tab3 = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[2]
          expect(tab3.className).to.equal('disabled')
          expect(tab3.querySelector('a').textContent).to.equal('Tab 3 (Disabled)')
          done()
        })
      })
    })
  })

  it('should be able to render HTML title on tab 6', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let tab = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[6]
      expect(tab.querySelector('i')).to.exist
      done()
    })
  })

  it('should be able to run callback after click on tab 6', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let _savedAlert = window.alert
      window.alert = () => {
        // Silent to remove out logs in terminal
      }
      let spy = sinon.spy(window, 'alert')
      utils.triggerEvent(vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[6].querySelector('a'), 'click')
      vm.$nextTick(() => {
        sinon.assert.called(spy)
        window.alert = _savedAlert
        done()
      })
    })
  })

  it('should be able to open grouped tab 5', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let tab5 = vm.$el.querySelector('.nav-tabs').querySelector('li.dropdown')
      utils.triggerEvent(tab5.querySelectorAll('a')[0], 'click')
      vm.$nextTick(() => {
        expect(tab5.querySelector('.dropdown-menu')).to.exist
        expect(tab5.className).to.contain('dropdown')
        expect(tab5.className).to.contain('open')
        utils.triggerEvent(tab5.querySelector('.dropdown-menu').querySelector('li').querySelector('a'), 'click')
        vm.$nextTick(() => {
          expect(tab5.className).to.contain('active')
          let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane.active')
          expect(activeContent.length).to.equal(1)
          expect(activeContent[0].querySelector('p').textContent).to.equal('This is Tab in group 1.')
          done()
        })
      })
    })
  })

  it('should be able to use without v-model', (done) => {
    let vm = root.$mount().$refs.doc
    vm.$nextTick(() => {
      let tabs = vm.$el.querySelectorAll('.nav-tabs')[1]
      utils.triggerEvent(tabs.querySelectorAll('li')[1].querySelector('a'), 'click')
      vm.$nextTick(() => {
        let activeTab = tabs.querySelectorAll('.active')
        expect(activeTab.length).to.equal(1)
        expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
        let activeContent = vm.$el.querySelectorAll('.tab-content')[1].querySelectorAll('.tab-pane.active')
        expect(activeContent.length).to.equal(1)
        expect(activeContent[0].querySelector('p').textContent).to.equal('Tab 2 goes here.')
        done()
      })
    })
  })
})
