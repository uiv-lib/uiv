import { h, render } from 'vue';
import Tooltip from '../../components/tooltip/Tooltip.vue';
import { hasOwnProperty } from '../../utils/object.utils';
import { removeFromDom } from '../../utils/dom.utils';

const INSTANCE = '_uiv_tooltip_instance';

const mounted = (el, binding) => {
  // console.log('bind')
  unmounted(el);
  const options = [];
  for (const key in binding.modifiers) {
    if (hasOwnProperty(binding.modifiers, key) && binding.modifiers[key]) {
      options.push(key);
    }
  }
  let placement, trigger, enterable;
  options.forEach((option) => {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      placement = option;
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      trigger = option;
    } else if (/unenterable/.test(option)) {
      enterable = false;
    }
  });

  const vNode = h(Tooltip, {
    target: el,
    appendTo: binding.arg && '#' + binding.arg,
    text:
      typeof binding.value === 'string'
        ? binding.value && binding.value.toString()
        : binding.value && binding.value.text && binding.value.text.toString(),
    positionBy:
      binding.value &&
      binding.value.positionBy &&
      binding.value.positionBy.toString(),
    viewport:
      binding.value &&
      binding.value.viewport &&
      binding.value.viewport.toString(),
    customClass:
      binding.value &&
      binding.value.customClass &&
      binding.value.customClass.toString(),
    showDelay: binding.value && binding.value.showDelay,
    hideDelay: binding.value && binding.value.hideDelay,
    enterable,
    placement,
    trigger,
  });
  const container = document.createElement('div');
  render(vNode, container);
  el[INSTANCE] = { container, vNode };
};

const unmounted = (el) => {
  // console.log('unbind', el[INSTANCE])
  const instance = el[INSTANCE];
  if (instance) {
    try {
      removeFromDom(instance.vNode.component.ctx.$refs.popup);
    } catch (_) {}
    render(null, instance.container);
  }
  delete el[INSTANCE];
};

const updated = (el, binding) => {
  // console.log('update', binding.oldValue, '->', binding.value)
  if (binding.value !== binding.oldValue) {
    mounted(el, binding);
  }
};

export default { mounted, unmounted, updated };
