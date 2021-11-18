import newLocale from '../../locale/lang/zh-CN';
import {
  createWrapper,
  keyCodes,
  nextTick,
  sleep,
  transition,
  triggerEvent,
} from '../../__test__/utils';
import { RouterLinkStub } from '@vue/test-utils';
import Modal from './Modal';

function baseVm() {
  return createWrapper(
    `<section>
    <btn type="primary" @click="open=true">Launch Demo Modal</btn>
    <modal v-model="open" title="Modal 1" @hide="callback" ref="modal" id="modal-demo">
      <h4>Text in a modal</h4>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <h4>Popover in a modal</h4>
      <p>
        This
        <btn v-popover:modal-demo="{title:'Title',content:'Some popover content...'}">button</btn>
        should trigger a popover on click.
      </p>
      <h4>Tooltips in a modal</h4>
      <p>
        <a role="button" v-tooltip:modal-demo="'Tooltip'">This link</a>
        <span>and</span>
        <a role="button" v-tooltip:modal-demo="'Tooltip'">that link</a>
        <span>should have tooltips on hover.</span>
      </p>
      <hr>
      <h4>Overflowing text to show scroll behavior</h4>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    </modal>
  </section>`,
    {
      open: false,
    },
    {
      methods: {
        callback(msg) {
          this.$notify(`Modal dismissed with msg '${msg}'.`);
        },
      },
    }
  );
}

