export default {
  functional: true,
  render (h, {children}) {
    return h(
      'div',
      {
        class: {
          'btn-toolbar': true
        },
        attrs: {
          role: 'toolbar'
        }
      },
      children
    )
  }
}
