import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { install } from '../install'

export const createWrapper = (template, _data, _options) => {
  const localVue = createLocalVue()
  localVue.use(install)
  return mount(
    {
      data() {
        return {
          ..._data,
        }
      },
      ..._options,
      template: template,
    },
    { localVue, attachTo: document.body }
  )
}

export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export async function nextTick(times = 5) {
  for (let i = 0; i < times; ++i) {
    await Vue.prototype.$nextTick()
  }
}
