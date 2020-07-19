import { triggerEvent, sleep, triggerKey, createVm, destroyVm, keyCodes } from '../utils'
import states from '../../docs/assets/data/states.json'
import axios from 'axios/dist/axios.min'

function baseVm () {
  return createVm(`
  <section>
    <btn @click="model=states[0]" type="primary">Set to Alabama</btn>
    <btn @click="model=null">Clear</btn>
    <hr/>
    <label for="input">States of America:</label>
    <input id="input" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input" :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
    `, {
    model: '',
    states: states.data
  })
}

describe('Typeahead', () => {
  let xhr, requests, server
  let vm

  afterEach(() => {
    destroyVm(vm)
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
    vm = baseVm()
    await vm.$nextTick()
    const setBtn = vm.$el.querySelectorAll('.btn')[0]
    const clearBtn = vm.$el.querySelectorAll('.btn')[1]
    const input = vm.$el.querySelector('input')
    setBtn.click()
    await vm.$nextTick()
    expect(input.value).to.equal('Alabama')
    expect(vm.model.name).to.equal('Alabama')
    expect(vm.model.abbreviation).to.equal('AL')
    clearBtn.click()
    await vm.$nextTick()
    expect(input.value).to.equal('')
    expect(vm.model).not.exist
  })

  it('should be able to open typeahead when input change', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to open typeahead on input focus', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'focus')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to keep open on input click', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'focus')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    input.click()
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close typeahead on input blur', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    triggerEvent(input, 'blur')
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should be able to close typeahead on input esc key', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    triggerKey(input, keyCodes.esc)
    await vm.$nextTick()
    expect(dropdown.className).not.contain('open')
  })

  it('should not close typeahead on input click', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    triggerEvent(input, 'click')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
  })

  it('should be able to close typeahead when input changed to empty', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    input.value = ''
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to slice item length', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'a'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(10)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should not open dropdown if nothing match', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'asdasdasdasd'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to select item', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    selected.click()
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(vm.model.name).to.equal('Alabama')
  })

  it('should be able to use force select', async () => {
    vm = createVm(`
  <section>
    <label for="input-3">States of America:</label>
    <input id="input-3" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-3" force-select :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
    `, {
      model: '',
      states: states.data
    })
    vm.forceSelect = true
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(vm.model).not.exist
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    selected.click()
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(vm.model.name).to.equal('Alabama')
  })

  it('should not be able to select item using keyboard while dropdown not open', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    triggerKey(input, keyCodes.enter, 'down')
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('')
  })

  it('should be able to select item using keyboard', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    triggerKey(input, 13)
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(input.value).to.equal('Alabama')
    expect(vm.model.name).to.equal('Alabama')
  })

  it('should be able use keyboard nav to go next', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alaska')
    triggerKey(input, 40)
    await vm.$nextTick()
    triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Palau')
  })

  it('should be able use keyboard nav to go prev', async () => {
    vm = baseVm()
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
    triggerKey(input, 40)
    await vm.$nextTick()
    triggerKey(input, 40)
    await vm.$nextTick()
    triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Palau')
    triggerKey(input, 38)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alaska')
    triggerKey(input, 38)
    await vm.$nextTick()
    triggerKey(input, 38)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).to.equal('Alabama')
  })

  it('should be able to match start', async () => {
    vm = createVm(`
<section>
    <label for="input-2">States of America:</label>
    <input id="input-2" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-2" match-start :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
    `, {
      model: '',
      states: states.data
    })
    vm.matchStart = true
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(2)
  })

  it('should be able to use async typeahead', async () => {
    vm = createVm(`<section>
    <label for="input-4">Users of Github:</label>
    <input id="input-4" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-4" async-src="https://api.github.com/search/users?q=" async-key="items" item-key="login"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>`, {
      model: ''
    })
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'wxsm'
    triggerEvent(input, 'input')
    await sleep(600)
    server.requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ items: [{ login: 'wxsms' }] })
    )
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(1)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).to.equal('wxsms')
    Element.prototype.matches = savedMatches
  })

  it('should be able to use component target', async () => {
    vm = createVm('<div>' +
      '<collapse ref="input"/>' +
      '<typeahead ref="typeahead" :target="ele" v-model="model"></typeahead>' +
      '</div>', {
      ele: null,
      model: null
    }, {
      mounted () {
        this.ele = this.$refs.input
      }
    })
    await vm.$nextTick()
    expect(vm.$refs.typeahead.inputEl).to.equal(vm.ele.$el)
  })

  it('should be ok if target invalid', async () => {
    vm = createVm('<div>' +
      '<typeahead ref="typeahead" :target="ele" v-model="model"></typeahead>' +
      '</div>', {
      ele: { a: 1 },
      model: null
    })
    await vm.$nextTick()
    expect(vm.$refs.typeahead.inputEl).to.be.null
  })

  it('should be able to use string arr async returns', async () => {
    vm = createVm('<div>' +
      '<input ref="input">' +
      '<typeahead :target="ele" v-model="model" async-src="https://api.github.com/search/users?q="></typeahead>' +
      '</div>', {
      ele: null,
      model: null
    }, {
      mounted () {
        this.ele = this.$refs.input
      }
    })
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'a'
    triggerEvent(input, 'input')
    await sleep(600)
    server.requests[1].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(['aa', 'ab', 'ac'])
    )
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(3)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).to.equal('aa')
    Element.prototype.matches = savedMatches
  })

  it('should be able to handel async typeahead error', async () => {
    vm = createVm('<div>' +
      '<input ref="input">' +
      '<typeahead @loaded-error="onErr" :target="ele" v-model="model" async-src="https://api.github.com/search/users?q="></typeahead>' +
      '</div>', {
      ele: null,
      model: null,
      err: null
    }, {
      mounted () {
        this.ele = this.$refs.input
      },
      methods: {
        onErr () {
          this.err = 'error'
        }
      }
    })
    await vm.$nextTick()
    expect(vm.err).not.exist
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'wxsm'
    triggerEvent(input, 'input')
    await sleep(600)
    server.requests[2].respond(
      500,
      { 'Content-Type': 'application/json' },
      JSON.stringify([{ id: 1, text: 'Provide examples', done: true }])
    )
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(vm.err).to.exist
    Element.prototype.matches = savedMatches
  })

  it('should be able to bind string data', async () => {
    vm = createVm('<div>' +
      '<input ref="input">' +
      '<typeahead :ignore-case="false" :target="ele" :data="data" v-model="model"></typeahead>' +
      '</div>', {
      data: ['aa', 'ab', 'bb'],
      ele: null,
      model: null
    }, {
      mounted () {
        this.ele = this.$refs.input
      }
    })
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'a'
    triggerEvent(input, 'input')
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
  })

  it('should be able to disable preselect', async () => {
    vm = createVm('<div>' +
      '<input ref="input">' +
      '<typeahead :preselect="false" :target="ele" :data="data" v-model="model"></typeahead>' +
      '</div>', {
      data: ['aa', 'ab', 'bb'],
      ele: null,
      model: ''
    }, {
      mounted () {
        this.ele = this.$refs.input
      }
    })
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    input.value = 'a'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(2)
    expect(dropdown.querySelector('li.active a')).not.exist
    triggerKey(input, keyCodes.enter)
    await vm.$nextTick()
    expect(dropdown.className).to.not.contain('open')
    expect(vm.model).to.equal('a')
    expect(input.value).to.equal('a')
    triggerEvent(input, 'input')
    await vm.$nextTick()
    triggerKey(input, keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelector('li.active a')).to.exist
    expect(dropdown.querySelector('li.active a').textContent).to.equal('aa')
    dropdown.querySelector('li.active a').click()
    await vm.$nextTick()
    expect(vm.model).to.equal('aa')
    expect(input.value).to.equal('aa')
    expect(dropdown.className).to.not.contain('open')
  })

  it('should be able to use async-function and custom template', async () => {
    vm = createVm(`  <section>
    <label for="input-5">Users of Github:</label>
    <input id="input-5" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-5" :async-function="queryFunction" item-key="login">
      <template slot="item" slot-scope="props">
        <li v-for="(item, index) in props.items" :class="{active:props.activeIndex===index}">
          <a role="button" @click="props.select(item)">
            <img width="22px" height="22px" :src="item.avatar_url + '&s=40'">
            <span v-html="props.highlight(item)"></span>
          </a>
        </li>
      </template>
    </typeahead>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>`, {
      model: ''
    }, {
      methods: {
        queryFunction (query, done) {
          axios.get('https://api.github.com/search/users?q=' + query)
            .then(res => {
              done(res.data.items)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    })
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).to.not.contain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'wxsm'
    triggerEvent(input, 'input')
    await sleep(600)
    server.requests[3].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ items: [{ login: 'wxsms' }] })
    )
    await sleep(200)
    expect(dropdown.className).to.contain('open')
    expect(dropdown.querySelectorAll('li').length).to.equal(1)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).to.equal('wxsms')
    Element.prototype.matches = savedMatches
  })
})