describe('Modal', () => {
  const getBackdropsNum = () =>
    document.querySelectorAll('.modal-backdrop').length;
  const expectBodyOverflow = (enable) => {
    if (enable) {
      // expect(document.body.style.paddingRight).toEqual('')
      expect(document.body.className).not.toContain('modal-open');
    } else {
      // expect(document.body.style.paddingRight).toContain('px')
      expect(document.body.className).toContain('modal-open');
    }
  };

  it('should aware backdrop keydown & keyup to hide', async () => {
    const wrapper = createWrapper(
      `<section>
    <modal v-model="open1" title="Modal 1" ref="modal">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
    </modal>
  </section>`,
      {
        open1: true,
      }
    );
    await nextTick();
    // simulate window mousedown
    wrapper.vm.$refs.modal.suppressBackgroundClose({
      target: wrapper.vm.$refs.modal.$el,
    });
    await nextTick();
    expect(wrapper.vm.$refs.modal.isCloseSuppressed).toBeUndefined();
    // simulate window mouseup
    wrapper.vm.$refs.modal.unsuppressBackgroundClose();
    // simulate window click
    wrapper.vm.$refs.modal.backdropClicked();
    await sleep(transition);
    expect(wrapper.vm.$refs.modal.isCloseSuppressed).toBeUndefined();
    expect(wrapper.vm.$refs.modal.$el.className).not.toContain('in');
  });

  it('should suppress inside modal keydown & keyup to prevent unexpected hiding', async () => {
    const wrapper = createWrapper(
      `<section>
    <modal v-model="open1" title="Modal 1" ref="modal">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
    </modal>
  </section>`,
      {
        open1: true,
      }
    );
    await nextTick();
    // simulate window mousedown
    wrapper.vm.$refs.modal.suppressBackgroundClose({ target: window });
    await nextTick();
    expect(wrapper.vm.$refs.modal.isCloseSuppressed).toBeTruthy();
    // simulate window mouseup
    wrapper.vm.$refs.modal.unsuppressBackgroundClose();
    // simulate window click
    wrapper.vm.$refs.modal.backdropClicked();
    await sleep(transition);
    expect(wrapper.vm.$refs.modal.isCloseSuppressed).toBeFalsy();
    expect(wrapper.vm.$refs.modal.$el.className).toContain('in');
  });

  it('should be able to use nested modals (logically)', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px';
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open1=true">Open set of nested modals (logically)</btn>
    <modal v-model="open1" title="Modal 1" size="lg">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <btn type="info" @click="open2=true">Open Modal 2</btn>
    </modal>
    <modal v-model="open2" title="Modal 2">
      <p>This is a nested modal.</p>
      <btn type="info" @click="open3=true">Open Modal 3</btn>
    </modal>
    <modal v-model="open3" title="Modal 3" size="sm">
      <p>This is another nested modal.</p>
    </modal>
  </section>`,
      {
        open1: false,
        open2: false,
        open3: false,
      }
    );
    await nextTick();
    const modal1 = wrapper.findAll('.modal')[0];
    const modal2 = wrapper.findAll('.modal')[1];
    const modal3 = wrapper.findAll('.modal')[2];
    const trigger = wrapper.findAll('.btn')[0];
    const trigger2 = wrapper.findAll('.modal .modal-body .btn')[0];
    const trigger3 = wrapper.findAll('.modal .modal-body .btn')[1];
    expect(getBackdropsNum()).toEqual(0);
    // open modal 1
    await trigger.trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).not.toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(1);
    expect(modal1.element.style.zIndex).toEqual('');
    expect(
      document.querySelectorAll('.modal-backdrop')[0].style.zIndex
    ).toEqual('');
    expectBodyOverflow(false);
    // open modal 2
    await trigger2.trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(2);
    expect(modal2.element.style.zIndex).toEqual('1070');
    expect(
      document.querySelectorAll('.modal-backdrop')[1].style.zIndex
    ).toEqual('1060');
    expectBodyOverflow(false);
    // open modal 3
    await trigger3.trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).toContain('in');
    expect(modal3.classes()).toContain('in');
    expect(getBackdropsNum()).toEqual(3);
    expect(modal3.element.style.zIndex).toEqual('1090');
    expect(
      document.querySelectorAll('.modal-backdrop')[2].style.zIndex
    ).toEqual('1080');
    expectBodyOverflow(false);
    // dismiss modal 3
    await modal3.find('.btn-primary').trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(2);
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false);
    // dismiss modal 2
    await modal2.find('.btn-primary').trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).not.toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(1);
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false);
    // dismiss modal 1
    await modal1.find('.btn-primary').trigger('click');
    await sleep(transition);
    expect(modal1.classes()).not.toContain('in');
    expect(modal2.classes()).not.toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(0);
    // body overflow should be enable now
    expectBodyOverflow(true);
    // reset body height
    document.body.style.height = '';
  });

  it('should be able to use nested modals', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px';
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open1=true">Open set of nested modals</btn>
    <!-- \`append-to-body\` not required here -->
    <modal v-model="open1" title="Modal 1" size="lg" ref="modal1">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <btn type="info" @click="open2=true">Open Modal 2</btn>
      <!-- \`append-to-body\` required, because this is a nested modal -->
      <modal v-model="open2" title="Modal 2" append-to-body ref="modal2">
        <p>This is a nested modal.</p>
        <btn type="info" @click="open3=true">Open Modal 3</btn>
        <!-- \`append-to-body\` required, because this is a nested modal -->
        <modal v-model="open3" title="Modal 3" size="sm" append-to-body ref="modal3">
          <p>This is another nested modal.</p>
        </modal>
      </modal>
    </modal>
  </section>`,
      {
        open1: false,
        open2: false,
        open3: false,
      }
    );
    await nextTick();
    // console.log(document.body.innerHTML)
    const modal1 = wrapper.findAll('.modal')[0];
    const modal2 = wrapper.findAll('.modal')[1];
    const modal3 = wrapper.findAll('.modal')[2];
    const trigger = wrapper.findAll('.btn')[0];
    const trigger2 = wrapper.findAll('.modal .modal-body .btn')[0];
    const trigger3 = wrapper.findAll('.modal .modal-body .btn')[1];
    expect(getBackdropsNum()).toEqual(0);
    // open modal 1
    await trigger.trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).not.toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(1);
    expect(modal1.element.style.zIndex).toEqual('');
    expect(
      document.querySelectorAll('.modal-backdrop')[0].style.zIndex
    ).toEqual('');
    expectBodyOverflow(false);
    // open modal 2
    await trigger2.trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(2);
    expect(modal2.element.style.zIndex).toEqual('1070');
    expect(
      document.querySelectorAll('.modal-backdrop')[1].style.zIndex
    ).toEqual('1060');
    expectBodyOverflow(false);
    // open modal 3
    await trigger3.trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).toContain('in');
    expect(modal3.classes()).toContain('in');
    expect(getBackdropsNum()).toEqual(3);
    expect(modal3.element.style.zIndex).toEqual('1090');
    // todo: why failed?
    // expect(
    //   wrapper.findAll('.modal-backdrop')[2].element.style.zIndex
    // ).toEqual('1080')
    expectBodyOverflow(false);
    // dismiss modal 3
    await modal3.find('.btn-primary').trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(2);
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false);
    // dismiss modal 2
    await modal2.findAll('.btn-primary')[0].trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    // expect(modal2.classes()).not.toContain('in')
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(1);
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false);
    // dismiss modal 1
    await modal1.findAll('.btn-primary')[0].trigger('click');
    await sleep(transition);
    expect(modal1.classes()).not.toContain('in');
    expect(modal2.classes()).not.toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(0);
    // body overflow should be enable now
    expectBodyOverflow(true);
    // reset body height
    document.body.style.height = '';
  });

  it('should be able destroy nested modals', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px';
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open1=true">Open set of nested modals</btn>
    <!-- \`append-to-body\` not required here -->
    <modal v-model="open1" title="Modal 1" size="lg" ref="modal1">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <btn type="info" @click="open2=true">Open Modal 2</btn>
      <!-- \`append-to-body\` required, because this is a nested modal -->
      <modal v-if="open2" v-model="open2" title="Modal 2" append-to-body ref="modal2">
        <p>This is a nested modal.</p>
        <btn type="info" @click="open3=true">Open Modal 3</btn>
      </modal>
    </modal>
  </section>`,
      {
        open1: false,
        open2: false,
        open3: false,
      }
    );
    await nextTick();
    const modal1 = wrapper.findAll('.modal')[0];
    const trigger = wrapper.findAll('.btn')[0];
    expect(getBackdropsNum()).toEqual(0);
    // open modal 1
    trigger.trigger('click');
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expectBodyOverflow(false);
    // open modal 2
    wrapper.vm.open2 = true;
    await sleep(transition);
    expect(getBackdropsNum()).toEqual(2);
    expectBodyOverflow(false);
    // dismiss modal 2
    wrapper.vm.open2 = false;
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(getBackdropsNum()).toEqual(1);
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false);
    // dismiss modal 1
    modal1.find('.btn-primary').trigger('click');
    await sleep(transition);
    expect(modal1.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(0);
    // body overflow should be enable now
    expectBodyOverflow(true);
    // reset body height
    document.body.style.height = '';
  });

  it('should be able to open modal 1', async () => {
    const wrapper = baseVm();
    const trigger = wrapper.findAll('.btn')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.findAll('.modal')[0].classes()).toContain('in');
    expect(wrapper.findAll('.modal-title')[0].text()).toEqual('Modal 1');
  });

  it('should be able to close by esc key click', async () => {
    const wrapper = baseVm();
    const trigger = wrapper.findAll('.btn')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.findAll('.modal')[0].classes()).toContain('in');
    expect(wrapper.findAll('.modal-title')[0].text()).toEqual('Modal 1');
    wrapper.vm.$refs.modal.onKeyPress({ keyCode: 28 }); // not a esc key
    await nextTick();
    expect(wrapper.vm.open).toEqual(true);
    wrapper.vm.$refs.modal.onKeyPress({ keyCode: 27 }); // esc key
    await nextTick();
    expect(wrapper.vm.open).toEqual(false);
  });

  it('should be able to close modal 1 and fire callback', async () => {
    const wrapper = baseVm();
    const trigger = wrapper.findAll('.btn')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.findAll('.modal')[0].classes()).toContain('in');
    expect(wrapper.findAll('.modal-title')[0].text()).toEqual('Modal 1');
    await triggerEvent(wrapper.findAll('button.close')[0], 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(wrapper.findAll('.modal')[0].classes()).not.toContain('in');
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toContain('dismiss');
  });

  it('should be able to close modal 1 with ok option and fire callback', async () => {
    const wrapper = baseVm();
    const trigger = wrapper.findAll('.btn')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.findAll('.modal')[0].classes()).toContain('in');
    expect(wrapper.findAll('.modal-title')[0].text()).toEqual('Modal 1');
    await triggerEvent(wrapper.findAll('.modal-footer button')[1], 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(wrapper.findAll('.modal')[0].classes()).not.toContain('in');
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toContain('ok');
  });

  it('should be able to render large modal', async () => {
    const wrapper = createWrapper(
      ` <section>
    <btn type="primary" @click="open1=true">Large Modal</btn>
    <modal v-model="open1" title="Modal Title" size="lg">
      <p>This is a large modal.</p>
    </modal>
  </section>`,
      {
        open1: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    expect(
      modal.querySelector('.modal-dialog.modal-lg').textContent
    ).toBeDefined();
  });

  it('should be able to render small modal', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open2=true">Small Modal</btn>
    <modal v-model="open2" title="Modal Title" size="sm">
      <p>This is a small modal.</p>
    </modal>
  </section>`,
      {
        open2: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    expect(
      modal.querySelector('.modal-dialog.modal-sm').textContent
    ).toBeDefined();
  });

  it('should be able to render HTML title modal', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open1=true">HTML Title</btn>
    <modal v-model="open1">
      <span slot="title"><i class="glyphicon glyphicon-heart"></i> Modal Title</span>
      <p>This is a modal with HTML title.</p>
    </modal>
  </section>`,
      {
        open1: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    expect(modal.querySelector('.modal-title i')).toBeDefined();
  });

  it('should be able to render no header modal', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open2=true">No Header</btn>
    <modal v-model="open2" :header="false">
      <p>This is a modal with no header.</p>
    </modal>
  </section>`,
      {
        open2: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    expect(modal.querySelector('.modal-header')).toBeNull();
  });

  it('should be able to render customize footer modal', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open1=true">Custom Footer</btn>
    <modal v-model="open1" title="Modal Title">
      <p>This is a modal with custom footer.</p>
      <template #footer>
         <btn @click="open1=false">Cancel</btn>
        <btn type="warning">Warning Action</btn>
        <btn type="danger">Danger Action</btn>
      </template>
    </modal>
  </section>`,
      {
        open1: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    expect(modal.querySelectorAll('.modal-footer button').length).toEqual(3);
  });

  it('should be able to render no footer modal', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open2=true">No Footer</btn>
    <modal v-model="open2" title="Modal Title" :footer="false">
      <p>This is a modal with no footer.</p>
    </modal>
  </section>`,
      {
        open2: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    expect(modal.querySelector('.modal-footer')).toBeNull();
  });

  it('should be able to close customize footer modal', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open1=true">Custom Footer</btn>
    <modal v-model="open1" title="Modal Title">
      <p>This is a modal with custom footer.</p>
      <template #footer>
        <btn @click="open1=false">Cancel</btn>
        <btn type="warning">Warning Action</btn>
        <btn type="danger">Danger Action</btn>
      </template>
    </modal>
  </section>`,
      {
        open1: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    expect(modal.querySelectorAll('.modal-footer button').length).toEqual(3);
    await triggerEvent(wrapper.find('.modal-footer button'), 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(modal.className).not.toContain('in');
  });

  it('should be able to customize button texts and types', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open=true">Custom Button Text and Type</btn>
    <modal v-model="open" title="Are you sure?"
           ok-text="Yes, please" cancel-text="No way!"
           ok-type="danger" cancel-type="warning">
      <p>Do you really want to destroy this item?</p>
    </modal>
  </section>`,
      {
        open: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.findAll('.modal')[0];
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.classes()).toContain('in');
    const btns = modal.findAll('.modal-footer button');
    expect(btns[0].text()).toEqual('No way!');
    expect(btns[0].classes()).toContain('btn-warning');
    expect(btns[1].text()).toEqual('Yes, please');
    expect(btns[1].classes()).toContain('btn-danger');
  });

  it('should be able to auto-focus on ok btn', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open=true">Auto Focus</btn>
    <modal v-model="open" title="Modal Title" auto-focus>
      <p>Check this out! The OK button is focused now.</p>
    </modal>
  </section>`,
      {
        open: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition + 100);
    expect(
      wrapper.vm.$el
        .querySelector('[data-action="auto-focus"]')
        .getAttribute('data-focused')
    ).toEqual('true');
  });

  it('should be ok if auto-focus is true and no data-action=auto-focus present', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open=true">Auto Focus</btn>
    <modal v-model="open" title="Modal Title" auto-focus>
      <template #footer><button>ok</button></template>
    </modal>
  </section>`,
      {
        open: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition + 100);
    expect(
      wrapper.vm.$el.querySelector('[data-action="auto-focus"]')
    ).toBeNull();
  });

  it('should be able to close modal on backdrop click', async () => {
    const wrapper = baseVm();
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    await triggerEvent(wrapper.find('.modal'), 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(modal.className).not.toContain('in');
  });

  it('should not be able to close backdrop-false modal', async () => {
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open=true">Disable Backdrop</btn>
    <modal v-model="open" title="Modal Title" :backdrop="false">
      <p>This is a modal that can not close by backdrop click.</p>
    </modal>
  </section>`,
      {
        open: false,
      }
    );
    const trigger = wrapper.findAll('.btn')[0];
    const modal = wrapper.vm.$el.querySelectorAll('.modal')[0];
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    await triggerEvent(trigger, 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
    await triggerEvent(wrapper.find('.modal'), 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(modal.className).toContain('in');
  });

  it('should be able to open modal on init', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1"><p>This is a simple modal.</p></modal>',
      {
        open: true,
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.$el.className).toContain('in');
    expect(wrapper.vm.$el.querySelector('.close')).toBeDefined();
  });

  it('should be able to hide dismiss btn', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1" :dismiss-btn="false"><p>This is a simple modal.</p></modal>',
      {
        open: true,
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.$el.className).toContain('in');
    expect(wrapper.vm.$el.querySelector('.close')).toBeNull();
  });

  it('should be able to use `beforeClose`', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>',
      {
        open: true,
        msg: 'ok',
      },
      {
        methods: {
          beforeClose() {
            this.msg = 'test';
            return true;
          },
        },
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.msg).toEqual('ok');
    wrapper.vm.$el.querySelector('button.close').click();
    await sleep(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(wrapper.vm.msg).toEqual('test');
  });

  it('should be able to interrupt hide with `beforeClose`', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>',
      {
        open: true,
        msg: 'ok',
        dismissible: false,
      },
      {
        methods: {
          beforeClose() {
            return this.dismissible;
          },
        },
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.msg).toEqual('ok');
    wrapper.vm.$el.querySelector('button.close').click();
    await sleep(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    wrapper.vm.dismissible = true;
    await nextTick();
    wrapper.vm.$el.querySelector('button.close').click();
    await sleep(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should be able to use `beforeClose` when promise not supported', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>',
      {
        open: true,
        msg: 'ok',
      },
      {
        methods: {
          beforeClose() {
            this.msg = 'test';
            return true;
          },
        },
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.msg).toEqual('ok');
    const _promise = window.Promise;
    window.Promise = undefined;
    wrapper.vm.$el.querySelector('button.close').click();
    window.Promise = _promise;
    await sleep(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(wrapper.vm.msg).toEqual('test');
  });

  it('should be able to interrupt hide with `beforeClose` promise is not supported', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>',
      {
        open: true,
        msg: 'ok',
      },
      {
        methods: {
          beforeClose() {
            this.msg = 'test';
            return false;
          },
        },
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.msg).toEqual('ok');
    const _promise = window.Promise;
    window.Promise = undefined;
    wrapper.vm.$el.querySelector('button.close').click();
    window.Promise = _promise;
    await sleep(transition);
    await nextTick();
    expect(wrapper.vm.msg).toEqual('test');
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
  });

  it('should be able to use `beforeClose` when result is promise', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>',
      {
        open: true,
        msg: 'ok',
      },
      {
        methods: {
          beforeClose() {
            this.msg = 'test';
            return new Promise((resolve) => {
              resolve(true);
            });
          },
        },
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.msg).toEqual('ok');
    wrapper.vm.$el.querySelector('button.close').click();
    await sleep(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(wrapper.vm.msg).toEqual('test');
  });

  it('should be able to interrupt hide with `beforeClose` when result is promise', async () => {
    const wrapper = createWrapper(
      '<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>',
      {
        open: true,
        msg: 'ok',
      },
      {
        methods: {
          beforeClose() {
            this.msg = 'test';
            return new Promise((resolve) => {
              resolve(false);
            });
          },
        },
      }
    );
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(wrapper.vm.msg).toEqual('ok');
    wrapper.vm.$el.querySelector('button.close').click();
    await sleep(transition);
    await nextTick();
    expect(wrapper.vm.msg).toEqual('test');
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
  });

  it('should close the top most modal only when ESC pressed', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px';
    const wrapper = createWrapper(
      `<section>
    <btn type="primary" @click="open1=true">Open set of nested modals</btn>
    <!-- \`append-to-body\` not required here -->
    <modal v-model="open1" title="Modal 1" size="lg" ref="modal1">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <btn type="info" @click="open2=true">Open Modal 2</btn>
      <!-- \`append-to-body\` required, because this is a nested modal -->
      <modal v-model="open2" title="Modal 2" append-to-body ref="modal2">
        <p>This is a nested modal.</p>
        <btn type="info" @click="open3=true">Open Modal 3</btn>
        <!-- \`append-to-body\` required, because this is a nested modal -->
        <modal v-model="open3" title="Modal 3" size="sm" append-to-body ref="modal3">
          <p>This is another nested modal.</p>
        </modal>
      </modal>
    </modal>
  </section>`,
      {
        open1: false,
        open2: false,
        open3: false,
      }
    );
    await nextTick();
    const modal1 = wrapper.findAll('.modal')[0];
    const modal2 = wrapper.findAll('.modal')[1];
    const modal3 = wrapper.findAll('.modal')[2];
    const trigger = wrapper.findAll('.btn')[0];
    const trigger2 = wrapper.findAll('.modal .modal-body .btn')[0];
    const trigger3 = wrapper.findAll('.modal .modal-body .btn')[1];
    expect(getBackdropsNum()).toEqual(0);
    // open modal 1
    trigger.trigger('click');
    await sleep(transition);
    // open modal 2
    trigger2.trigger('click');
    await sleep(transition);
    // open modal 3
    trigger3.trigger('click');
    await sleep(transition);
    // dismiss modal 3
    wrapper.vm.$refs.modal1.onKeyPress({ keyCode: 27 }); // esc key
    wrapper.vm.$refs.modal2.onKeyPress({ keyCode: 27 }); // esc key
    wrapper.vm.$refs.modal3.onKeyPress({ keyCode: 27 }); // esc key
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(2);
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false);
    // dismiss modal 2
    wrapper.vm.$refs.modal1.onKeyPress({ keyCode: 27 }); // esc key
    wrapper.vm.$refs.modal2.onKeyPress({ keyCode: 27 }); // esc key
    wrapper.vm.$refs.modal3.onKeyPress({ keyCode: 27 }); // esc key
    await sleep(transition);
    expect(modal1.classes()).toContain('in');
    expect(modal2.classes()).not.toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(1);
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false);
    // dismiss modal 1
    wrapper.vm.$refs.modal1.onKeyPress({ keyCode: 27 }); // esc key
    wrapper.vm.$refs.modal2.onKeyPress({ keyCode: 27 }); // esc key
    wrapper.vm.$refs.modal3.onKeyPress({ keyCode: 27 }); // esc key
    await sleep(transition);
    expect(modal1.classes()).not.toContain('in');
    expect(modal2.classes()).not.toContain('in');
    expect(modal3.classes()).not.toContain('in');
    expect(getBackdropsNum()).toEqual(0);
    // body overflow should be enable now
    expectBodyOverflow(true);
    // reset body height
    document.body.style.height = '';
  });
});
