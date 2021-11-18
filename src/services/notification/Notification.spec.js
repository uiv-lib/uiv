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
import Notification from './Notification';

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

  it('should be able to use without Promise', async () => {
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
