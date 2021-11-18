import { createWrapper, nextTick, sleep } from '../../__test__/utils';
import { RouterLinkStub } from '@vue/test-utils';
import Btn from './Btn';

describe('Btn', () => {
  it('should be able to render btn types', () => {
    const wrapper = createWrapper(`<div>
<btn>Default</btn>
<btn type="primary">Primary</btn>
<btn type="success">Success</btn>
<btn type="info">Info</btn>
<btn type="warning">Warning</btn>
<btn type="danger">Danger</btn>
<btn type="link">Link</btn>
</div>`);
    const $btns = wrapper.findAll('button.btn');
    expect($btns.length).toEqual(7);
    // all render as type=button
    const $btnsType = wrapper.findAll('[type=button]');
    expect($btnsType.length).toEqual(7);
    // classnames
    expect($btns[0].classes()).toContain('btn-default');
    expect($btns[1].classes()).toContain('btn-primary');
    expect($btns[2].classes()).toContain('btn-success');
    expect($btns[3].classes()).toContain('btn-info');
    expect($btns[4].classes()).toContain('btn-warning');
    expect($btns[5].classes()).toContain('btn-danger');
    expect($btns[6].classes()).toContain('btn-link');
  });

  it('should be able to render link btn', () => {
    const wrapper = createWrapper(`<div><h4>Native links</h4>
<btn href="#">Default</btn>
<btn href="#" type="primary">Primary</btn>
<h4>Vue Router links</h4>
<btn to="/">Default</btn>
<btn to="/" type="primary">Primary</btn></div>`);
    expect(wrapper.findAll('button').length).toEqual(0);
    expect(wrapper.findAll('a.btn').length).toEqual(4);
    // native links
    const $btn = wrapper.findAll('.btn');
    const $btn0 = $btn[0];
    expect($btn0.attributes('class')).toContain('btn-default');
    expect($btn0.attributes('href')).toEqual('#');
    expect($btn0.attributes('role')).toEqual('button');
    const $btn1 = $btn[1];
    expect($btn1.attributes('class')).toContain('btn-primary');
    expect($btn1.attributes('href')).toEqual('#');
    expect($btn1.attributes('role')).toEqual('button');
    // router links
    const $btn2 = $btn[2];
    expect($btn2.attributes('class')).toContain('btn-default');
    expect($btn2.findComponent(RouterLinkStub).props('to')).toEqual('/');
    expect($btn2.attributes('role')).toEqual('button');
    const $btn3 = $btn[3];
    expect($btn3.attributes('class')).toContain('btn-primary');
    expect($btn3.findComponent(RouterLinkStub).props('to')).toEqual('/');
    expect($btn3.attributes('role')).toEqual('button');
  });

  it('should be able to render different size btn', () => {
    const wrapper = createWrapper(`<div>
  <btn size="lg" type="primary">Large button</btn>
  <btn size="lg">Large button</btn>
  <btn type="primary">Default button</btn>
  <btn>Default button</btn>
  <btn size="sm" type="primary">Small button</btn>
  <btn size="sm">Small button</btn>
  <btn size="xs" type="primary">Extra small button</btn>
  <btn size="xs">Extra small button</btn>
</div>`);
    const $btn = wrapper.findAll('.btn');
    expect($btn.length).toEqual(8);
    expect($btn[0].classes()).toContain('btn-lg');
    expect($btn[1].classes()).toContain('btn-lg');
    expect($btn[4].classes()).toContain('btn-sm');
    expect($btn[5].classes()).toContain('btn-sm');
    expect($btn[6].classes()).toContain('btn-xs');
    expect($btn[7].classes()).toContain('btn-xs');
  });

  it('should be able to render block level btn', () => {
    const wrapper =
      createWrapper(`<div><btn block size="lg" type="primary">Block level button</btn>
<btn block size="lg">Block level button</btn></div>`);
    expect(wrapper.findAll('.btn.btn-block').length).toEqual(2);
  });

  it('should be able to render active btn', () => {
    const wrapper = createWrapper(`<div><h4>Buttons</h4>
<btn active type="primary">Primary button</btn>
<btn active>Button</btn>
<h4>Links</h4>
<btn active href="#" type="primary">Primary button</btn>
<btn active to="/">Button</btn></div>`);
    expect(wrapper.findAll('.btn.active').length).toEqual(4);
    expect(wrapper.findAll('button.active').length).toEqual(2);
    expect(wrapper.findAll('a.active').length).toEqual(2);
  });

  it('should be able to render disabled btn', () => {
    const wrapper = createWrapper(`<div><h4>Buttons</h4>
<btn disabled type="primary">Primary button</btn>
<btn disabled>Button</btn>
<h4>Links</h4>
<btn disabled href="#" type="primary">Primary button</btn>
<btn disabled to="/">Button</btn></div>`);
    expect(wrapper.findAll('.btn').length).toEqual(4);
    expect(wrapper.findAll('.btn.disabled').length).toEqual(4);
    expect(wrapper.findAll('.btn[disabled]').length).toEqual(2);
  });

  it('should not response on disabled link btn click', async () => {
    const wrapper = createWrapper(`<div><h4>Buttons</h4>
<btn disabled type="primary">Primary button</btn>
<btn disabled>Button</btn>
<h4>Links</h4>
<btn disabled href="#" type="primary">Primary button</btn>
<btn disabled to="/">Button</btn></div>`);
    expect(window.location.hash).toEqual('');
    const btn = wrapper.findAll('a.btn')[0];
    await btn.trigger('click');
    expect(window.location.hash).toEqual('');
  });

  it('should emit click event', async () => {
    const wrapper = createWrapper(
      '<btn @click="onClick">{{ msg }}</btn>',
      {
        msg: 'test',
      },
      {
        methods: {
          onClick() {
            this.msg = 'clicked';
          },
        },
      }
    );
    expect(wrapper.vm.msg).toEqual('test');
    await wrapper.findComponent(Btn).trigger('click');
    expect(wrapper.vm.msg).toEqual('clicked');
  });

  it('should not emit click event while disabled', async () => {
    const wrapper = createWrapper(
      '<btn disabled @click="onClick">{{ msg }}</btn>',
      {
        msg: 'test',
      },
      {
        methods: {
          onClick() {
            this.msg = 'clicked';
          },
        },
      }
    );
    expect(wrapper.vm.msg).toEqual('test');
    await wrapper.findComponent(Btn).trigger('click');
    expect(wrapper.vm.msg).toEqual('test');
  });

  it('should be able to render checkbox btn', async () => {
    const wrapper = createWrapper(
      `  <section>
    <btn-group>
      <btn input-type="checkbox" input-value="1" v-model="model">Checkbox 1</btn>
      <btn input-type="checkbox" input-value="2" v-model="model">Checkbox 2</btn>
      <btn input-type="checkbox" input-value="3" v-model="model">Checkbox 3</btn>
      <btn input-type="checkbox" input-value="4" v-model="model" disabled>Checkbox 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: ['1'],
      }
    );
    await sleep(500);
    expect(wrapper.findAll('label.btn').length).toEqual(4);
    expect(wrapper.findAll('label.btn > input[type=checkbox]').length).toEqual(
      4
    );
    // first one should be actived by default
    expect(wrapper.findAll('label.btn.active').length).toEqual(1);
    // expect(
    //   wrapper.findAll('label.btn > input[type=checkbox]')[0].attributes()
    // ).toEqual('checked')
    expect(wrapper.findAll('label.btn')[0].classes()).toContain('active');
    // last one shoubd be disabled by default
    expect(wrapper.findAll('label.btn.disabled').length).toEqual(1);
    expect(
      wrapper.findAll('label.btn.disabled > input[disabled]').length
    ).toEqual(1);
    expect(wrapper.findAll('label.btn')[3].classes()).toContain('disabled');
  });

  it('should be able to select checkbox btn', async () => {
    const wrapper = createWrapper(
      `  <section>
    <btn-group>
      <btn input-type="checkbox" input-value="1" v-model="model">Checkbox 1</btn>
      <btn input-type="checkbox" input-value="2" v-model="model">Checkbox 2</btn>
      <btn input-type="checkbox" input-value="3" v-model="model">Checkbox 3</btn>
      <btn input-type="checkbox" input-value="4" v-model="model" disabled>Checkbox 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: ['1'],
      }
    );
    await wrapper.findAll('label.btn > input')[1].trigger('change');
    // active second one
    expect(wrapper.findAll('label.btn.active').length).toEqual(2);
    expect(wrapper.findAll('label.btn')[0].classes()).toContain('active');
    expect(wrapper.findAll('label.btn')[1].classes()).toContain('active');
    expect(
      wrapper.findAll('label.btn > input[type=checkbox]')[3].classes()
    ).not.toContain('active');
    expect(wrapper.findAll('label.btn')[1].classes()).toContain('active');
    // model change
    expect(wrapper.vm.model.length).toEqual(2);
    expect(wrapper.vm.model.indexOf('1')).toBeGreaterThanOrEqual(0);
    expect(wrapper.vm.model.indexOf('2')).toBeGreaterThanOrEqual(0);
  });

  it('should be able to un-select checkbox btn', async () => {
    const wrapper = createWrapper(
      `  <section>
    <btn-group>
      <btn input-type="checkbox" input-value="1" v-model="model">Checkbox 1</btn>
      <btn input-type="checkbox" input-value="2" v-model="model">Checkbox 2</btn>
      <btn input-type="checkbox" input-value="3" v-model="model">Checkbox 3</btn>
      <btn input-type="checkbox" input-value="4" v-model="model" disabled>Checkbox 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: ['1'],
      }
    );
    await wrapper.findAll('label.btn > input')[0].trigger('click');
    expect(wrapper.findAll('label.btn.active').length).toEqual(0);
    // model change
    expect(wrapper.vm.model.length).toEqual(0);
  });

  it('should be able to render radio btn', async () => {
    const wrapper = createWrapper(
      `  <section>
    <btn-group>
      <btn input-type="radio" input-value="1" v-model="model">Radio 1</btn>
      <btn input-type="radio" input-value="2" v-model="model">Radio 2</btn>
      <btn input-type="radio" input-value="3" v-model="model">Radio 3</btn>
      <btn input-type="radio" input-value="4" v-model="model" disabled>Radio 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: '1',
      }
    );
    expect(wrapper.findAll('label.btn').length).toEqual(4);
    expect(wrapper.findAll('label.btn > input[type=radio]').length).toEqual(4);
    // active first one
    expect(wrapper.findAll('label.btn.active').length).toEqual(1);
    // expect(
    //   wrapper.findAll('label.btn > input[type=radio]')[0].attributes('checked')
    // ).toEqual('checked')
    expect(wrapper.findAll('label.btn')[0].classes()).toContain('active');
    // disabled last one
    expect(wrapper.findAll('label.btn.disabled').length).toEqual(1);
    expect(
      wrapper.findAll('label.btn.disabled > input[disabled]').length
    ).toEqual(1);
    expect(wrapper.findAll('label.btn')[3].classes()).toContain('disabled');
  });

  it('should be able to select radio btn', async () => {
    const wrapper = createWrapper(
      `  <section>
    <btn-group>
      <btn input-type="radio" input-value="1" v-model="model">Radio 1</btn>
      <btn input-type="radio" input-value="2" v-model="model">Radio 2</btn>
      <btn input-type="radio" input-value="3" v-model="model">Radio 3</btn>
      <btn input-type="radio" input-value="4" v-model="model" disabled>Radio 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: '1',
      }
    );
    wrapper.findAll('label.btn > input')[1].trigger('change');
    await nextTick();
    // active second one
    expect(wrapper.findAll('label.btn.active').length).toEqual(1);
    expect(wrapper.findAll('label.btn')[0].classes()).not.toContain('active');
    expect(wrapper.findAll('label.btn')[1].classes()).toContain('active');
    expect(wrapper.findAll('label.btn')[3].classes()).not.toContain('active');
    expect(wrapper.findAll('label.btn')[1].classes()).toContain('active');
    // model change
    expect(wrapper.vm.model).toEqual('2');
  });

  it('should not be able to un-select radio btn', async () => {
    const wrapper = createWrapper(
      `  <section>
    <btn-group>
      <btn input-type="radio" input-value="1" v-model="model">Radio 1</btn>
      <btn input-type="radio" input-value="2" v-model="model">Radio 2</btn>
      <btn input-type="radio" input-value="3" v-model="model">Radio 3</btn>
      <btn input-type="radio" input-value="4" v-model="model" disabled>Radio 4 (Disabled)</btn>
    </btn-group>
    <hr/>
    <alert>Selected: {{model}}</alert>
  </section>`,
      {
        model: '1',
      }
    );
    await nextTick();
    wrapper.findAll('label.btn > input')[0].trigger('click');
    // active second one
    expect(wrapper.findAll('label.btn.active').length).toEqual(1);
    expect(wrapper.findAll('label.btn')[0].classes()).toContain('active');
    expect(wrapper.findAll('label.btn')[1].classes()).not.toContain('active');
    expect(wrapper.findAll('label.btn')[3].classes()).not.toContain('active');
    expect(wrapper.findAll('label.btn')[0].classes()).toContain('active');
    // model change
    expect(wrapper.vm.model).toEqual('1');
  });

  it('should be able to render as justified', async () => {
    const wrapper = createWrapper('<btn justified>test</btn>');
    expect(wrapper.classes()).toContain('btn-group');
    const btn = wrapper.find('.btn');
    expect(btn).toBeDefined();
    expect(btn.text()).toEqual('test');
  });
});
