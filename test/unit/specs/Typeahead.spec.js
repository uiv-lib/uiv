import Vue from 'vue'
import $ from 'jquery'
import TypeaheadDoc from '@docs/pages/components/Typeahead.md'
import utils from '../utils'

describe('Typeahead', () => {
  let xhr, requests, server
  let vm
  let $el

  beforeEach(() => {
    const Constructor = Vue.extend(TypeaheadDoc)
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

  it('should be able to set and clear typeahead model manually', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const setBtn = _vm.$el.querySelectorAll('.btn')[0]
    const clearBtn = _vm.$el.querySelectorAll('.btn')[1]
    const input = _vm.$el.querySelector('input')
    setBtn.click()
    await vm.$nextTick()
    expect(input.value).to.equal('Alabama')
    expect(_vm.model.name).to.equal('Alabama')
    expect(_vm.model.abbreviation).to.equal('AL')
    clearBtn.click()
    await vm.$nextTick()
    expect(input.value).to.equal('')
    expect(_vm.model).not.exist
  })

  it('should be able to open typeahead when input change', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to open typeahead on input focus', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'focus')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to keep open on input click', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'focus')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    input.click()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close typeahead on input blur', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    utils.triggerEvent(input, 'blur')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should be able to close typeahead on input esc key', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    utils.triggerKey(input, utils.keyCodes.esc)
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should not close typeahead on input click', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    utils.triggerEvent(input, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close typeahead when input changed to empty', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    input.value = ''
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to slice item length', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'a'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(10)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should not open dropdown if nothing match', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'asdasdasdasd'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to select item', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    selected.click()  // utils.triggerEvent() doesn't work here...
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(_vm.model.name).to.equal('Alabama')
  })

  it('should be able to use force select', async () => {
    const _vm = vm.$refs['typeahead-force-select']
    _vm.forceSelect = true
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(_vm.model).not.exist
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    selected.click()  // utils.triggerEvent() doesn't work here...
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(_vm.model.name).to.equal('Alabama')
  })

  it('should not be able to select item using keyboard while dropdown not open', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    utils.triggerKey(input, utils.keyCodes.enter, 'down')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('')
  })

  it('should be able to select item using keyboard', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    utils.triggerKey(input, 13)
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(_vm.model.name).to.equal('Alabama')
  })

  it('should be able use keyboard nav to go next', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    utils.triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alaska')
    utils.triggerKey(input, 40)
    await vm.$nextTick()
    utils.triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Palau')
  })

  it('should be able use keyboard nav to go prev', async () => {
    const _vm = vm.$refs['typeahead-example']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    utils.triggerKey(input, 40)
    await vm.$nextTick()
    utils.triggerKey(input, 40)
    await vm.$nextTick()
    utils.triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Palau')
    utils.triggerKey(input, 38)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alaska')
    utils.triggerKey(input, 38)
    await vm.$nextTick()
    utils.triggerKey(input, 38)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to match start', async () => {
    const _vm = vm.$refs['typeahead-match-start']
    _vm.matchStart = true
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(2)
  })

  it('should be able to use async typeahead', async () => {
    const _vm = vm.$refs['typeahead-async-query']
    await vm.$nextTick()
    const input = _vm.$el.querySelector('input')
    const dropdown = _vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'wxsm'
    utils.triggerEvent(input, 'input')
    await utils.sleep(600)
    server.requests[0].respond(
      200,
      {'Content-Type': 'application/json'},
      JSON.stringify({items: [{login: 'wxsms'}]})
    )
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(1)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).to.equal('wxsms')
    Element.prototype.matches = savedMatches
  })

  it('should be able to use component target', async () => {
    const res = Vue.compile('<div>' +
      '<collapse ref="input"/>' +
      '<typeahead ref="typeahead" :target="ele" v-model="model"></typeahead>' +
      '</div>')
    const vm = new Vue({
      data () {
        return {
          ele: null,
          model: null
        }
      },
      mounted () {
        this.ele = this.$refs.input
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    expect(vm.$refs.typeahead.inputEl).to.equal(vm.ele.$el)
    vm.$destroy()
  })

  it('should be ok if target invalid', async () => {
    const res = Vue.compile('<div>' +
      '<typeahead ref="typeahead" :target="ele" v-model="model"></typeahead>' +
      '</div>')
    const vm = new Vue({
      data () {
        return {
          ele: {a: 1},
          model: null
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    expect(vm.$refs.typeahead.inputEl).to.be.null
    vm.$destroy()
  })

  it('should be able to use string arr async returns', async () => {
    const res = Vue.compile('<div>' +
      '<input ref="input">' +
      '<typeahead :target="ele" v-model="model" async-src="https://api.github.com/search/users?q="></typeahead>' +
      '</div>')
    const vm = new Vue({
      data () {
        return {
          ele: null,
          model: null
        }
      },
      mounted () {
        this.ele = this.$refs.input
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'a'
    utils.triggerEvent(input, 'input')
    await utils.sleep(600)
    server.requests[1].respond(
      200,
      {'Content-Type': 'application/json'},
      JSON.stringify(['aa', 'ab', 'ac'])
    )
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).to.equal('aa')
    Element.prototype.matches = savedMatches
    vm.$destroy()
  })

  it('should be able to handel async typeahead error', async () => {
    const res = Vue.compile('<div>' +
      '<input ref="input">' +
      '<typeahead @loaded-error="onErr" :target="ele" v-model="model" async-src="https://api.github.com/search/users?q="></typeahead>' +
      '</div>')
    const vm = new Vue({
      data () {
        return {
          ele: null,
          model: null,
          err: null
        }
      },
      mounted () {
        this.ele = this.$refs.input
      },
      methods: {
        onErr () {
          this.err = 'error'
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    expect(vm.err).not.exist
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'wxsm'
    utils.triggerEvent(input, 'input')
    await utils.sleep(600)
    server.requests[2].respond(
      500,
      {'Content-Type': 'application/json'},
      JSON.stringify([{id: 1, text: 'Provide examples', done: true}])
    )
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(vm.err).to.exist
    Element.prototype.matches = savedMatches
    vm.$destroy()
  })

  it('should be able to bind string data', async () => {
    const res = Vue.compile('<div>' +
      '<input ref="input">' +
      '<typeahead :ignore-case="false" :target="ele" :data="data" v-model="model"></typeahead>' +
      '</div>')
    const vm = new Vue({
      data () {
        return {
          data: ['aa', 'ab', 'bb'],
          ele: null,
          model: null
        }
      },
      mounted () {
        this.ele = this.$refs.input
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'a'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(2)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('aa')
    selected.click()
    await vm.$nextTick()
    expect(vm.model).to.equal('aa')
    expect(input.value).to.equal('aa')
    vm.model = 'bb'
    await vm.$nextTick()
    expect(vm.model).to.equal('bb')
    expect(input.value).to.equal('bb')
    vm.$destroy()
  })

  it('should be able to disable preselect', async () => {
    const res = Vue.compile('<div>' +
      '<input ref="input">' +
      '<typeahead :preselect="false" :target="ele" :data="data" v-model="model"></typeahead>' +
      '</div>')
    const vm = new Vue({
      data () {
        return {
          data: ['aa', 'ab', 'bb'],
          ele: null,
          model: ''
        }
      },
      mounted () {
        this.ele = this.$refs.input
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'a'
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(2)
    expect(dropdown.querySelector('li.active a')).not.exist
    utils.triggerKey(input, utils.keyCodes.enter)
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(vm.model).to.equal('a')
    expect(input.value).to.equal('a')
    utils.triggerEvent(input, 'input')
    await vm.$nextTick()
    utils.triggerKey(input, utils.keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelector('li.active a')).to.exist
    expect(dropdown.querySelector('li.active a').textContent).to.equal('aa')
    dropdown.querySelector('li.active a').click()
    await vm.$nextTick()
    expect(vm.model).to.equal('aa')
    expect(input.value).to.equal('aa')
    expect(dropdown.className).to.not.contain('open')
    vm.$destroy()
  })
})
