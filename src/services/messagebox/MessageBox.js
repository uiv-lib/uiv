import { TYPES } from '../../constants/messagebox.constants'
import { removeFromDom } from '../../utils/dom.utils'
import { spliceIfExist } from '../../utils/array.utils'
import {
  isFunction,
  isExist,
  isString,
  isPromiseSupported,
} from '../../utils/object.utils'
import MessageBox from '../../components/messagebox/MessageBox.vue'
import { createApp } from 'vue'

const queue = []

const destroy = ({ app, container }) => {
  // console.log('destroyModal')
  removeFromDom(container)
  app.unmount()
  spliceIfExist(queue, app)
}

// handle cancel or ok for confirm & prompt
const shallResolve = (type, msg) => {
  if (type === TYPES.CONFIRM) {
    // is confirm
    return msg === 'ok'
  } else {
    // is prompt
    return isExist(msg) && isString(msg.value)
  }
}

const init = function (type, options, cb, resolve = null, reject = null) {
  // const i18n = this.$i18n
  const container = document.createElement('div')
  const app = createApp(MessageBox, {
    type,
    ...options,
    cb(msg) {
      destroy({ app, container })
      if (isFunction(cb)) {
        if (type === TYPES.CONFIRM) {
          shallResolve(type, msg) ? cb(null, msg) : cb(msg)
        } else if (type === TYPES.PROMPT) {
          shallResolve(type, msg) ? cb(null, msg.value) : cb(msg)
        } else {
          cb(msg)
        }
      } else if (resolve && reject) {
        if (type === TYPES.CONFIRM) {
          shallResolve(type, msg) ? resolve(msg) : reject(msg)
        } else if (type === TYPES.PROMPT) {
          shallResolve(type, msg) ? resolve(msg.value) : reject(msg)
        } else {
          resolve(msg)
        }
      }
    },
  })
  const vm = app.mount(container)
  document.body.appendChild(vm.$el)
  queue.push(app)
}

// eslint-disable-next-line default-param-last
const initModal = function (type, options = {}, cb) {
  if (isPromiseSupported()) {
    return new Promise((resolve, reject) => {
      init.apply(this, [type, options, cb, resolve, reject])
    })
  } else {
    init.apply(this, [type, options, cb])
  }
}

const alert = function (options, cb) {
  return initModal.apply(this, [TYPES.ALERT, options, cb])
}

const confirm = function (options, cb) {
  return initModal.apply(this, [TYPES.CONFIRM, options, cb])
}

const prompt = function (options, cb) {
  return initModal.apply(this, [TYPES.PROMPT, options, cb])
}

export default { alert, confirm, prompt }
