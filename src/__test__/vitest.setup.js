import { enableAutoUnmount, config } from '@vue/test-utils';
import { vi, afterEach } from 'vitest';

config.global.renderStubDefaultSlot = true;

// Alias `jest` to `vi` so existing spec files using jest.fn/jest.spyOn/etc. keep working.
globalThis.jest = vi;

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
  vi.clearAllMocks();
  vi.clearAllTimers();
});

vi.setConfig({ testTimeout: 10000 });
