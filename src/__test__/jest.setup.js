import { enableAutoUnmount, config } from '@vue/test-utils';

config.renderStubDefaultSlot = true;

window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y;
  document.documentElement.scrollLeft = x;
  window.pageYOffset = y;
  window.pageXOffset = x;
  window.dispatchEvent(new Event('resize'));
};

enableAutoUnmount(afterEach);

afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
  jest.clearAllTimers();
});

jest.setTimeout(10000);
