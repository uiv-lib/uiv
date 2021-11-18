import {
  addClass,
  removeClass,
  EVENTS,
  on,
  off,
  getViewportSize,
  getClosest,
  getParents,
} from '../../utils/dom.utils';

function ScrollSpy(element, target = 'body', options = {}) {
  this.el = element;
  this.opts = { ...ScrollSpy.DEFAULTS, ...options };
  this.opts.target = target;
  if (target === 'body') {
    this.scrollElement = window;
  } else {
    this.scrollElement = document.querySelector(`[id=${target}]`);
  }
  this.selector = 'li > a';
  this.offsets = [];
  this.targets = [];
  this.activeTarget = null;
  this.scrollHeight = 0;
  if (this.scrollElement) {
    this.refresh();
    this.process();
  }
}

ScrollSpy.DEFAULTS = {
  offset: 10,
  callback: (ele) => 0,
};

ScrollSpy.prototype.getScrollHeight = function () {
  return (
    this.scrollElement.scrollHeight ||
    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
  );
};

ScrollSpy.prototype.refresh = function () {
  this.offsets = [];
  this.targets = [];
  this.scrollHeight = this.getScrollHeight();
  const list = [...this.el.querySelectorAll(this.selector)];
  const isWindow = this.scrollElement === window;
  list
    .map((ele) => {
      const href = ele.getAttribute('href');
      if (/^#./.test(href)) {
        const rootEl = isWindow ? document : this.scrollElement;
        const hrefEl = rootEl.querySelector(`[id='${href.slice(1)}']`);
        const offset = isWindow
          ? hrefEl.getBoundingClientRect().top
          : hrefEl.offsetTop;
        return [offset, href];
      } else {
        return null;
      }
    })
    .filter((item) => item)
    .sort((a, b) => a[0] - b[0])
    .forEach((item) => {
      this.offsets.push(item[0]);
      this.targets.push(item[1]);
    });
  // console.log(this.offsets, this.targets)
};

ScrollSpy.prototype.process = function () {
  const isWindow = this.scrollElement === window;
  const scrollTop =
    (isWindow ? window.pageYOffset : this.scrollElement.scrollTop) +
    this.opts.offset;
  const scrollHeight = this.getScrollHeight();
  const scrollElementHeight = isWindow
    ? getViewportSize().height
    : this.scrollElement.getBoundingClientRect().height;
  const maxScroll = this.opts.offset + scrollHeight - scrollElementHeight;
  const offsets = this.offsets;
  const targets = this.targets;
  const activeTarget = this.activeTarget;
  let i;
  if (this.scrollHeight !== scrollHeight) {
    this.refresh();
  }
  if (scrollTop >= maxScroll) {
    return (
      activeTarget !== (i = targets[targets.length - 1]) && this.activate(i)
    );
  }
  if (activeTarget && scrollTop < offsets[0]) {
    this.activeTarget = null;
    return this.clear();
  }
  for (i = offsets.length; i--; ) {
    activeTarget !== targets[i] &&
      scrollTop >= offsets[i] &&
      (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) &&
      this.activate(targets[i]);
  }
};

ScrollSpy.prototype.activate = function (target) {
  this.activeTarget = target;
  this.clear();
  const selector =
    this.selector +
    '[data-target="' +
    target +
    '"],' +
    this.selector +
    '[href="' +
    target +
    '"]';
  const activeCallback = this.opts.callback;
  const active = [...this.el.querySelectorAll(selector)];
  active.forEach((ele) => {
    getParents(ele, 'li').forEach((item) => {
      addClass(item, 'active');
      activeCallback(item);
    });
    if (getParents(ele, '.dropdown-menu').length) {
      addClass(getClosest(ele, 'li.dropdown'), 'active');
    }
  });
};

ScrollSpy.prototype.clear = function () {
  const list = [...this.el.querySelectorAll(this.selector)];
  list.forEach((ele) => {
    getParents(ele, '.active', this.opts.target).forEach((item) => {
      removeClass(item, 'active');
    });
  });
};

const INSTANCE = '_uiv_scrollspy_instance';
const events = [EVENTS.RESIZE, EVENTS.SCROLL];

const beforeMount = (el, binding) => {
  // console.log('bind')
  unmounted(el);
};

const mounted = (el, binding) => {
  // console.log('inserted')
  const scrollSpy = new ScrollSpy(el, binding.arg, binding.value);
  if (scrollSpy.scrollElement) {
    scrollSpy.handler = () => {
      scrollSpy.process();
    };
    events.forEach((event) => {
      on(scrollSpy.scrollElement, event, scrollSpy.handler);
    });
  }
  el[INSTANCE] = scrollSpy;
};

const unmounted = (el) => {
  // console.log('unbind')
  const instance = el[INSTANCE];
  if (instance && instance.scrollElement) {
    events.forEach((event) => {
      off(instance.scrollElement, event, instance.handler);
    });
    delete el[INSTANCE];
  }
};

const updated = (el, binding) => {
  // console.log('update')
  const isArgUpdated = binding.arg !== binding.oldArg;
  const isValueUpdated = binding.value !== binding.oldValue;
  if (isArgUpdated || isValueUpdated) {
    beforeMount(el, binding);
    mounted(el, binding);
  }
};

export default {
  beforeMount,
  mounted,
  updated,
  unmounted,
};
