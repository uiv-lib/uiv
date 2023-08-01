import { createWrapper, sleep, triggerEvent } from '../../__test__/utils';

describe('Tooltip', () => {
  beforeEach(() => {
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.paddingTop = '200px';
  });

  afterEach(() => {
    document.body.style.display = '';
    document.body.style.justifyContent = '';
    document.body.style.alignItems = '';
    document.body.style.paddingTop = '';
  });

  it('should be able to append to custom tags', async () => {
    const tag = document.createElement('div');
    tag.id = 'tag';
    document.body.appendChild(tag);
    const wrapper = createWrapper(
      '<tooltip trigger="focus" text="test" append-to="#tag"><button type="button">{{msg}}</button></tooltip>',
      {
        msg: 'hello',
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    triggerEvent(vm.$el.querySelector('button'), 'focus');
    await sleep(300);
    expect(tag.querySelector('.tooltip')).toBeDefined();
  });

  it('should be able to render with no content', async () => {
    const wrapper = createWrapper('<tooltip text="test"></tooltip>', {
      msg: 'hello',
    });
    const vm = wrapper.vm;
    await vm.$nextTick();
  });

  it('should be able to show tooltip on init', async () => {
    const wrapper = createWrapper(
      '<tooltip text="test" v-model="show"><button></button></tooltip>',
      {
        show: true,
      }
    );
    const vm = wrapper.vm;
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
  });

  it('should not show tooltip with empty text', async () => {
    const wrapper = createWrapper(
      '<tooltip v-model="show"><button></button></tooltip>',
      {
        show: true,
      }
    );
    const vm = wrapper.vm;
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to use custom target', async () => {
    const wrapper = createWrapper(
      '<div><button ref="btn" type="button">btn</button><tooltip text="test" :target="btn" trigger="focus"></tooltip></div>',
      { btn: null },
      {
        mounted() {
          this.btn = this.$refs.btn;
        },
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    triggerEvent(vm.btn, 'focus');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
  });

  it('should be able to use tooltip directive', async () => {
    const wrapper = createWrapper('<btn v-tooltip.click="msg">{{test}}</btn>', {
      msg: 'title',
      test: 'test',
    });
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el;
    triggerEvent(trigger, 'click');
    await sleep(300);
    let tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.querySelector('.tooltip-inner').textContent).toEqual(
      'title'
    );
    triggerEvent(trigger, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    // this should work
    vm.msg = 'title2';
    await vm.$nextTick();
    await vm.$nextTick();
    triggerEvent(trigger, 'click');
    await sleep(300);
    tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.querySelector('.tooltip-inner').textContent).toEqual(
      'title2'
    );
    triggerEvent(trigger, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    // this should not work
    vm.test = 'test2';
    await vm.$nextTick();
    triggerEvent(trigger, 'click');
    await sleep(300);
    tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.querySelector('.tooltip-inner').textContent).toEqual(
      'title2'
    );
  });

  it('directive with invalid modifiers should be ok', async () => {
    // invalid modifier should be ok
    const wrapper = createWrapper(
      '<btn v-tooltip.test1.test2.click="msg"></btn>',
      {
        msg: 'title',
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el;
    triggerEvent(trigger, 'click');
    await sleep(300);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.querySelector('.tooltip-inner').textContent).toEqual(
      'title'
    );
    triggerEvent(trigger, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should handle being updated while hiding when directive', async () => {
    const wrapper = createWrapper('<btn v-tooltip.hover="msg">{{test}}</btn>', {
      msg: 'title',
      test: 'test',
    });
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el;
    triggerEvent(trigger, 'mouseenter');
    await sleep(50);
    await wrapper.setData({ msg: 'title2' });
    triggerEvent(trigger, 'mouseleave');
    await sleep(100);
    triggerEvent(trigger, 'mouseenter');
    await sleep(150);
    const tooltip = document.querySelector('.tooltip');
    // console.log(document.body.innerHTML)
    expect(tooltip).toBeDefined();
    expect(tooltip.querySelector('.tooltip-inner').textContent).toEqual(
      'title2'
    );
  });

  it.skip('should handle being updated while showing when directive', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.hover="{ text: msg, showDelay: 150 }">{{test}}</btn>',
      {
        msg: 'title',
        test: 'test',
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el;
    triggerEvent(trigger, 'mouseenter');
    await sleep(50);
    vm.msg = 'title2';
    vm.test = 'test2';
    await vm.$nextTick();
    triggerEvent(trigger, 'mouseenter');
    await sleep(150);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.querySelector('.tooltip-inner')).toEqual('title2');
  });

  // fails on github ci but works locally, need to investigate
  it.skip('should support show and hide delay when directive', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.hover="{ text: msg, showDelay: 300, hideDelay: 400 }">test</btn>',
      {
        msg: 'title',
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el;
    triggerEvent(trigger, 'mouseenter');
    // not shown yet
    await sleep(150);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    await sleep(150);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    triggerEvent(trigger, 'mouseleave');
    await sleep(300);
    // not hidden yet
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    await sleep(400);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should clear timeouts correctly', async () => {
    const wrapper = createWrapper(
      "<tooltip ref='tooltip' :text='msg' trigger='hover'><btn>test</btn></tooltip>",
      {
        msg: 'title',
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    const tooltip = vm.$refs.tooltip;
    // handles empty timeoutids correctly
    tooltip.clearTimeouts();
    expect(tooltip.hideTimeoutId).toEqual(0);
    expect(tooltip.showTimeoutId).toEqual(0);
    expect(tooltip.transitionTimeoutId).toEqual(0);
    expect(tooltip.autoTimeoutId).toEqual(0);
    // handles populated timeoutids correctly
    tooltip.hideTimeoutId = setTimeout(() => 0, 500);
    tooltip.showTimeoutId = setTimeout(() => 0, 500);
    tooltip.transitionTimeoutId = setTimeout(() => 0, 500);
    tooltip.autoTimeoutId = setTimeout(() => 0, 500);
    tooltip.clearTimeouts();
    expect(tooltip.hideTimeoutId).toEqual(0);
    expect(tooltip.showTimeoutId).toEqual(0);
    expect(tooltip.transitionTimeoutId).toEqual(0);
    expect(tooltip.autoTimeoutId).toEqual(0);
  });

  it('should be able to show tooltip', async () => {
    const wrapper = createWrapper(`
<div>
<btn type="primary" id="btn">Hover me!</btn>
<tooltip text="Static tooltip content goes here" target="#btn"/>
</div>
    `);
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    const trigger = vm.$el.querySelector('button');
    // matches don't work in here
    const savedMatches = Element.prototype.matches;
    Element.prototype.matches = () => true;
    triggerEvent(trigger, 'focus');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    Element.prototype.matches = () => false;
    triggerEvent(trigger, 'blur');
    await sleep(400);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    Element.prototype.matches = savedMatches;
  });

  it('should be able to change trigger to manual', async () => {
    const wrapper = createWrapper(
      `
  <section>
    <tooltip text="Static tooltip content goes here" trigger="manual" v-model="show">
      <btn>You Can't Trigger Tooltip Here...</btn>
    </tooltip>
    <hr/>
    <btn type="primary" @click="show = !show">Toggle Tooltip</btn>
  </section>
    `,
      {
        show: false,
      }
    );
    const vm = wrapper.vm;
    vm.show = true;
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    vm.show = false;
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to toggle correctly on fast click', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.click="\'Static tooltip content\'" type="primary">Click</btn>'
    );
    const vm = wrapper.vm;
    const button = vm.$el;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    triggerEvent(button, 'click');
    triggerEvent(button, 'click');
    triggerEvent(button, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    triggerEvent(button, 'click');
    triggerEvent(button, 'click');
    triggerEvent(button, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to change trigger to click', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.click="\'Static tooltip content\'" type="primary">Click</btn>'
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    triggerEvent(vm.$el, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    triggerEvent(vm.$el, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to change trigger to outside-click', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.outside-click="\'Static tooltip content\'" type="primary">Outside-Click</btn>'
    );
    const vm = wrapper.vm;
    const button = vm.$el;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    triggerEvent(button, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    document.body.click();
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to disable', async () => {
    const wrapper =
      createWrapper(`<tooltip text="Static tooltip content goes here" :enable="false">
  <btn type="primary">Disabled Tooltip</btn>
</tooltip>`);
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    const savedMatches = Element.prototype.matches;
    Element.prototype.matches = () => true;
    triggerEvent(vm.$el.querySelector('button'), 'focus');
    await sleep(300);
    Element.prototype.matches = savedMatches;
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to change placement to top', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.top="\'Tooltip content on top\'" type="primary">Top</btn>'
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    const trigger = vm.$el;
    const savedMatches = Element.prototype.matches;
    Element.prototype.matches = () => true;
    triggerEvent(trigger, 'focus');
    await sleep(300);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.className).toContain('top');
    Element.prototype.matches = () => false;
    triggerEvent(trigger, 'blur');
    await sleep(400);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    Element.prototype.matches = savedMatches;
  });

  it('should be able to change placement to bottom', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.bottom="\'Tooltip content on bottom\'" type="primary">Bottom</btn>'
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    const trigger = vm.$el;
    const savedMatches = Element.prototype.matches;
    Element.prototype.matches = () => true;
    triggerEvent(trigger, 'focus');
    await sleep(300);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.className).toContain('bottom');
    Element.prototype.matches = () => false;
    triggerEvent(trigger, 'blur');
    await sleep(400);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    Element.prototype.matches = savedMatches;
  });

  it('should be able to change placement to left', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.left="\'Tooltip content on left\'" type="primary">Left</btn>'
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    const trigger = vm.$el;
    const savedMatches = Element.prototype.matches;
    Element.prototype.matches = () => true;
    triggerEvent(trigger, 'focus');
    await sleep(300);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.className).toContain('left');
    Element.prototype.matches = () => false;
    triggerEvent(trigger, 'blur');
    await sleep(400);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    Element.prototype.matches = savedMatches;
  });

  it('should be able to change placement to right', async () => {
    const wrapper = createWrapper(
      '<btn v-tooltip.right="\'Tooltip content on right\'" type="primary">Right</btn>'
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    const trigger = vm.$el;
    const savedMatches = Element.prototype.matches;
    Element.prototype.matches = () => true;
    triggerEvent(trigger, 'focus');
    await sleep(300);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.className).toContain('right');
    Element.prototype.matches = () => false;
    triggerEvent(trigger, 'blur');
    await sleep(400);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    Element.prototype.matches = savedMatches;
  });

  it('should be able to change trigger in runtime', async () => {
    const wrapper = createWrapper(
      '<tooltip text="test" :trigger="trigger"><btn></btn></tooltip>',
      {
        trigger: 'focus',
      }
    );
    const vm = wrapper.vm;
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    await vm.$nextTick();
    const trigger = vm.$el.querySelector('button');
    triggerEvent(trigger, 'focus');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    vm.trigger = 'click';
    await vm.$nextTick();
    triggerEvent(trigger, 'blur');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    triggerEvent(trigger, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to change text in runtime', async () => {
    const wrapper = createWrapper(
      '<tooltip :text="msg" trigger="click"><btn>123</btn></tooltip>',
      {
        msg: 'text',
      }
    );
    const vm = wrapper.vm;
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    await vm.$nextTick();
    vm.msg = 'text2';
    await vm.$nextTick();
    await vm.$nextTick();
    const trigger = vm.$el.querySelector('button');
    triggerEvent(trigger, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    expect(document.querySelector('.tooltip-inner').textContent).toEqual(
      'text2'
    );
    const topBefore = document.querySelector('.tooltip').style.top;
    vm.msg = `This is a very very long text. This is a very very long text. This is a very very long text
    This is a very very long text. This is a very very long text. This is a very very long text`;
    await vm.$nextTick();
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    expect(document.querySelector('.tooltip-inner').textContent).toContain(
      'This is a very very long text'
    );
    await vm.$nextTick();
    const topAfter = document.querySelector('.tooltip').style.top;
    // TODO
    // expect(topAfter).not.toEqual(topBefore)
    vm.msg = '';
    await vm.$nextTick();
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });

  it('should be able to change enable in runtime', async () => {
    const wrapper = createWrapper(
      '<tooltip :text="msg" trigger="click" :enable="enable"><btn>123</btn></tooltip>',
      {
        msg: 'text',
        enable: true,
      }
    );
    const vm = wrapper.vm;
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    await vm.$nextTick();
    const trigger = vm.$el.querySelector('button');
    triggerEvent(trigger, 'click');
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(1);
    vm.enable = false;
    await vm.$nextTick();
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
    await vm.$nextTick();
    vm.enable = true;
    await vm.$nextTick();
    await sleep(300);
    expect(document.querySelectorAll('.tooltip').length).toEqual(0);
  });
});
