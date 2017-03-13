import Vue from 'vue'
import TabsDoc from '@/docs/TabsDoc.vue'
import config from './../config'

describe('TabsDoc', () => {
  it('should be able to render first tab on open', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
      expect(activeTab.length).to.equal(1)
      expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 1')
      let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane:not([style="display: none;"])')
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
          let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane:not([style="display: none;"])')
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
          let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane:not([style="display: none;"])')
          expect(activeContent.length).to.equal(1)
          expect(activeContent[0].querySelector('p').textContent).to.equal('Tab 2 goes here.')
          done()
        }, config.transitionDuration)
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

  it('should be able to render HTML title on tab 4 work correct', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let tab4 = vm.$el.querySelectorAll('.nav-tabs')[1].querySelectorAll('li')[0]
      expect(tab4.querySelector('i').className).to.equal('glyphicon glyphicon-heart')
      tab4.querySelector('a').click()
      setTimeout(() => {
        let activeContent = vm.$el.querySelectorAll('.tab-content')[1].querySelectorAll('.tab-pane:not([style="display: none;"])')
        expect(activeContent.length).to.equal(1)
        expect(activeContent[0].querySelector('p').textContent).to.equal('This tab has a HTML title.')
        done()
      }, config.transitionDuration)
    })
  })

  it('should be able to run callback after click on tab 5', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let _savedAlert = window.alert
      try {
        let spy = sinon.spy(window, 'alert')
        vm.$el.querySelectorAll('.nav-tabs')[1].querySelectorAll('li')[1].querySelector('a').click()
        sinon.assert.called(spy)
      } finally {
        window.alert = _savedAlert
        done()
      }
    })
  })

  it('should be able to open grouped tab 6', (done) => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let tab5 = vm.$el.querySelectorAll('.nav-tabs')[1].querySelectorAll('li')[2]
      tab5.querySelectorAll('[data-role=trigger]')[0].click()
      vm.$nextTick(() => {
        expect(tab5.querySelector('.dropdown-menu')).to.exist
        tab5.querySelector('.dropdown-menu').querySelector('li').querySelector('a').click()
        setTimeout(() => {
          expect(tab5.className).to.equal('dropdown active')
          let activeContent = vm.$el.querySelectorAll('.tab-content')[1].querySelectorAll('.tab-pane:not([style="display: none;"])')
          expect(activeContent.length).to.equal(1)
          expect(activeContent[0].querySelector('p').textContent).to.equal('This is Tab in group 1.')
          done()
        }, config.transitionDuration)
      })
    })
  })
})
