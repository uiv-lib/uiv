import Vue from 'vue'
import TabsDoc from '@/docs/pages/TabsDoc.vue'
import config from '../utils'

describe('TabsDoc', () => {
  it('should be able to render first tab on open', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
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
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[1].querySelector('a').click()
      // Double click should be fine
      vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[1].querySelector('a').click()
      vm.$nextTick(() => {
        let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
        expect(activeTab.length).to.equal(1)
        expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
        // After transition
        setTimeout(() => {
          let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane.active')
          expect(activeContent.length).to.equal(1)
          expect(activeContent[0].querySelector('p').textContent).to.equal('Tab 2 goes here.')
          done()
        }, config.transitionDuration)
      })
    })
  })

  it('should be able to open tab 2 on method called', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$el.querySelector('#tabs-btn-2').click()
      vm.$nextTick(() => {
        let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
        expect(activeTab.length).to.equal(1)
        expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
        // After transition
        setTimeout(() => {
          let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane.active')
          expect(activeContent.length).to.equal(1)
          expect(activeContent[0].querySelector('p').textContent).to.equal('Tab 2 goes here.')
          done()
        }, config.transitionDuration)
      })
    })
  })

  it('should not be able to select disabled tab 3', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let tab3 = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[2]
      expect(tab3.className).to.equal('disabled')
      expect(tab3.querySelector('a').textContent).to.equal('Tab 3 (Disabled)')
      tab3.querySelector('a').click()
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
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$el.querySelector('#tabs-btn-3').click()
      vm.$nextTick(() => {
        let tab3 = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[2]
        expect(tab3.className).to.equal('')
        expect(tab3.querySelector('a').textContent).to.equal('Tab 3 (Enabled)')
        vm.$el.querySelector('#tabs-btn-3').click()
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
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let tab = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[6]
      expect(tab.querySelector('i')).to.exist
      done()
    })
  })

  it('should be able to run callback after click on tab 6', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let _savedAlert = window.alert
      window.alert = () => {
        // Silent to remove out logs in terminal
      }
      try {
        let spy = sinon.spy(window, 'alert')
        vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[6].querySelector('a').click()
        sinon.assert.called(spy)
      } finally {
        window.alert = _savedAlert
        done()
      }
    })
  })

  it('should be able to open grouped tab 5', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let tab5 = vm.$el.querySelector('.nav-tabs').querySelector('li.dropdown')
      tab5.querySelectorAll('a')[0].click()
      vm.$nextTick(() => {
        expect(tab5.querySelector('.dropdown-menu')).to.exist
        expect(tab5.className).to.contain('dropdown')
        expect(tab5.className).to.contain('open')
        tab5.querySelector('.dropdown-menu').querySelector('li').querySelector('a').click()
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
})
