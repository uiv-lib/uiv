import {mergeData} from 'vue-functional-data-merge'

export default {
  functional: true,
  render (h, {children, data, props}) {
    return h(
      'form',
      mergeData(data, {
        class: {
          'navbar-form': true,
          'navbar-left': props.left,
          'navbar-right': props.right
        }
      }),
      children
    )
  },
  props: {
    left: Boolean,
    right: Boolean
  }
}
