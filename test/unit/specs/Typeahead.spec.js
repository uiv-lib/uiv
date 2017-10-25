import Vue from 'vue'
import $ from 'jquery'
import Typeahead from '@src/components/typeahead/Typeahead.vue'
import TypeaheadDoc from '@docs/pages/components/Typeahead.md'
import utills from './../utils'

describe('Typeahead', () => {
  let xhr, requests, server
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(TypeaheadDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el).appendTo('body')
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  before(() => {
    xhr = sinon.useFakeXMLHttpRequest()
    requests = []
    xhr.onCreate = (req) => {
      requests.push(req)
    }
    server = sinon.fakeServer.create()
  })

  after(() => {
    xhr.restore()
    server.restore()
  })

  it('should not be able to work if no trigger present', async () => {
    const Constructor = Vue.extend(Typeahead)
    const vm = new Constructor().$mount()
    await vm.$nextTick()
    vm.$destroy()
  })

  it('should not be able to work if no data source present', async () => {
    let res = Vue.compile('<typeahead ref="typeahead"><input data-role="input" type="text"></typeahead>')
    let vm = new Vue({
      components: {Typeahead},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    let input = vm.$el.querySelector('input')
    let dropdown = vm.$el.querySelector('.dropdown')
    input.value = 'test'
    vm.$refs.typeahead.inputChanged()
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
    vm.$destroy()
  })

  it('should be able to open typeahead when input change', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to open typeahead on input focus', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    let typeahead = _vm.$refs.typeahead1
    // input.focus()
    typeahead.inputFocused()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should not be able to open typeahead on input focus if set param to false', async () => {
    let _vm = vm.$refs['typeahead-example']
    _vm.openOnFocus = false
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    let typeahead = _vm.$refs.typeahead1
    typeahead.inputFocused()
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should be able to close typeahead on input blur', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    let typeahead = _vm.$refs.typeahead1
    // input.focus()
    typeahead.inputFocused()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    typeahead.inputBlured()
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should not close typeahead on input click', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    let typeahead = _vm.$refs.typeahead1
    // input.focus()
    typeahead.inputFocused()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    input.click()
    typeahead.$refs.dropdown.windowClicked({target: input})
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close typeahead on window click', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    let typeahead = _vm.$refs.typeahead1
    // input.focus()
    typeahead.inputFocused()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    input.click()
    typeahead.$refs.dropdown.windowClicked({target: document.createElement('div')})
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should be able to use string arrays as data', async () => {
    let _vm = vm.$refs['typeahead-example']
    _vm.states = _vm.states.map(v => v.name)
    _vm.itemKey = ''
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    selected.click()
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(_vm.model).to.equal('Alabama')
  })

  it('should be able to close typeahead when input change to empty', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    input.value = ''
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to slice item length', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'a'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(10)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should not open dropdown if nothing match', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'asdasdasdasd'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to select item', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    selected.click()
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(_vm.model.name).to.equal('Alabama')
  })

  it('should be able to use force select', async () => {
    let _vm = vm.$refs['typeahead-example']
    _vm.forceSelect = true
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(_vm.model).not.exist
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    selected.click()
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(_vm.model.name).to.equal('Alabama')
  })

  it('should not be able to select item using keyboard while dropdown not open', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    let event = {keyCode: 13}
    _vm.$refs.typeahead1.inputKeyPressed(event)
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('')
  })

  it('should be able to select item using keyboard', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    let event = {keyCode: 13}
    _vm.$refs.typeahead1.inputKeyPressed(event)
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(_vm.model.name).to.equal('Alabama')
  })

  it('should be able use keyboard nav to go next', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    let event = {keyCode: 40}
    _vm.$refs.typeahead1.inputKeyPressed(event)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alaska')
    event = {keyCode: 40}
    _vm.$refs.typeahead1.inputKeyPressed(event)
    _vm.$refs.typeahead1.inputKeyPressed(event)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Palau')
  })

  it('should be able use keyboard nav to go prev', async () => {
    let _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    let event = {keyCode: 40}
    _vm.$refs.typeahead1.inputKeyPressed(event)
    _vm.$refs.typeahead1.inputKeyPressed(event)
    _vm.$refs.typeahead1.inputKeyPressed(event)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Palau')
    event = {keyCode: 38}
    _vm.$refs.typeahead1.inputKeyPressed(event)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alaska')
    event = {keyCode: 38}
    _vm.$refs.typeahead1.inputKeyPressed(event)
    _vm.$refs.typeahead1.inputKeyPressed(event)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to not ignore case', async () => {
    let _vm = vm.$refs['typeahead-example']
    _vm.ignoreCase = false
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(1)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Palau')
    input.value = 'Ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(2)
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to match start', async () => {
    let _vm = vm.$refs['typeahead-example']
    _vm.matchStart = true
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[0]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[0]
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    _vm.$refs.typeahead1.inputChanged() // can't auto detect event
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(2)
  })

  it('should be able to use async typeahead', async () => {
    let _vm = vm.$refs['typeahead-async']
    await vm.$nextTick()
    let input = vm.$el.querySelectorAll('[data-role=input]')[1]
    let dropdown = vm.$el.querySelectorAll('.dropdown')[1]
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    let savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'wxsm'
    _vm.$refs.typeahead2.inputChanged() // can't auto detect event
    await utills.sleep(600)
    server.requests[0].respond(
      200,
      {'Content-Type': 'application/json'},
      JSON.stringify({items: [{login: 'wxsms'}]})
    )
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(1)
    let selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).to.equal('wxsms')
    Element.prototype.matches = savedMatches
  })
})
