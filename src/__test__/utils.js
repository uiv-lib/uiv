import Vue from 'vue'
import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
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
    {
      localVue,
      attachTo: document.body,
      stubs: {
        RouterLink: RouterLinkStub,
        'router-link': RouterLinkStub,
      },
    }
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

/**
 * just a wrapper for historical codes
 */
export async function triggerEvent(wrapper, event) {
  if (wrapper instanceof HTMLElement) {
    wrapper.dispatchEvent(
      new Event(event, {
        bubbles: true,
        cancelable: true,
      })
    )
  } else {
    await wrapper.trigger(event)
  }
}

export const keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46],
}

export const transition = 300

export const triggerKey = (el, key, type = 'down') => {
  if (document.createEventObject) {
    let eventObj = document.createEventObject()
    eventObj.keyCode = key
    el.fireEvent(`onkey${type}`, eventObj)
    eventObj.keyCode = key
  } else if (document.createEvent) {
    let eventObj = document.createEvent('Events')
    eventObj.initEvent(`key${type}`, true, true)
    eventObj.which = key
    eventObj.keyCode = key
    el.dispatchEvent(eventObj)
  }
}
