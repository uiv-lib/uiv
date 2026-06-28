import { vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { nextTick, transition } from '../../__test__/utils';
import Notification from './Notification';

describe('Notification service', () => {
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
    console.log = savedLog;
  });

  it('should be able to use without options and callback', async () => {
    Notification.notify(undefined);
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use without Promise', async () => {
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
    let callbackFired = false;
    Notification.notify({ title: 'test' }, () => {
      callbackFired = true;
    });
    vi.unstubAllGlobals();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(callbackFired).toBe(true);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to avoid invalid placement', async () => {
    Notification.notify({ placement: 'top-bottom' }); // invalid
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use custom icon', async () => {
    Notification.notify({ title: 'test', icon: 'fa fa-check' });
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelectorAll('.media-left > .fa').length).toEqual(1);
    expect(alert.querySelectorAll('.media-left > .fa-check')).toBeDefined();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to disable icon with types', async () => {
    Notification.notify({ title: 'test', icon: '', type: 'danger' });
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelector('.media-left')).toBeNull();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to work with `custom-class`', async () => {
    Notification.notify({
      title: 'test',
      type: 'danger',
      customClass: 'test-class',
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('test-class');
    expect(alert.className).toContain('alert-danger');
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should not be able to use HTML content if html=false', async () => {
    Notification.notify({
      title: 'test',
      content: '<a href="#" id="test-a">test</a>',
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelector('#test-a')).toBeNull();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use HTML content', async () => {
    Notification.notify({
      title: 'test',
      html: true,
      content: '<a href="#" id="test-a">test</a>',
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelector('#test-a')).toBeDefined();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should render the correct type class for each type alias', async () => {
    const cases = [
      { method: 'success', className: 'alert-success' },
      { method: 'info', className: 'alert-info' },
      { method: 'warning', className: 'alert-warning' },
      { method: 'danger', className: 'alert-danger' },
      { method: 'error', className: 'alert-danger' },
    ];
    for (const { method, className } of cases) {
      Notification.notify[method]('test');
      vi.advanceTimersByTime(transition);
      await nextTick();
      const alert = document.querySelector('.alert');
      expect(alert).toBeDefined();
      expect(alert.className).toContain(className);
      alert.querySelector('button.close').click();
      await flushPromises();
      vi.advanceTimersByTime(transition);
      await nextTick();
      expect(document.querySelector('.alert')).toBeNull();
    }
  });

  it('should dismiss all notifications across placements', async () => {
    Notification.notify({ content: 'one', placement: 'top-right' });
    Notification.notify({ content: 'two', placement: 'top-left' });
    Notification.notify({ content: 'three', placement: 'bottom-right' });
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelectorAll('.alert').length).toEqual(3);
    Notification.notify.dismissAll();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelectorAll('.alert').length).toEqual(0);
  });

  it('should fire the dismissed callback on close', async () => {
    let callbackFired = false;
    let resolved;
    const promise = Notification.notify({ content: 'test' }, () => {
      callbackFired = true;
    });
    promise.then((v) => {
      resolved = v;
    });
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(callbackFired).toBe(true);
    expect(resolved).toBeUndefined();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should resolve the returned promise when no callback is given', async () => {
    const promise = Notification.notify({ content: 'test' });
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    const resolved = await promise;
    expect(resolved).toBeUndefined();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should treat a string option as content', async () => {
    Notification.notify('plain string content');
    vi.advanceTimersByTime(transition);
    await nextTick();
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.textContent).toContain('plain string content');
    alert.querySelector('button.close').click();
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should auto-close after the given duration', async () => {
    Notification.notify({ content: 'auto close', duration: 1000 });
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeDefined();
    vi.advanceTimersByTime(1000);
    await flushPromises();
    vi.advanceTimersByTime(transition);
    await nextTick();
    expect(document.querySelector('.alert')).toBeNull();
  });
});
