import { spliceIfExist } from '../../utils/array.utils';
import {
  isFunction,
  isExist,
  isString,
  hasOwnProperty,
} from '../../utils/object.utils';
import Notification from '../../components/notification/Notification.vue';
import { PLACEMENTS } from '../../constants/notification.constants';
import { h, render, reactive } from 'vue';

const queues = reactive({
  [PLACEMENTS.TOP_LEFT]: [],
  [PLACEMENTS.TOP_RIGHT]: [],
  [PLACEMENTS.BOTTOM_LEFT]: [],
  [PLACEMENTS.BOTTOM_RIGHT]: [],
});

const destroy = (queue, { vNode, container }) => {
  // console.log('destroyNotification')
  render(null, container);
  spliceIfExist(queue, vNode.component.ctx);
};

const init = (options, cb, resolve = null, reject = null) => {
  const container = document.createElement('div');
  const placement = options.placement;
  const queue = queues[placement];
  // check if placement is valid
  if (!isExist(queue)) {
    return;
  }
  /* istanbul ignore else */
  // `error` alias of `danger`
  if (options.type === 'error') {
    options.type = 'danger';
  }
  const vNode = h(Notification, {
    queue,
    placement,
    ...options,
    cb(msg) {
      destroy(queue, { vNode, container });
      if (isFunction(cb)) {
        cb(msg);
      } else if (resolve && reject) {
        resolve(msg);
      }
    },
  });
  render(vNode, container);
  document.body.appendChild(container.firstElementChild);
  queue.push(vNode.component.ctx);
};

// eslint-disable-next-line default-param-last
const _notify = (options = {}, cb) => {
  // simplify usage: pass string as option.content
  if (isString(options)) {
    options = {
      content: options,
    };
  }
  // set default placement as top-right
  if (!isExist(options.placement)) {
    options.placement = PLACEMENTS.TOP_RIGHT;
  }
  return new Promise((resolve, reject) => {
    init(options, cb, resolve, reject);
  });
};

function _notify2(type, args) {
  if (isString(args)) {
    _notify({
      content: args,
      type,
    });
  } else {
    _notify({ ...args, type });
  }
}

const notify = Object.defineProperties(_notify, {
  success: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2('success', args);
    },
  },
  info: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2('info', args);
    },
  },
  warning: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2('warning', args);
    },
  },
  danger: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2('danger', args);
    },
  },
  error: {
    configurable: false,
    writable: false,
    value(args) {
      _notify2('danger', args);
    },
  },
  dismissAll: {
    configurable: false,
    writable: false,
    value() {
      for (const key in queues) {
        /* istanbul ignore else */
        if (hasOwnProperty(queues, key)) {
          queues[key].forEach((instance) => {
            instance.onDismissed();
          });
        }
      }
    },
  },
});

export default { notify };
