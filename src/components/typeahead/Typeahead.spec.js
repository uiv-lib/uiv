import {
  createWrapper,
  keyCodes,
  sleep,
  triggerEvent,
  triggerKey,
} from '../../__test__/utils'
import { request } from '../../utils/http.utils'
import states from '../../__test__/states.json'
import sinon from 'sinon'

function baseVm() {
  return createWrapper(
    `
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
    `,
    {
      model: '',
      states: states.data,
    }
  )
}

describe('Typeahead', () => {
  let xhr, server

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()
    window.XMLHttpRequest = xhr
    server = sinon.fakeServer.create()
  })

  afterEach(() => {
    xhr.restore()
    server.restore()
  })

  it('should be able to set and clear typeahead model manually', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const setBtn = vm.$el.querySelectorAll('.btn')[0]
    const clearBtn = vm.$el.querySelectorAll('.btn')[1]
    const input = vm.$el.querySelector('input')
    setBtn.click()
    await vm.$nextTick()
    expect(input.value).toEqual('Alabama')
    expect(vm.model.name).toEqual('Alabama')
    expect(vm.model.abbreviation).toEqual('AL')
    clearBtn.click()
    await vm.$nextTick()
    expect(input.value).toEqual('')
    expect(vm.model).toBeNull()
  })

  it('should be able to open typeahead when input change', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
  })

  it('should be able to open typeahead on input focus', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'focus')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
  })

  it('should be able to keep open on input click', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'focus')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    input.click()
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
  })

  it('should be able to close typeahead on input blur', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    triggerEvent(input, 'blur')
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
  })

  it('should be able to close typeahead on input esc key', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    triggerKey(input, keyCodes.esc)
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
  })

  it('should not close typeahead on input click', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    triggerEvent(input, 'click')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
  })

  it('should be able to close typeahead when input changed to empty', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    input.value = ''
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
  })

  it('should be able to slice item length', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'a'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(10)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
  })

  it('should not open dropdown if nothing match', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'asdasdasdasd'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
  })

  it('should be able to select item', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
    selected.click()
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
    expect(input.value).toEqual('Alabama')
    expect(vm.model.name).toEqual('Alabama')
  })

  it('should be able to use force select', async () => {
    const wrapper = createWrapper(
      `
  <section>
    <label for="input-3">States of America:</label>
    <input id="input-3" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-3" force-select :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
    `,
      {
        model: '',
        states: states.data,
      }
    )
    const vm = wrapper.vm
    vm.forceSelect = true
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(vm.model).toBeUndefined()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
    selected.click()
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
    expect(input.value).toEqual('Alabama')
    expect(vm.model.name).toEqual('Alabama')
  })

  it('should not be able to select item using keyboard while dropdown not open', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    triggerKey(input, keyCodes.enter, 'down')
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
    expect(input.value).toEqual('')
  })

  it('should be able to select item using keyboard', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
    triggerKey(input, 13)
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
    expect(input.value).toEqual('Alabama')
    expect(vm.model.name).toEqual('Alabama')
  })

  it('should be able use keyboard nav to go next', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
    triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alaska')
    triggerKey(input, 40)
    await vm.$nextTick()
    triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Palau')
  })

  it('should be able use keyboard nav to go prev', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    let selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
    triggerKey(input, 40)
    await vm.$nextTick()
    triggerKey(input, 40)
    await vm.$nextTick()
    triggerKey(input, 40)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Palau')
    triggerKey(input, 38)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alaska')
    triggerKey(input, 38)
    await vm.$nextTick()
    triggerKey(input, 38)
    await vm.$nextTick()
    selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('Alabama')
  })

  it('should be able to match start', async () => {
    const wrapper = createWrapper(
      `
<section>
    <label for="input-2">States of America:</label>
    <input id="input-2" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-2" match-start :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
    `,
      {
        model: '',
        states: states.data,
      }
    )
    const vm = wrapper.vm
    vm.matchStart = true
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'ala'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(2)
  })

  it.skip('should be able to use async typeahead', async () => {
    const wrapper = createWrapper(
      `<section>
    <label for="input-4">Users of Github:</label>
    <input id="input-4" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-4" async-src="https://api.github.com/search/users?q=" async-key="items" item-key="login"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>`,
      {
        model: '',
      }
    )
    await sleep(500)
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
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
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(1)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).toEqual('wxsms')
    Element.prototype.matches = savedMatches
  })

  it('should be able to use component target', async () => {
    const wrapper = createWrapper(
      '<div>' +
        '<collapse ref="input"/>' +
        '<typeahead ref="typeahead" :target="ele" v-model="model"></typeahead>' +
        '</div>',
      {
        ele: null,
        model: null,
      },
      {
        mounted() {
          this.ele = this.$refs.input
        },
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(vm.$refs.typeahead.inputEl).toEqual(vm.ele.$el)
  })

  it('should be ok if target invalid', async () => {
    const wrapper = createWrapper(
      '<div>' +
        '<typeahead ref="typeahead" :target="ele" v-model="model"></typeahead>' +
        '</div>',
      {
        ele: { a: 1 },
        model: null,
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(vm.$refs.typeahead.inputEl).toBeNull()
  })

  it.skip('should be able to use string arr async returns', async () => {
    const wrapper = createWrapper(
      '<div>' +
        '<input ref="input">' +
        '<typeahead :target="ele" v-model="model" async-src="https://api.github.com/search/users?q="></typeahead>' +
        '</div>',
      {
        ele: null,
        model: null,
      },
      {
        mounted() {
          this.ele = this.$refs.input
        },
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'a'
    triggerEvent(input, 'input')
    await sleep(600)
    server.requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(['aa', 'ab', 'ac'])
    )
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(3)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).toEqual('aa')
    Element.prototype.matches = savedMatches
  })

  it.skip('should be able to handel async typeahead error', async () => {
    const wrapper = createWrapper(
      '<div>' +
        '<input ref="input">' +
        '<typeahead @loaded-error="onErr" :target="ele" v-model="model" async-src="https://api.github.com/search/users?q="></typeahead>' +
        '</div>',
      {
        ele: null,
        model: null,
        err: null,
      },
      {
        mounted() {
          this.ele = this.$refs.input
        },
        methods: {
          onErr() {
            this.err = 'error'
          },
        },
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    expect(vm.err).toBeNull()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    // matches don't work in here
    const savedMatches = Element.prototype.matches
    Element.prototype.matches = () => true
    input.value = 'wxsm'
    triggerEvent(input, 'input')
    await sleep(600)
    server.requests[0].respond(
      500,
      { 'Content-Type': 'application/json' },
      JSON.stringify([{ id: 1, text: 'Provide examples', done: true }])
    )
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
    expect(vm.err).toBeDefined()
    Element.prototype.matches = savedMatches
  })

  it('should be able to bind string data', async () => {
    const wrapper = createWrapper(
      '<div>' +
        '<input ref="input">' +
        '<typeahead :ignore-case="false" :target="ele" :data="data" v-model="model"></typeahead>' +
        '</div>',
      {
        data: ['aa', 'ab', 'bb'],
        ele: null,
        model: null,
      },
      {
        mounted() {
          this.ele = this.$refs.input
        },
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'a'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(2)
    const selected = dropdown.querySelector('li.active a')
    expect(selected.textContent).toEqual('aa')
    selected.click()
    await vm.$nextTick()
    expect(vm.model).toEqual('aa')
    expect(input.value).toEqual('aa')
    vm.model = 'bb'
    await vm.$nextTick()
    expect(vm.model).toEqual('bb')
    expect(input.value).toEqual('bb')
  })

  it('should be able to disable preselect', async () => {
    const wrapper = createWrapper(
      '<div>' +
        '<input ref="input">' +
        '<typeahead :preselect="false" :target="ele" :data="data" v-model="model"></typeahead>' +
        '</div>',
      {
        data: ['aa', 'ab', 'bb'],
        ele: null,
        model: '',
      },
      {
        mounted() {
          this.ele = this.$refs.input
        },
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
    input.value = 'a'
    triggerEvent(input, 'input')
    await vm.$nextTick()
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(2)
    expect(dropdown.querySelector('li.active a')).toBeNull()
    triggerKey(input, keyCodes.enter)
    await vm.$nextTick()
    expect(dropdown.className).not.toContain('open')
    expect(vm.model).toEqual('a')
    expect(input.value).toEqual('a')
    triggerEvent(input, 'input')
    await vm.$nextTick()
    triggerKey(input, keyCodes.down)
    await vm.$nextTick()
    expect(dropdown.querySelector('li.active a')).toBeDefined()
    expect(dropdown.querySelector('li.active a').textContent).toEqual('aa')
    dropdown.querySelector('li.active a').click()
    await vm.$nextTick()
    expect(vm.model).toEqual('aa')
    expect(input.value).toEqual('aa')
    expect(dropdown.className).not.toContain('open')
  })

  it.skip('should be able to use async-function and custom template', async () => {
    const wrapper = createWrapper(
      `  <section>
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
  </section>`,
      {
        model: '',
      },
      {
        methods: {
          queryFunction(query, done) {
            request('https://api.github.com/search/users?q=' + query)
              .then((data) => {
                done(data.items)
              })
              .catch((err) => {
                console.log(err)
              })
          },
        },
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    const input = vm.$el.querySelector('input')
    const dropdown = vm.$el.querySelector('.dropdown')
    expect(dropdown.className).not.toContain('open')
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
    await sleep(200)
    expect(dropdown.className).toContain('open')
    expect(dropdown.querySelectorAll('li').length).toEqual(1)
    const selected = dropdown.querySelector('li.active a span')
    expect(selected.textContent).toEqual('wxsms')
    Element.prototype.matches = savedMatches
  })
})
