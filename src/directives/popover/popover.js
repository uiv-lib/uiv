import Popover from '@src/components/popover/Popover.vue'
import Vue from 'vue'

const INSTANCE = '_uiv_popover_instance'

const bind = (el, binding) => {
  // console.log('bind')
  unbind(el)
  let Constructor = Vue.extend(Popover)
  let vm = new Constructor({
    propsData: {
      target: el,
      appendTo: binding.arg && '#' + binding.arg,
      title: binding.value && binding.value.title && binding.value.title.toString(),
      content: binding.value && binding.value.content && binding.value.content.toString()
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
