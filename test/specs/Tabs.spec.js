import Vue from 'vue'
import $ from 'jquery'
import Tabs from '@src/components/tabs/Tabs.vue'
import Tab from '@src/components/tabs/Tab.vue'
import TabsDoc from '@docs/pages/components/Tabs.md'
import utils from '../utils'

describe('Tabs', () => {
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(TabsDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should not be able to work if not using <tabs><tab>...</tab></tabs>', () => {
    const _error = window.console.error
    window.console.error = () => {
      // Silent to remove out logs in terminal
    }
    try {
      const spy = sinon.spy(window.console, 'error')
      const res = Vue.compile('<tabs><tab><tab>{{ msg }}</tab></tab></tabs>')
      const vm = new Vue({
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
      $(vm.$el).remove()
      vm.$destroy()
    } finally {
      window.console.error = _error
    }
  })

  it('should be ok if no <tab> present in <tabs>', () => {
    const res = Vue.compile('<tabs>{{msg}}</tabs>')
    const vm = new Vue({
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
    $(vm.$el).remove()
    vm.$destroy()
  })

  it('should be able to render first tab on open', async () => {
    await vm.$nextTick()
    await vm.$nextTick()
    const nav = $el.find('.nav-tabs').get(0)
    const content = $el.find('.tab-content').get(0)
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Home')
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Raw denim you probably haven')
  })

  it('should be able to open correct tab content after click on tab nav', async () => {
    await vm.$nextTick()
    const nav = $el.find('.nav-tabs').get(0)
    const content = $el.find('.tab-content').get(0)
    const tab = nav.querySelectorAll('li')[1].querySelector('a')
    utils.triggerEvent(tab, 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    // Double click should be fine
    utils.triggerEvent(tab, 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Profile')
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Food truck fixie locavore, accusamus mcsw')
  })

  it('should not be able to select disabled tab', async () => {
    await vm.$nextTick()
    const nav = $el.find('.nav-tabs').get(1)
    const content = $el.find('.tab-content').get(1)
    // In nav
    const tab1 = nav.querySelectorAll('li')[1]
    expect(tab1.className).to.equal('disabled')
    utils.triggerEvent(tab1.querySelector('a'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(tab1.className).to.equal('disabled')
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Home tab')
    // In dropdown
    const tab2 = nav.querySelector('.dropdown').querySelectorAll('li')[1]
    expect(tab2.className).to.equal('disabled')
    utils.triggerEvent(tab2.querySelector('a'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(tab2.className).to.equal('disabled')
    activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Home tab')
  })

  it('should be able to render HTML title', async () => {
    await vm.$nextTick()
    const nav = $el.find('.nav-tabs').get(4)
    const tab = nav.querySelectorAll('li')[2]
    expect(tab.querySelector('i')).to.exist
  })

  it('should be able to run callback function', async () => {
    await vm.$nextTick()
    const nav = $el.find('.nav-tabs').get(4)
    const _savedAlert = window.alert
    window.alert = () => {
      // Silent to remove out logs in terminal
    }
    const spy = sinon.spy(window, 'alert')
    utils.triggerEvent(nav.querySelectorAll('li > a')[1], 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    utils.triggerEvent(nav.querySelectorAll('li > a')[2], 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    sinon.assert.calledOnce(spy)
    window.alert = _savedAlert
  })

  it('should be able to open grouped tab', async () => {
    await vm.$nextTick()
    const nav = $el.find('.nav-tabs').get(0)
    const content = $el.find('.tab-content').get(0)
    const tab5 = nav.querySelector('li.dropdown')
    utils.triggerEvent(tab5.querySelectorAll('a')[0], 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(tab5.querySelector('.dropdown-menu')).to.exist
    expect(tab5.className).to.contain('dropdown')
    expect(tab5.className).to.contain('open')
    utils.triggerEvent(tab5.querySelector('.dropdown-menu').querySelector('li').querySelector('a'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(tab5.className).to.contain('active')
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Etsy mixtape wayfarers')
  })

  it('should be able to use with v-model', async () => {
    const _vm = vm.$refs['tabs-dynamic-example']
    const $el = $(_vm.$el)
    await vm.$nextTick()
    await vm.$nextTick()
    const nav = $el.find('.nav-tabs').get(0)
    const content = $el.find('.tab-content').get(0)
    // 1 tab + 1 btn
    expect(nav.querySelectorAll('li').length).to.equal(1 + 1)
    // check active tab
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 1')
    // check active content
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('Tab 1')
  })

  it('should be able to push tab', async () => {
    const _vm = vm.$refs['tabs-dynamic-example']
    const $el = $(_vm.$el)
    const nav = $el.find('.nav-tabs').get(0)
    const content = $el.find('.tab-content').get(0)
    const pushBtn = nav.querySelector('.btn')
    await vm.$nextTick()
    await vm.$nextTick()
    // Add a tab
    utils.triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(nav.querySelectorAll('li').length).to.equal(2 + 1)
    // check active tab
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
    // check active content
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('Tab 2')
  })

  it('should be able to close tab', async () => {
    const _vm = vm.$refs['tabs-dynamic-example']
    const $el = $(_vm.$el)
    const nav = $el.find('.nav-tabs').get(0)
    const content = $el.find('.tab-content').get(0)
    const pushBtn = nav.querySelector('.btn')
    await vm.$nextTick()
    await vm.$nextTick()
    // Add a tab
    utils.triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    // Delete a tab
    utils.triggerEvent(content.querySelector('.tab-pane.active .btn'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(nav.querySelectorAll('li').length).to.equal(1 + 1)
    // check active tab
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 1')
    // check active content
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('Tab 1')
  })

  it('should be able to select dynamic tab', async () => {
    const _vm = vm.$refs['tabs-dynamic-example']
    const $el = $(_vm.$el)
    const nav = $el.find('.nav-tabs').get(0)
    const content = $el.find('.tab-content').get(0)
    const pushBtn = nav.querySelector('.btn')
    await vm.$nextTick()
    await vm.$nextTick()
    // Add a tab
    utils.triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    utils.triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    utils.triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(nav.querySelectorAll('li').length).to.equal(4 + 1)
    _vm.index = 1
    await vm.$nextTick()
    await utils.sleep(350)
    // check active tab
    let activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 2')
    // check active content
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('Tab 2')
    utils.triggerEvent(content.querySelector('.tab-pane.active .btn'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(nav.querySelectorAll('li').length).to.equal(3 + 1)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 3')
    // check active content
    activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('Tab 3')
    // switch tab
    const tab2 = nav.querySelectorAll('li')[2]
    utils.triggerEvent(tab2.querySelector('a'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Tab 4')
    // check active content
    activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('Tab 4')
  })

  it('should not display tab if before-change callback return false', async () => {
    const _vm = vm.$refs['tabs-before-change-example']
    const $el = $(_vm.$el)
    const nav = $el.find('.nav-tabs').get(0)
    await vm.$nextTick()
    await vm.$nextTick()
    expect(nav.querySelectorAll('li').length).to.equal(3)
    // check active tab
    let activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Home')
    // click on tab #2
    utils.triggerEvent(nav.querySelectorAll('li > a')[1], 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Home')
    // fill input
    _vm.input = 'test'
    await _vm.$nextTick()
    // click on tab #2
    utils.triggerEvent(nav.querySelectorAll('li > a')[1], 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Profile')
  })
})
