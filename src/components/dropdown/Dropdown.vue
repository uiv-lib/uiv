<script>
  import utils from './../../utils/domUtils'

  export default {
    render (h) {
      return h(
        this.tag,
        {
          'class': {
            dropdown: true,
            open: this.value
          }
        },
        [
          this.$slots.default,
          h(
            'ul',
            {
              'class': {
                'dropdown-menu': true
              },
              ref: 'dropdown'
            },
            [this.$slots.dropdown]
          )
        ]
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
      },
      value: {
        type: Boolean,
        'default': false
      }
    },
    watch: {
      value (v) {
        this.toggle(v)
      }
    },
    mounted () {
      utils.on(window, utils.events.CLICK, this.windowClicked)
    },
    beforeDestroy () {
      this.removeDropdownFromBody()
      utils.off(window, utils.events.CLICK, this.windowClicked)
    },
    methods: {
      toggle (show) {
        if (this.appendToBody) {
          show ? this.appendDropdownToBody() : this.removeDropdownFromBody()
        }
      },
      windowClicked (event) {
        let target = event.target
        if (this.value && target) {
          let targetInNotCloseElements = false
          if (this.notCloseElements) {
            for (let i = 0, l = this.notCloseElements.length; i < l; i++) {
              if (this.notCloseElements[i].contains(target)) {
                targetInNotCloseElements = true
                break
              }
            }
          }
          let targetInDropdownBody = this.$refs.dropdown.contains(target)
          let targetInTrigger = this.$el.contains(target) && !targetInDropdownBody
          if (!targetInTrigger && !targetInNotCloseElements) {
            this.$emit('input', false)
          }
        }
      },
      appendDropdownToBody () {
        try {
          let el = this.$refs.dropdown
          el.style.display = 'block'
          document.body.appendChild(el)
          utils.setDropdownPosition(el, this.$el)
        } catch (e) {
          // Silent
        }
      },
      removeDropdownFromBody () {
        try {
          let el = this.$refs.dropdown
          el.removeAttribute('style')
          this.$el.appendChild(el)
        } catch (e) {
          // Silent
        }
      }
    }
  }
</script>
