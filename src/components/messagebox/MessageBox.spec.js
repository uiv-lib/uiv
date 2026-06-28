import { vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import {
  createWrapper,
  nextTick,
  transition,
  triggerElementEvent,
  triggerEvent,
} from '../../__test__/utils';

function alertVm() {
  return createWrapper(
    '<div><btn @click="alert" type="primary">Click to open an alert modal</btn></div>',
    {},
    {
      methods: {
        alert() {
          this.$alert(
            {
              title: 'Title',
              content: 'This is an alert message.',
            },
            (msg) => {
              // callback after modal dismissed
              this.$notify(`You selected ${msg}.`);
            }
          );
        },
      },
    }
  );
}

function confirmVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a confirm modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$confirm({
            title: 'Confirm',
            content: 'This item will be permanently deleted. Continue?',
          })
            .then(() => {
              this.$notify({
                type: 'success',
                content: 'Delete completed.',
              });
            })
            .catch(() => {
              this.$notify('Delete canceled.');
            });
        },
      },
    }
  );
}

function promptVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a prompt modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$prompt({
            title: 'Welcome',
            content: 'Please input your email:',
            // A simple input validator
            // returns the err msg (not valid) or null (valid)
            validator(value) {
              return /\S+@\S+\.\S+/.test(value)
                ? null
                : 'Email address is not valid!';
            },
          })
            .then((value) => {
              this.$notify({
                type: 'success',
                content: `You email address is ${value}`,
              });
            })
            .catch(() => {
              this.$notify('Input canceled.');
            });
        },
      },
    }
  );
}

function confirmReverseVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a confirm modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$confirm({
            title: 'Confirm',
            content: 'This item will be permanently deleted. Continue?',
            reverseButtons: true,
          });
        },
      },
    }
  );
}

function alertHtmlVm() {
  return createWrapper(
    '<div><btn @click="alert" type="primary">Click to open an alert modal</btn></div>',
    {},
    {
      methods: {
        alert() {
          this.$alert({
            title: 'Title',
            content: '<b>bold</b><span id="x">y</span>',
            html: true,
          });
        },
      },
    }
  );
}

function alertPlainHtmlVm() {
  return createWrapper(
    '<div><btn @click="alert" type="primary">Click to open an alert modal</btn></div>',
    {},
    {
      methods: {
        alert() {
          this.$alert({
            title: 'Title',
            content: '<b>bold</b><span id="x">y</span>',
          });
        },
      },
    }
  );
}

function alertNoTitleVm() {
  return createWrapper(
    '<div><btn @click="alert" type="primary">Click to open an alert modal</btn></div>',
    {},
    {
      methods: {
        alert() {
          this.$alert({ content: 'No title here.' });
        },
      },
    }
  );
}

function confirmBackdropVm(backdrop) {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a confirm modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$confirm({
            title: 'Confirm',
            content: 'Backdrop test.',
            backdrop,
          }).catch(() => {});
        },
      },
    }
  );
}

function confirmAutoFocusCancelVm() {
  return createWrapper(
    '<div><btn @click="confirm" type="primary">Click to open a confirm modal</btn></div>',
    {},
    {
      methods: {
        confirm() {
          this.$confirm({
            title: 'Confirm',
            content: 'Auto focus cancel.',
            autoFocus: 'cancel',
          }).catch(() => {});
        },
      },
    }
  );
}

function backdropClick() {
  const modalEl = document.querySelector('.modal');
  const evt = document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  Object.defineProperty(evt, 'target', { value: modalEl, writable: false });
  modalEl.dispatchEvent(evt);
}

