<script>
  export default {
    functional: true,
    render (h, ctx) {
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
        ctx.children
      )
    }
  }
</script>
