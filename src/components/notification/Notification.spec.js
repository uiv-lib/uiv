import { vi } from 'vitest';
import newLocale from '../../locale/lang/zh-CN';
import {
  createWrapper,
  keyCodes,
  nextTick,
  transition,
  triggerEvent,
} from '../../__test__/utils';
import { RouterLinkStub } from '@vue/test-utils';

const OFFSET = '15px';

function baseVm() {
  return createWrapper(
    `<section>
    <btn @click="notify" type="primary">Simplest Notification</btn>
    <btn @click="notify2" type="primary">No Auto-dismiss Notification</btn>
  </section>`,
    {},
    {
      methods: {
        // example with callback
        // pass a String as the notification content
        notify() {
          this.$notify('This is a simple notify msg.', () => {
            // callback after dismissed
            console.log('dismissed');
          });
        },
        // example with Promise and options
        notify2() {
          this.$notify({
            title: 'Title',
            content: 'This notification will not dismiss automatically.',
            duration: 0,
          }).then(() => {
            // resolve after dismissed
            console.log('dismissed');
          });
        },
      },
    }
  );
}

function typesVm() {
  return createWrapper(
    `<section>
    <btn @click="info" type="info">Info</btn>
    <btn @click="success" type="success">Success</btn>
    <btn @click="warning" type="warning">Warning</btn>
    <btn @click="danger" type="danger">Danger</btn>
  </section>`,
    {},
    {
      methods: {
        info() {
          this.$notify({
            type: 'info',
            title: 'Heads up!',
            content:
              "This alert needs your attention, but it's not super important.",
          });
        },
        success() {
          this.$notify({
            type: 'success',
            title: 'Well done!',
            content: 'You successfully read this important alert message.',
          });
        },
        warning() {
          // simple warning with content only
          this.$notify.warning(
            "Better check yourself, you're not looking too good."
          );
        },
        danger() {
          // error msg with title and content (other options available too)
          // `error` is an alias of `danger` (both of them works)
          this.$notify.error({
            title: 'Oh snap!',
            content: 'Change a few things up and try submitting again.',
          });
        },
      },
    }
  );
}

function placementVm() {
  return createWrapper(
    `<section>
    <btn @click="notify('top-right')" type="primary">Top Right (Default)</btn>
    <btn @click="notify('bottom-right')" type="primary">Bottom Right</btn>
    <btn @click="notify('bottom-left')" type="primary">Bottom Left</btn>
    <btn @click="notify('top-left')" type="primary">Top Left</btn>
  </section>`,
    {},
    {
      methods: {
        notify(placement) {
          this.$notify({
            placement, // equal to `placement: placement` in ES6
            title: 'Title',
            content: `This is a notify msg at ${placement}.`,
          });
        },
      },
    }
  );
}

describe('Notification', () => {
  let vm;
  let spy;
  let savedLog;

  beforeEach(() => {
    vi.useFakeTimers();
    savedLog = console.log;
    console.log = function () {
      return true;
    };

    spy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log = savedLog;
    vi.useRealTimers();
  });

  it('should be able to use notification', async () => {
    const wrapper = baseVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[0];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('alert-info');
    expect(alert.className).toContain('alert-dismissible');
    expect(alert.className).toContain('fade');
    expect(alert.className).toContain('in');
    expect(alert.querySelector('.media-heading')).toBeNull();
    expect(alert.querySelector('.media-body > div').textContent).toEqual(
      'This is a simple notify msg.'
    );
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
    expect(spy).toBeCalledWith('dismissed');
  });

  it('should be able to use no auto-dismiss notification', async () => {
    const wrapper = baseVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[1];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('alert-info');
    expect(alert.className).toContain('alert-dismissible');
    expect(alert.className).toContain('fade');
    expect(alert.className).toContain('in');
    expect(alert.querySelector('.media-heading').textContent).toEqual('Title');
    expect(alert.querySelectorAll('.media-body > div')[1].textContent).toEqual(
      'This notification will not dismiss automatically.'
    );
    vi.advanceTimersByTime(5000 + 1000);
    await nextTick();
    expect(document.querySelector('.alert')).toBeDefined();
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
    expect(spy).toBeCalledWith('dismissed');
  });

  it('should be able to use `type=info` notification', async () => {
    const wrapper = typesVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[0];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('alert-info');
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).toEqual(
      1
    );
    expect(
      alert.querySelectorAll('.media-left > .glyphicon-info-sign').length
    ).toBeGreaterThan(0);
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `type=success` notification', async () => {
    const wrapper = typesVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[1];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('alert-success');
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).toEqual(
      1
    );
    expect(
      alert.querySelectorAll('.media-left > .glyphicon-ok-sign').length
    ).toBeGreaterThan(0);
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `type=warning` notification', async () => {
    const wrapper = typesVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[2];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('alert-warning');
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).toEqual(
      1
    );
    expect(
      alert.querySelectorAll('.media-left > .glyphicon-info-sign').length
    ).toBeGreaterThan(0);
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `type=danger` notification', async () => {
    const wrapper = typesVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[3];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('alert-danger');
    expect(alert.querySelectorAll('.media-left > .glyphicon').length).toEqual(
      1
    );
    expect(
      alert.querySelectorAll('.media-left > .glyphicon-remove-sign').length
    ).toBeGreaterThan(0);
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `placement=top-right` notification', async () => {
    const wrapper = placementVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[0];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.style.top).toEqual(OFFSET);
    expect(alert.style.right).toEqual(OFFSET);
    expect(alert.style.bottom).toEqual('');
    expect(alert.style.left).toEqual('');
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `placement=bottom-right` notification', async () => {
    const wrapper = placementVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[1];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.style.top).toEqual('');
    expect(alert.style.right).toEqual(OFFSET);
    expect(alert.style.bottom).toEqual(OFFSET);
    expect(alert.style.left).toEqual('');
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `placement=bottom-left` notification', async () => {
    const wrapper = placementVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[2];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.style.top).toEqual('');
    expect(alert.style.right).toEqual('');
    expect(alert.style.bottom).toEqual(OFFSET);
    expect(alert.style.left).toEqual(OFFSET);
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `placement=top-left` notification', async () => {
    const wrapper = placementVm();
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[3];
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.style.top).toEqual(OFFSET);
    expect(alert.style.right).toEqual('');
    expect(alert.style.bottom).toEqual('');
    expect(alert.style.left).toEqual(OFFSET);
    alert.querySelector('button.close').click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use `dismissible=false` notification', async () => {
    const wrapper = createWrapper(
      '<div><btn @click="notify" type="primary">Notification Without Dismiss Button</btn></div>',
      {},
      {
        methods: {
          notify() {
            this.$notify({
              title: 'Title',
              content: 'This is a notification without dismiss btn.',
              dismissible: false,
            });
          },
        },
      }
    );
    const vm = wrapper.vm;
    await vm.$nextTick();
    const trigger = vm.$el.querySelectorAll('.btn')[0];
    trigger.click();
    await vm.$nextTick();
    trigger.click();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelectorAll('.alert');
    expect(alert.length).toEqual(2);
    expect(alert[0].querySelector('button.close')).toBeNull();
    expect(alert[1].querySelector('button.close')).toBeNull();
    vi.advanceTimersByTime(5000 + 1000);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });
});
