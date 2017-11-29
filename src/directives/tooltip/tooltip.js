import Tooltip from '@src/components/tooltip/Tooltip.vue'
import Vue from 'vue'

const INSTANCE = '_uiv_tooltip_instance'

const bind = (el, binding) => {
  // console.log('bind')
  unbind(el)
  let Constructor = Vue.extend(Tooltip)
  let vm = new Constructor({
    propsData: {
      target: el,
      appendTo: binding.arg && '#' + binding.arg,
      text: binding.value && binding.value.toString()
    }
  })
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
  vm.$mount()
  el[INSTANCE] = vm
}

const unbind = (el) => {
  // console.log('unbind')
  let vm = el[INSTANCE]
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

export default {bind, unbind, update}
