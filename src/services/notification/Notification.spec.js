import { sleep, transition } from '../../__test__/utils';
import Notification from './Notification';

describe('Notification service', () => {
  let spy;
  let savedLog;

  beforeEach(() => {
    savedLog = console.log;
    console.log = function () {
      return true;
    };

    spy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log = savedLog;
  });

  it('should be able to use without options and callback', async () => {
    Notification.notify(undefined);
    await sleep(transition);
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    alert.querySelector('button.close').click();
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it.skip('should be able to use without Promise', async () => {
    // mute Promise
    const savedPromise = window.Promise;
    window.Promise = null;
    // alert
    Notification.notify({ title: 'test' });
    // restore Promise
    window.Promise = savedPromise;
    await sleep(transition);
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    alert.querySelector('button.close').click();
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to avoid invalid placement', async () => {
    Notification.notify({ placement: 'top-bottom' }); // invalid
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use custom icon', async () => {
    Notification.notify({ title: 'test', icon: 'fa fa-check' });
    await sleep(transition);
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelectorAll('.media-left > .fa').length).toEqual(1);
    expect(alert.querySelectorAll('.media-left > .fa-check')).toBeDefined();
    alert.querySelector('button.close').click();
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to disable icon with types', async () => {
    Notification.notify({ title: 'test', icon: '', type: 'danger' });
    await sleep(transition);
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelector('.media-left')).toBeNull();
    alert.querySelector('button.close').click();
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to work with `custom-class`', async () => {
    Notification.notify({
      title: 'test',
      type: 'danger',
      customClass: 'test-class',
    });
    await sleep(transition);
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.className).toContain('test-class');
    expect(alert.className).toContain('alert-danger');
    alert.querySelector('button.close').click();
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should not be able to use HTML content if html=false', async () => {
    Notification.notify({
      title: 'test',
      content: '<a href="#" id="test-a">test</a>',
    });
    await sleep(transition);
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelector('#test-a')).toBeNull();
    alert.querySelector('button.close').click();
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });

  it('should be able to use HTML content', async () => {
    Notification.notify({
      title: 'test',
      html: true,
      content: '<a href="#" id="test-a">test</a>',
    });
    await sleep(transition);
    const alert = document.querySelector('.alert');
    expect(alert).toBeDefined();
    expect(alert.querySelector('#test-a')).toBeDefined();
    alert.querySelector('button.close').click();
    await sleep(transition);
    expect(document.querySelector('.alert')).toBeNull();
  });
});
