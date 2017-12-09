import {mergeData} from 'vue-functional-data-merge'
import linkMixin from '@src/mixins/linkMixin'

export default {
  functional: true,
  mixins: [linkMixin],
  render (h, {props, data, children}) {
    let slot
    if (props.active) {
      slot = children
    } else if (props.to) {
      slot = [
        h('router-link', {
          props: {
            to: props.to,
            replace: props.replace,
            append: props.append,
            exact: props.exact
          }
        }, children)
      ]
    } else {
      slot = [
        h('a', {
          attrs: {
            href: props.href,
            target: props.target
          }
        }, children)
      ]
    }
    return h('li', mergeData(data, {class: {active: props.active}}), slot)
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
