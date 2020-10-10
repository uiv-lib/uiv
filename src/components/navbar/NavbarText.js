import { mergeData } from 'vue-functional-data-merge'

export default {
  functional: true,
  render (h, { children, data, props }) {
    return h(
      'p',
      mergeData(data, {
        class: {
          'navbar-text': true,
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
