import { vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { nextTick, transition, triggerEvent } from '../../__test__/utils';
import MessageBox from './MessageBox';

describe('MessageBox Service', () => {
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

  it('should be able to use prompt without validator', async () => {
    MessageBox.prompt(
      {
        title: 'Title',
        content: 'This is an alert message.',
      },
      console.log
    );
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual('Title');
    const input = document.querySelector('.modal input');
    input.value = 'test';
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
    expect(spy).toBeCalledWith(null, 'test');
  });

  it('should be able add default value to prompt box', async () => {
    MessageBox.prompt(
      {
        title: 'Title',
        content: 'This is an alert message.',
        defaultValue: 'testtest',
      },
      console.log
    ).catch(() => {});
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual('Title');
    const input = document.querySelector('.modal input');
    expect(input.value).toEqual('testtest');
    await nextTick();
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('cancel');
  });

  it('should be able to work without browser Promise', async () => {
    const RealPromise = window.Promise;
    function FakePromise(executor) {
      executor(
        () => {},
        () => {}
      );
    }
    FakePromise.resolve = (v) => RealPromise.resolve(v);
    FakePromise.reject = (r) => RealPromise.reject(r);
    FakePromise.all = (i) => RealPromise.all(i);
    FakePromise.allSettled = (i) => RealPromise.allSettled(i);
    FakePromise.race = (i) => RealPromise.race(i);
    vi.stubGlobal('Promise', FakePromise);
    MessageBox.alert(
      {
        title: 'Title',
        content: 'This is an alert message.',
      },
      () => {
        console.log('ok');
      }
    );
    vi.unstubAllGlobals();
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
    expect(spy).toBeCalledWith('ok');
  });

  it('should be able to work without browser Promise and callback', async () => {
    const RealPromise = window.Promise;
    function FakePromise(executor) {
      executor(
        () => {},
        () => {}
      );
    }
    FakePromise.resolve = (v) => RealPromise.resolve(v);
    FakePromise.reject = (r) => RealPromise.reject(r);
    FakePromise.all = (i) => RealPromise.all(i);
    FakePromise.allSettled = (i) => RealPromise.allSettled(i);
    FakePromise.race = (i) => RealPromise.race(i);
    vi.stubGlobal('Promise', FakePromise);
    MessageBox.alert();
    vi.unstubAllGlobals();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });

  it('should be able to work without options', async () => {
    MessageBox.alert(undefined, () => {
      console.log('ok');
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title')).toBeNull();
    expect(document.querySelector('.modal-body > p').textContent).toEqual('');
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('ok');
  });

  it('should be able to set alert backdrop to true', async () => {
    MessageBox.alert({
      backdrop: true,
    }).then(() => {
      console.log('ok');
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    triggerEvent(document.querySelector('.modal'), 'click');
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('ok');
  });

  it('should be able to use confirm with cancel callback', async () => {
    MessageBox.confirm({}, console.log).catch(() => {});
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('cancel');
  });

  it('should be able to use confirm with ok callback', async () => {
    MessageBox.confirm({}, console.log);
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelectorAll('.modal .btn')[1].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith(null, 'ok');
  });

  it('should resolve the returned promise even when a callback is given', async () => {
    let callbackArg;
    let resolved;
    let rejected;
    const promise = MessageBox.confirm({}, (err, value) => {
      callbackArg = { err, value };
    });
    promise.then(
      (v) => {
        resolved = v;
      },
      (r) => {
        rejected = r;
      }
    );
    vi.advanceTimersByTime(transition);
    await nextTick();
    document.querySelectorAll('.modal .btn')[1].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(callbackArg).toEqual({ err: null, value: 'ok' });
    expect(resolved).toBe('ok');
    expect(rejected).toBeUndefined();
  });

  it('should reject the returned promise on cancel even when a callback is given', async () => {
    let callbackArg;
    let resolved;
    let rejected;
    const promise = MessageBox.confirm({}, (err, value) => {
      callbackArg = { err, value };
    });
    promise.then(
      (v) => {
        resolved = v;
      },
      (r) => {
        rejected = r;
      }
    );
    vi.advanceTimersByTime(transition);
    await nextTick();
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(callbackArg).toEqual({ err: 'cancel', value: undefined });
    expect(rejected).toBe('cancel');
    expect(resolved).toBeUndefined();
  });

  it('should be able to use prompt with ok callback', async () => {
    MessageBox.prompt({}, console.log).catch(() => {});
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelectorAll('.modal .btn')[0].click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('cancel');
  });

  it('should be able to work with `custom-class`', async () => {
    MessageBox.alert({
      customClass: 'test-class',
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('test-class');
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });

  it('should not be able to use HTML content if html=false', async () => {
    MessageBox.alert({
      content: '<a href="#" id="test-a">test</a>',
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal #test-a')).toBeNull();
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });

  it('should be able to use HTML content', async () => {
    MessageBox.alert({
      html: true,
      content: '<a href="#" id="test-a">test</a>',
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal #test-a')).toBeDefined();
    document.querySelector('.modal .btn').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });
});
