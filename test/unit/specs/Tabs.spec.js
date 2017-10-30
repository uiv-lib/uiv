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
    let Constructor = Vue.extend(TabsDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
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
      $(vm.$el).remove()
      vm.$destroy()
    } finally {
      window.console.error = _error
    }
  })

  it('should be ok if no <tab> present in <tabs>', () => {
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
    $(vm.$el).remove()
    vm.$destroy()
  })

  it('should be able to use with v-model', async () => {
    let res = Vue.compile('<tabs v-model="index"><tab title="tab0">tab0</tab><tab title="tab1">tab1</tab></tabs>')
    let vm = new Vue({
      data () {
        return {
          index: 1
        }
      },
      components: {Tab, Tabs},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el)
    await vm.$nextTick()
    let nav = $el.find('.nav-tabs').get(0)
    let content = $el.find('.tab-content').get(0)
    let activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('tab1')
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('tab1')
    utils.triggerEvent(nav.querySelectorAll('li')[0].querySelector('a'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('tab0')
    activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].textContent).to.contain('tab0')
    vm.$destroy()
    $el.remove()
  })

  it('should be able to render first tab on open', async () => {
    await vm.$nextTick()
    let nav = $el.find('.nav-tabs').get(0)
    let content = $el.find('.tab-content').get(0)
    let activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Home')
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Raw denim you probably haven')
  })

  it('should be able to open correct tab content after click on tab nav', async () => {
    await vm.$nextTick()
    let nav = $el.find('.nav-tabs').get(0)
    let content = $el.find('.tab-content').get(0)
    let tab = nav.querySelectorAll('li')[1].querySelector('a')
    utils.triggerEvent(tab, 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    // Double click should be fine
    utils.triggerEvent(tab, 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    let activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).to.equal(1)
    expect(activeTab[0].querySelector('a').textContent).to.equal('Profile')
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Food truck fixie locavore, accusamus mcsw')
  })

  it('should not be able to select disabled tab', async () => {
    await vm.$nextTick()
    let nav = $el.find('.nav-tabs').get(1)
    let content = $el.find('.tab-content').get(1)
    // In nav
    let tab1 = nav.querySelectorAll('li')[1]
    expect(tab1.className).to.equal('disabled')
    utils.triggerEvent(tab1.querySelector('a'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    expect(tab1.className).to.equal('disabled')
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Home tab')
    // In dropdown
    let tab2 = nav.querySelector('.dropdown').querySelectorAll('li')[1]
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
    let nav = $el.find('.nav-tabs').get(4)
    let tab = nav.querySelectorAll('li')[2]
    expect(tab.querySelector('i')).to.exist
  })

  it('should be able to run callback function', async () => {
    await vm.$nextTick()
    let nav = $el.find('.nav-tabs').get(4)
    let _savedAlert = window.alert
    window.alert = () => {
      // Silent to remove out logs in terminal
    }
    let spy = sinon.spy(window, 'alert')
    utils.triggerEvent(nav.querySelectorAll('li')[2].querySelector('a'), 'click')
    await vm.$nextTick()
    await utils.sleep(350)
    sinon.assert.called(spy)
    window.alert = _savedAlert
  })

  it('should be able to open grouped tab', async () => {
    await vm.$nextTick()
    let nav = $el.find('.nav-tabs').get(0)
    let content = $el.find('.tab-content').get(0)
    let tab5 = nav.querySelector('li.dropdown')
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
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).to.equal(1)
    expect(activeContent[0].querySelector('p').textContent).to.contain('Etsy mixtape wayfarers')
  })
})
