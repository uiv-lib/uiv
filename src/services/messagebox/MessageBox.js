import { TYPES } from '../../constants/messagebox.constants';
import { isFunction, isExist, isString } from '../../utils/object.utils';
import MessageBox from '../../components/messagebox/MessageBox.vue';
import { render, h } from 'vue';

const destroy = (container) => {
  // console.log('destroyModal')
  render(null, container);
};

// handle cancel or ok for confirm & prompt
const shallResolve = (type, msg) => {
  if (type === TYPES.CONFIRM) {
    // is confirm
    return msg === 'ok';
  } else {
    // is prompt
    return isExist(msg) && isString(msg.value);
  }
};

const init = function (type, options, cb, resolve = null, reject = null) {
  // const i18n = this.$i18n
  const container = document.createElement('div');
  const vNode = h(MessageBox, {
    type,
    ...options,
    cb(msg) {
      destroy(container);
      if (isFunction(cb)) {
        if (type === TYPES.CONFIRM) {
          shallResolve(type, msg) ? cb(null, msg) : cb(msg);
        } else if (type === TYPES.PROMPT) {
          shallResolve(type, msg) ? cb(null, msg.value) : cb(msg);
        } else {
          cb(msg);
        }
      } else if (resolve && reject) {
        if (type === TYPES.CONFIRM) {
          shallResolve(type, msg) ? resolve(msg) : reject(msg);
        } else if (type === TYPES.PROMPT) {
          shallResolve(type, msg) ? resolve(msg.value) : reject(msg);
        } else {
          resolve(msg);
        }
      }
    },
  });
  render(vNode, container);
  document.body.appendChild(container.firstElementChild);
};

const initModal = function (type, options = {}, cb) {
  return new Promise((resolve, reject) => {
    init.apply(this, [type, options, cb, resolve, reject]);
  });
};

const alert = function (options, cb) {
  return initModal.apply(this, [TYPES.ALERT, options, cb]);
};

const confirm = function (options, cb) {
  return initModal.apply(this, [TYPES.CONFIRM, options, cb]);
};

const prompt = function (options, cb) {
  return initModal.apply(this, [TYPES.PROMPT, options, cb]);
};

export default { alert, confirm, prompt };
