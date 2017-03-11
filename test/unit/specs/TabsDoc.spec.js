import Vue from 'vue'
import TabsDoc from '@/docs/TabsDoc.vue'

describe('TabsDoc', () => {
  it('should be able to render first tab on open', () => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
      expect(activeTab.length).to.equal(1)
      expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 1')
      let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane:not([style="display: none;"])')
      expect(activeContent.length).to.equal(1)
      expect(activeContent[0].querySelector('p').textContent).to.equal('This is tab 1.')
    })
  })

  it('should be able to open correct tab content after click on tab nav', () => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[1].querySelector('a').click()
      vm.$nextTick(() => {
        let activeTab = vm.$el.querySelector('.nav-tabs').querySelectorAll('.active')
        expect(activeTab.length).to.equal(1)
        expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
        // After transition
        setTimeout(() => {
          let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane:not([style="display: none;"])')
          expect(activeContent.length).to.equal(1)
          expect(activeContent[0].querySelector('p').textContent).to.equal('This is tab 2.')
        }, 1000)
      })
    })
  })

  it('should be able to open tab 2 on method called', () => {
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
          expect(activeContent[0].querySelector('p').textContent).to.equal('This is tab 2.')
        }, 1000)
      })
    })
  })

  it('should be able to enable / disable tab 3', () => {
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
        })
      })
    })
  })

  it('should be able to render HTML title on tab 4 work correct', () => {
    const Constructor = Vue.extend(TabsDoc)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      let tab4 = vm.$el.querySelector('.nav-tabs').querySelectorAll('li')[3]
      expect(tab4.querySelector('i').className).to.equal('glyphicon glyphicon-heart')
      tab4.querySelector('a').click()
      setTimeout(() => {
        let activeContent = vm.$el.querySelector('.tab-content').querySelectorAll('.tab-pane:not([style="display: none;"])')
        expect(activeContent.length).to.equal(1)
        expect(activeContent[0].querySelector('p').textContent).to.equal('This tab has a HTML title.')
      }, 1000)
    })
  })
})
