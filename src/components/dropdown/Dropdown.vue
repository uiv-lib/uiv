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
      },
      notCloseElements: {
        type: Array
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
        utils.on(this.triggerEl, utils.events.CLICK, this.toggle)
      }
      utils.on(window, utils.events.CLICK, this.windowClicked)
    },
    beforeDestroy () {
      this.removeDropdownFromBody()
      if (this.triggerEl) {
        utils.off(this.triggerEl, utils.events.CLICK, this.toggle)
      }
      utils.off(window, utils.events.CLICK, this.windowClicked)
    },
    methods: {
      toggle (show) {
        if (typeof show === 'boolean') {
          this.show = show
        } else {
          this.show = !this.show
        }
        if (this.appendToBody) {
          this.show ? this.appendDropdownToBody() : this.removeDropdownFromBody()
        }
      },
      windowClicked (event) {
        let targetInNotCloseElements = false
        if (this.notCloseElements) {
          for (let i = 0, l = this.notCloseElements.length; i < l; i++) {
            if (this.notCloseElements[i].contains(event.target)) {
              targetInNotCloseElements = true
              break
            }
          }
        }
        if (this.triggerEl && !this.triggerEl.contains(event.target) && !targetInNotCloseElements) {
          this.show = false
          if (this.appendToBody) {
            this.removeDropdownFromBody()
          }
        }
      },
      appendDropdownToBody () {
        try {
          let el = this.$slots.dropdown[0].elm
          el.style.display = 'block'
          document.body.appendChild(el)
          utils.setDropdownPosition(el, this.$el)
        } catch (e) {
          // Silent
        }
      },
      removeDropdownFromBody () {
        try {
          let el = this.$slots.dropdown[0].elm
          el.style.display = null
          el.style.top = null
          el.style.left = null
          this.$el.appendChild(el)
        } catch (e) {
          // Silent
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
