import Vue from 'vue'
import $ from 'jquery'
import ScrollSpyDoc from '@docs/pages/components/ScrollSpy.md'
import utils from '../utils'

const expectActive = ($nav, hash) => {
  expect($nav.find('li.active').length).to.equal(1)
  expect($nav.find('li.active > a').attr('href')).to.equal(hash)
}

const expectDropdownActive = ($nav, hash) => {
  expect($nav.find('li.active').length).to.equal(2)
  expect($nav.find('li.dropdown.active').length).to.equal(1)
  expect($nav.find('li.dropdown.active > ul > li.active').length).to.equal(1)
  expect($nav.find('li.dropdown.active > ul > li.active > a').attr('href')).to.equal(hash)
}

describe('ScrollSpy', () => {
  let vm
  let $el
  let $app

  beforeEach(() => {
    const Constructor = Vue.extend(ScrollSpyDoc)
    $app = $('<div>').appendTo('body')
    vm = new Constructor().$mount($app.get(0))
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
    $app.remove()
  })

  it('should be able to toggle active class', async () => {
    await vm.$nextTick()
    const _vm = vm.$refs['scrollspy-example-in-navbar']
    const _$el = $(_vm.$el)
    const nav = _$el.find('nav')
    expectActive(nav, '#vue')
    const scrollEl = _$el.find('#scrollspy-example').get(0)
    scrollEl.scrollTop = _$el.find('#vue').get(0).offsetTop
    await utils.sleep(100)
    expectActive(nav, '#vue')
    scrollEl.scrollTop = _$el.find('#bootstrap').get(0).offsetTop
    await utils.sleep(100)
    expectActive(nav, '#bootstrap')
  })

  it('should be able to toggle dropdown active class', async () => {
    await vm.$nextTick()
    const _vm = vm.$refs['scrollspy-example-in-navbar']
    const _$el = $(_vm.$el)
    const nav = _$el.find('nav')
    const scrollEl = _$el.find('#scrollspy-example').get(0)
    scrollEl.scrollTop = _$el.find('#one').get(0).offsetTop
    await utils.sleep(100)
    expectDropdownActive(nav, '#one')
    scrollEl.scrollTop = _$el.find('#two').get(0).offsetTop
    await utils.sleep(100)
    expectDropdownActive(nav, '#two')
    scrollEl.scrollTop = _$el.find('#three').get(0).offsetTop
    await utils.sleep(100)
    expectDropdownActive(nav, '#three')
  })

  it('should be able to append to body', async () => {
    const $app = $('<div>').prependTo('body')
    const res = Vue.compile(`
<section style="height: 5000px;">
  <ul class="nav" v-scrollspy style="height: 200px">
    <li><a href="#1">1</a></li>
    <li><a href="#2">2</a></li>
    <li><a href="#3">3</a></li>
  </ul>
  <div id="1" style="height: 200px">1</div>
  <div id="2" style="height: 500px">2</div>
  <div id="3" style="height: 300px">3</div>
</section>`)
    const vm = new Vue({
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount($app.get(0))
    await vm.$nextTick()
    const $el = $(vm.$el)
    const $nav = $el.find('.nav')
    expect($nav.find('li.active').length).to.equal(0)
    window.scrollTo(0, $el.find('#1').get(0).offsetTop)
    await utils.sleep(100)
    expectActive($nav, '#1')
    window.scrollTo(0, $el.find('#2').get(0).offsetTop)
    await utils.sleep(100)
    expectActive($nav, '#2')
    window.scrollTo(0, $el.find('#3').get(0).offsetTop)
    await utils.sleep(100)
    expectActive($nav, '#3')
    window.scrollTo(0, 0)
    await utils.sleep(100)
    expect($nav.find('li.active').length).to.equal(0)
    vm.$destroy()
    $el.remove()
    $app.remove()
  })

  it('should be able to handle invalid target', async () => {
    const $app = $('<div>').prependTo('body')
    const res = Vue.compile(`
<section style="height: 5000px">
  <ul class="nav" v-scrollspy:test="opts" style="height: 200px">
    <li><a href="#1">{{msg}}</a></li>
  </ul>
</section>`)
    const vm = new Vue({
      data () {
        return {
          opts: {},
          msg: 'test'
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount($app.get(0))
    await vm.$nextTick()
    vm.opts = {offset: 100}
    await vm.$nextTick()
    vm.msg = '12345'
    await vm.$nextTick()
    // no err should be throw here
    vm.$destroy()
    $el.remove()
    $app.remove()
  })
})
