import { removeFromDom } from '../../utils/domUtils'
import { spliceIfExist } from '../../utils/arrayUtils'
import { isFunction, isExist, isString, isPromiseSupported, assign } from '../../utils/objectUtils'
import Notification from './Notification.vue'
import { PLACEMENTS } from './constants'
import Vue from 'vue'

const queues = {
  [PLACEMENTS.TOP_LEFT]: [],
  [PLACEMENTS.TOP_RIGHT]: [],
  [PLACEMENTS.BOTTOM_LEFT]: [],
  [PLACEMENTS.BOTTOM_RIGHT]: []
}

const destroy = (queue, instance) => {
  // console.log('destroyNotification')
  removeFromDom(instance.$el)
  instance.$destroy()
  spliceIfExist(queue, instance)
}

const init = (options, cb, resolve = null, reject = null) => {
  const placement = options.placement
  const queue = queues[placement]
  // check if placement is valid
  if (!isExist(queue)) {
    return
  }
  /* istanbul ignore else */
  // `error` alias of `danger`
  if (options.type === 'error') {
    options.type = 'danger'
  }
  let instance = new Vue({
    extends: Notification,
    propsData: assign({}, { queue, placement }, options, {
      cb (msg) {
        destroy(queue, instance)
        if (isFunction(cb)) {
          cb(msg)
        } else if (resolve && reject) {
          resolve(msg)
        }
      }
    })
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  queue.push(instance)
}

const _notify = (options = {}, cb) => {
  // simplify usage: pass string as option.content
  if (isString(options)) {
    options = {
      content: options
    }
  }
  // set default placement as top-right
  if (!isExist(options.placement)) {
    options.placement = PLACEMENTS.TOP_RIGHT
  }
  if (isPromiseSupported()) {
    return new Promise((resolve, reject) => {
      init(options, cb, resolve, reject)
    })
  } else {
    init(options, cb)
  }
}

function _notify2 (type, args) {
  if (isString(args)) {
    _notify({
      content: args,
      type
    })
  } else {
    _notify(assign({}, args, {
      type
    }))
  }
}

const notify = Object.defineProperties(_notify, {
  success: {
    configurable: false,
    writable: false,
    value (args) {
      _notify2('success', args)
    }
  },
  info: {
    configurable: false,
    writable: false,
    value (args) {
      _notify2('info', args)
    }
  },
  warning: {
    configurable: false,
    writable: false,
    value (args) {
      _notify2('warning', args)
    }
  },
  danger: {
    configurable: false,
    writable: false,
    value (args) {
      _notify2('danger', args)
    }
  },
  error: {
    configurable: false,
    writable: false,
    value (args) {
      _notify2('danger', args)
    }
  },
  dismissAll: {
    configurable: false,
    writable: false,
    value () {
      for (let key in queues) {
        /* istanbul ignore else */
        if (queues.hasOwnProperty(key)) {
          queues[key].forEach(instance => {
            instance.onDismissed()
          })
        }
      }
    }
  }
})

export default { notify }
