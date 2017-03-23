<script>
  import utils from './../../utils/domUtils'

  export default {
    render (h) {
      return h(
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
        'default': 'div'
      },
      appendToBody: {
        type: Boolean,
        'default': false
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
        if (this.appendToBody && this.$slots.dropdown && this.$slots.dropdown.length) {
          if (this.show) {
            this.appendDropdownToBody()
          } else {
            this.removeDropdownFromBody()
          }
        }
      },
      windowClicked (event) {
        if (this.triggerEl && !this.triggerEl.contains(event.target)) {
          this.show = false
          if (this.appendToBody && this.$slots.dropdown && this.$slots.dropdown.length) {
            this.removeDropdownFromBody()
          }
        }
      },
      appendDropdownToBody () {
        let el = this.$slots.dropdown[0].elm
        el.style.display = 'block'
        document.body.appendChild(el)
        utils.setDropdownPosition(el, this.$el)
      },
      removeDropdownFromBody () {
        let el = this.$slots.dropdown[0].elm
        el.style.display = null
        el.style.top = null
        el.style.left = null
        this.$el.appendChild(el)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
