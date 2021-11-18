import { EVENTS, on, off } from '../utils/dom.utils';
import { isFunction } from '../utils/object.utils';

const HANDLER = '_uiv_scroll_handler';
const events = [EVENTS.RESIZE, EVENTS.SCROLL];

const mounted = (el, binding) => {
  const callback = binding.value;
  if (!isFunction(callback)) {
    return;
  }
  unmounted(el);
  el[HANDLER] = callback;
  events.forEach((event) => {
    on(window, event, el[HANDLER]);
  });
};

const unmounted = (el) => {
  events.forEach((event) => {
    off(window, event, el[HANDLER]);
  });
  delete el[HANDLER];
};

const updated = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    mounted(el, binding);
  }
};

export default { mounted, unmounted, updated };
