import Tooltip from '../../components/tooltip/Tooltip.js'
import Vue from 'vue'
import { hasOwnProperty } from '../../utils/object.utils'

const INSTANCE = '_uiv_tooltip_instance'

const bind = (el, binding) => {
  // console.log('bind')
  unbind(el)
  const Constructor = Vue.extend(Tooltip)
  const vm = new Constructor({
    propsData: {
      target: el,
      appendTo: binding.arg && '#' + binding.arg,
      text:
        typeof binding.value === 'string'
          ? binding.value && binding.value.toString()
          : binding.value &&
            binding.value.text &&
            binding.value.text.toString(),
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
    },
  })
  const options = []
  for (const key in binding.modifiers) {
    if (hasOwnProperty(binding.modifiers, key) && binding.modifiers[key]) {
      options.push(key)
    }
  }
  options.forEach((option) => {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      vm.placement = option
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      vm.trigger = option
    } else if (/unenterable/.test(option)) {
      vm.enterable = false
    }
  })
  vm.$mount()
  el[INSTANCE] = vm
}

const unbind = (el) => {
  // console.log('unbind')
  const vm = el[INSTANCE]
  if (vm) {
    vm.$destroy()
  }
  delete el[INSTANCE]
}

const update = (el, binding) => {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind(el, binding)
  }
}

export default { bind, unbind, update }
