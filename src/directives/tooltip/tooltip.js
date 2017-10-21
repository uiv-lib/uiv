import Tooltip from './../../components/tooltip/Tooltip.vue'
import Vue from 'vue'

const TOOLTIP_INSTANCE = '_uiv_tooltip_instance'

const bind = (el, binding) => {
  // console.log('bind')
  unbind(el)
  let Constructor = Vue.extend(Tooltip)
  let vm = new Constructor()
  vm.target = el
  let options = []
  for (let key in binding.modifiers) {
    if (binding.modifiers.hasOwnProperty(key) && binding.modifiers[key]) {
      options.push(key)
    }
  }
  options.forEach(option => {
    if (/(top)|(left)|(right)|(bottom)/.test(option)) {
      vm.placement = option
    } else if (/(hover)|(focus)|(click)/.test(option)) {
      vm.trigger = option
    }
  })
  try {
    vm.text = binding.value.toString()
  } catch (err) {
    vm.text = ''
  }
  vm.$mount()
  el[TOOLTIP_INSTANCE] = vm
}

const unbind = (el) => {
  // console.log('unbind')
  let vm = el[TOOLTIP_INSTANCE]
  if (vm) {
    vm.$destroy()
  }
  delete el[TOOLTIP_INSTANCE]
}

const update = (el, binding) => {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind(el, binding)
  }
}

export default {bind, unbind, update}
