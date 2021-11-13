import { mergeData } from 'vue-functional-data-merge'

export default {
  functional: true,
  render(h, { props, children, data }) {
    return h(
      'div',
      mergeData(data, {
        class: {
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical,
          'btn-group-justified': props.justified,
          [`btn-group-${props.size}`]: props.size,
        },
        attrs: {
          role: 'group',
          'data-toggle': 'buttons',
        },
      }),
      children
    )
  },
  props: {
    size: String,
    vertical: {
      type: Boolean,
      default: false,
    },
    justified: {
      type: Boolean,
      default: false,
    },
  },
}
