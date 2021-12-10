import {
  nextTick,
  sleep,
  transition,
  triggerEvent,
} from '../../__test__/utils';
import MessageBox from './MessageBox';

describe('MessageBox Service', () => {
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
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual('Title');
    const input = document.querySelector('.modal input');
    input.value = 'test';
    triggerEvent(input, 'input');
    await nextTick();
    document.querySelectorAll('.modal .btn')[1].click();
    await nextTick();
    const formGroup = document.querySelector('.modal .form-group');
    expect(formGroup.className).not.toContain('has-error');
    expect(formGroup.querySelector('.help-block').style.display).toEqual(
      'none'
    );
    await sleep(transition);
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
    );
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual('Title');
    const input = document.querySelector('.modal input');
    expect(input.value).toEqual('testtest');
    await nextTick();
    document.querySelectorAll('.modal .btn')[0].click();
    await nextTick();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('cancel');
  });

  it.skip('should be able to work without browser Promise', async () => {
    // mute Promise
    const savedPromise = window.Promise;
    window.Promise = null;
    // alert
    MessageBox.alert(
      {
        title: 'Title',
        content: 'This is an alert message.',
      },
      () => {
        console.log('ok');
      }
    );
    // restore Promise
    window.Promise = savedPromise;
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title').textContent).toEqual('Title');
    expect(document.querySelector('.modal-body > p').textContent).toEqual(
      'This is an alert message.'
    );
    document.querySelector('.modal .btn').click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('ok');
  });

  it.skip('should be able to work without browser Promise and callback', async () => {
    // mute Promise
    const savedPromise = window.Promise;
    window.Promise = null;
    // alert
    MessageBox.alert();
    // restore Promise
    window.Promise = savedPromise;
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelector('.modal .btn').click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });

  it('should be able to work without options', async () => {
    MessageBox.alert(undefined, () => {
      console.log('ok');
    });
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal-title')).toBeNull();
    expect(document.querySelector('.modal-body > p').textContent).toEqual('');
    document.querySelector('.modal .btn').click();
    await sleep(transition);
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
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    triggerEvent(document.querySelector('.modal'), 'click');
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('ok');
  });

  it('should be able to use confirm with cancel callback', async () => {
    MessageBox.confirm({}, console.log);
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelectorAll('.modal .btn')[0].click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('cancel');
  });

  it('should be able to use confirm with ok callback', async () => {
    MessageBox.confirm({}, console.log);
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelectorAll('.modal .btn')[1].click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith(null, 'ok');
  });

  it('should be able to use prompt with ok callback', async () => {
    MessageBox.prompt({}, console.log);
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelectorAll('.modal .btn')[0].click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
    expect(spy).toBeCalledWith('cancel');
  });

  it('should be able to work with `custom-class`', async () => {
    MessageBox.alert({
      customClass: 'test-class',
    });
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('test-class');
    expect(document.querySelector('.modal').className).toContain('in');
    document.querySelector('.modal .btn').click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });

  it('should not be able to use HTML content if html=false', async () => {
    MessageBox.alert({
      content: '<a href="#" id="test-a">test</a>',
    });
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal #test-a')).toBeNull();
    document.querySelector('.modal .btn').click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });

  it('should be able to use HTML content', async () => {
    MessageBox.alert({
      html: true,
      content: '<a href="#" id="test-a">test</a>',
    });
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeDefined();
    expect(document.querySelector('.modal').className).toContain('in');
    expect(document.querySelector('.modal #test-a')).toBeDefined();
    document.querySelector('.modal .btn').click();
    await sleep(transition);
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.querySelector('.modal')).toBeNull();
  });
});
