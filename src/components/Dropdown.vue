<script>
  export default {
    render: function (createElement) {
      let content = [this.$slots.default]
      if (this.show) {
        content.push(this.$slots.dropdown)
      }
      return createElement(
        this.tag,
        {
          'class': {
            dropdown: true
          }
        },
        content
      )
    },
    props: {
      tag: {
        type: String,
        default: 'span'
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
  .dropdown {
    position: relative;
    display: inline-block;

    .dropdown-menu {
      display: block;
    }
  }
</style>
