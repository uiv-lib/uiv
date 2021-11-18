import scroll from './scroll';
import {
  createWrapper,
  keyCodes,
  nextTick,
  sleep,
  transition,
  triggerEvent,
} from '../__test__/utils';

const HANDLER = '_uiv_scroll_handler';

describe('scroll directive', () => {
  it('should be able to bind scroll function', async () => {
    const wrapper = createWrapper(
      '<div v-scroll="onScroll"></div>',
      {
        msg: 'hello',
      },
      {
        directives: { scroll },
        methods: {
          onScroll() {
            // ignore
          },
        },
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(vm.$el[HANDLER]).toEqual(vm.onScroll);
  });

  it('should not bind non-function value', async () => {
    const wrapper = createWrapper(
      '<div v-scroll="msg"></div>',
      {
        msg: 'hello',
      },
      {
        directives: { scroll },
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(vm.$el[HANDLER]).not.toBeDefined();
  });

  it('should be able to get with fail callback', async () => {
    const wrapper = createWrapper(
      '<div v-scroll="msg"></div>',
      {
        msg: 'hello',
      },
      {
        directives: { scroll },
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(vm.$el[HANDLER]).not.toBeDefined();
    vm.msg = 'test';
    await vm.$nextTick();
    expect(vm.$el[HANDLER]).not.toBeDefined();
  });
});
