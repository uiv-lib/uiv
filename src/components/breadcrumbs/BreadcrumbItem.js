import mergeData from 'vue-functional-data-merge'

export default {
  functional: true,
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
    },
    // <a> props
    href: String,
    target: {
      type: String,
      default: '_self'
    },
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
}