describe('MessageBox', () => {
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
    vi.useRealTimers();
    spy.mockRestore();
    console.log = savedLog;
  });

  it('should be able to open alert box', async () => {
    const wrapper = alertVm();
    await nextTick();
    const trigger = wrapper.find('.btn');
    trigger.trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual('Title');
    expect(document.querySelector('.modal-body > p').textContent).toEqual(
      'This is an alert message.'
    );
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('You selected ok.');
  });

  it('should be able to open confirm box and cancel', async () => {
    const wrapper = confirmVm();
    await nextTick();
    const trigger = wrapper.find('.btn');
    trigger.trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Confirm'
    );
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Delete canceled.');
  });

  it('should be able to open confirm box and ok', async () => {
    const wrapper = confirmVm();
    await nextTick();
    const trigger = wrapper.find('.btn');
    trigger.trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Confirm'
    );
    document.querySelectorAll('.modal .btn')[1].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Delete completed.');
  });

  it('should be able to open prompt box and cancel', async () => {
    const wrapper = promptVm();
    await nextTick();
    const trigger = wrapper.find('.btn');
    trigger.trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Welcome'
    );
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Input canceled.');
  });

  it('should be able to open prompt box and ok', async () => {
    const wrapper = promptVm();
    await nextTick();
    const trigger = wrapper.find('.btn');
    trigger.trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Welcome'
    );
    const input = document.querySelector('.modal input');
    input.value = 'wxsms@foxmail.com';
    triggerEvent(input, 'input');
    await nextTick();
    document.querySelectorAll('.modal .btn')[1].click();
    await flushPromises();
    const formGroup = document.querySelector('.modal .form-group');
    expect(formGroup.className).not.toContain('has-error');
    expect(formGroup.querySelector('.help-block').style.display).toEqual(
      'none'
    );
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('You email address is wxsms@foxmail.com');
  });

  it('should be able to validate prompt input', async () => {
    const wrapper = promptVm();
    await nextTick();
    const trigger = wrapper.find('.btn');
    trigger.trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual(
      'Welcome'
    );
    const input = document.querySelector('.modal input');
    input.value = 'invalid-email-address';
    triggerEvent(input, 'input');
    await nextTick();
    document.querySelectorAll('.modal .btn')[1].click();
    await nextTick();
    const formGroup = document.querySelector('.modal .form-group');
    expect(formGroup.className).toContain('has-error');
    expect(formGroup.querySelector('.help-block').style.display).not.toEqual(
      'none'
    );
    expect(formGroup.querySelector('.help-block').textContent).toEqual(
      'Email address is not valid!'
    );
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal')).toBeDefined();
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('Input canceled.');
  });

  it('should render OK button before cancel button when reverseButtons is true', async () => {
    const wrapper = confirmReverseVm();
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    const footerBtns = document.querySelectorAll('.modal .modal-footer .btn');
    expect(footerBtns).toHaveLength(2);
    expect(footerBtns[0].textContent.trim()).toEqual('OK');
    expect(footerBtns[1].textContent.trim()).toEqual('Cancel');
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
  });

  it('should render cancel button before OK button by default', async () => {
    const wrapper = confirmVm();
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    const footerBtns = document.querySelectorAll('.modal .modal-footer .btn');
    expect(footerBtns).toHaveLength(2);
    expect(footerBtns[0].textContent.trim()).toEqual('Cancel');
    expect(footerBtns[1].textContent.trim()).toEqual('OK');
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
  });

  it('should render content as html when html is true', async () => {
    const wrapper = alertHtmlVm();
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    const modalBody = document.querySelector('.modal-body');
    expect(modalBody.querySelector('b')).not.toBeNull();
    expect(modalBody.querySelector('b').textContent).toEqual('bold');
    expect(modalBody.querySelector('#x')).not.toBeNull();
    expect(modalBody.querySelector('#x').textContent).toEqual('y');
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
  });

  it('should render content as plain text when html is false', async () => {
    const wrapper = alertPlainHtmlVm();
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    const modalBody = document.querySelector('.modal-body');
    expect(modalBody.querySelector('b')).toBeNull();
    expect(modalBody.querySelector('#x')).toBeNull();
    expect(modalBody.querySelector('p').textContent).toEqual(
      '<b>bold</b><span id="x">y</span>'
    );
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
  });

  it('should close the modal when backdrop is true and backdrop is clicked', async () => {
    const wrapper = confirmBackdropVm(true);
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal')).not.toBeNull();
    backdropClick();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should not close the modal when backdrop is false and backdrop is clicked', async () => {
    const wrapper = confirmBackdropVm(false);
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal')).not.toBeNull();
    backdropClick();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal')).not.toBeNull();
    expect(document.querySelector('.modal-backdrop')).not.toBeNull();
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
  });

  // Source note: MessageBox.coerces backdrop via `isExist(props.backdrop) ? !!props.backdrop : ...`,
  // and Modal's backdrop prop is Boolean. 'static' is therefore truthy and NOT treated as a
  // no-close value -- clicking the backdrop still closes the modal.
  it('should close the modal when backdrop is "static" (no special static handling in source)', async () => {
    const wrapper = confirmBackdropVm('static');
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal')).not.toBeNull();
    backdropClick();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
  });

  it('should mark the cancel button as the auto-focus target when autoFocus is "cancel"', async () => {
    const wrapper = confirmAutoFocusCancelVm();
    await nextTick();
    await wrapper.find('.btn').trigger('click');
    await nextTick();
    vi.advanceTimersByTime(transition + 100);
    await nextTick();
    const footerBtns = document.querySelectorAll('.modal .modal-footer .btn');
    expect(footerBtns).toHaveLength(2);
    const cancelBtn = footerBtns[0];
    expect(cancelBtn.textContent.trim()).toEqual('Cancel');
    expect(cancelBtn.getAttribute('data-action')).toEqual('auto-focus');
    expect(footerBtns[1].getAttribute('data-action')).not.toEqual('auto-focus');
    expect(cancelBtn.getAttribute('data-focused')).toEqual('true');
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
  });

  it('should submit the prompt when Enter is pressed on a valid input', async () => {
    const wrapper = promptVm();
    await nextTick();
    const trigger = wrapper.find('.btn');
    trigger.trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    const input = document.querySelector('.modal input');
    input.value = 'wxsms@foxmail.com';
    triggerEvent(input, 'input');
    await nextTick();
    triggerElementEvent(input, 'keyup', { key: 'Enter', keyCode: 13 });
    await nextTick();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal')).toBeNull();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.alert')).toBeDefined();
    expect(
      document.querySelector('.alert .media-body > div').textContent
    ).toEqual('You email address is wxsms@foxmail.com');
  });

  it('should not render a modal header when title is undefined', async () => {
    const wrapper = alertNoTitleVm();
    await nextTick();
    wrapper.find('.btn').trigger('click');
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-header')).toBeNull();
    expect(document.querySelector('.modal-title')).toBeNull();
    expect(document.querySelector('.modal-body > p').textContent).toEqual(
      'No title here.'
    );
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
  });
});
