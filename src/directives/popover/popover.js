import { createApp } from 'vue'
import Popover from '../../components/popover/Popover.vue'
import { hasOwnProperty } from '../../utils/object.utils'

const INSTANCE = '_uiv_popover_instance'

const bind = (el, binding) => {
  // console.log('bind')
  unbind(el)
  const options = []
  for (const key in binding.modifiers) {
    if (hasOwnProperty(binding.modifiers, key) && binding.modifiers[key]) {
      options.push(key)
    }
  }
  let placement, trigger, enterable
  options.forEach((option) => {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      placement = option
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      trigger = option
    } else if (/unenterable/.test(option)) {
      enterable = false
    }
  })
  const app = createApp(Popover, {
    target: el,
    appendTo: binding.arg && '#' + binding.arg,
    title:
      binding.value && binding.value.title && binding.value.title.toString(),
    positionBy:
      binding.value &&
      binding.value.positionBy &&
      binding.value.positionBy.toString(),
    content:
      binding.value &&
      binding.value.content &&
      binding.value.content.toString(),
    viewport:
      binding.value &&
      binding.value.viewport &&
      binding.value.viewport.toString(),
    customClass:
      binding.value &&
      binding.value.customClass &&
      binding.value.customClass.toString(),
    enterable,
    placement,
    trigger,
  })

  const container = document.createElement('div')
  app.mount(container)
  el[INSTANCE] = {
    app,
    container,
  }
}

const unbind = (el) => {
  // console.log('unbind')
  const instance = el[INSTANCE]
  if (instance) {
    instance.app.unmount()
    instance.container.remove()
  }
  delete el[INSTANCE]
}

const update = (el, binding) => {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind(el, binding)
  }
}

export default { mounted: bind, unmounted: unbind, updated: update }
