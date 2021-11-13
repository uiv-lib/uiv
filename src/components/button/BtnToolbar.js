import { mergeData } from 'vue-functional-data-merge'

export default {
  functional: true,
  render(h, { children, data }) {
    return h(
      'div',
      mergeData(data, {
        class: {
          'btn-toolbar': true,
        },
        attrs: {
          role: 'toolbar',
        },
      }),
      children
    )
  },
}
