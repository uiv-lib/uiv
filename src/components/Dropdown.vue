<script>
  export default {
    render (createElement) {
      return createElement(
        this.tag,
        {
          'class': {
            dropdown: true,
            open: this.show
          }
        },
        [this.$slots.default, this.$slots.dropdown]
      )
    },
    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },
    data () {
      return {
        show: false,
        triggerEl: undefined
      }
    },
    mounted () {
      this.triggerEl = this.$el.querySelector('[data-role="trigger"]')
      if (this.triggerEl) {
        this.triggerEl.addEventListener('click', this.toggle)
      }
      window.addEventListener('click', this.windowClicked)
    },
    beforeDestroy () {
      if (this.triggerEl) {
        this.triggerEl.removeEventListener('click', this.toggle)
      }
      window.removeEventListener('click', this.windowClicked)
    },
    methods: {
      toggle () {
        this.show = !this.show
      },
      windowClicked (event) {
        if (!this.triggerEl || !this.triggerEl.contains(event.target)) {
          this.show = false
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
