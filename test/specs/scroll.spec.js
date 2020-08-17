import scroll from '../../src/directives/scroll'
import { createVm, destroyVm } from '../utils'

const HANDLER = '_uiv_scroll_handler'

describe('scroll directive', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to bind scroll function', async () => {
    vm = createVm('<div v-scroll="onScroll"></div>', {
      msg: 'hello'
    }, {
      directives: { scroll },
      methods: {
        onScroll () {
          // TODO
        }
      }
    })
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).to.equal(vm.onScroll)
  })

  it('should not bind non-function value', async () => {
    vm = createVm('<div v-scroll="msg"></div>', {
      msg: 'hello'
    }, {
      directives: { scroll }
    })
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).not.exist
  })

  it('should be able to get with fail callback', async () => {
    vm = createVm('<div v-scroll="msg"></div>', {
      msg: 'hello'
    }, {
      directives: { scroll }
    })
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).not.exist
    vm.msg = 'test'
    await vm.$nextTick()
    expect(vm.$el[HANDLER]).not.exist
  })
})
