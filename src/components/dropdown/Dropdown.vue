<script>
  import utils from './../../utils/domUtils'

  export default {
    render (h) {
      return h(
        this.tag,
        {
          'class': {
            dropdown: !this.dropup,
            dropup: this.dropup,
            open: this.show
          }
        },
        [
          this.$slots.default,
          h(
            'ul',
            {
              'class': {
                'dropdown-menu': true,
                'dropdown-menu-right': this.menuRight
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
      value: {
        type: Boolean
      },
      dropup: {
        type: Boolean,
        'default': false
      },
      menuRight: {
        type: Boolean,
        'default': false
      },
      notCloseElements: {
        type: Array
      },
      positionElement: {}
    },
    data () {
      return {
        show: false,
        triggerEl: undefined
      }
    },
    watch: {
      value (v) {
        this.toggle(v)
      }
    },
    mounted () {
      this.triggerEl = this.$el.querySelector('[data-role="trigger"]')
      if (this.triggerEl) {
        utils.on(this.triggerEl, utils.events.CLICK, this.toggle)
      }
      utils.on(window, utils.events.CLICK, this.windowClicked)
      if (this.value) {
        this.toggle(true)
      }
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
        this.$emit('input', this.show)
      },
      windowClicked (event) {
        let target = event.target
        if (this.show && target) {
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
            this.toggle(false)
          }
        }
      },
      appendDropdownToBody () {
        try {
          let el = this.$refs.dropdown
          el.style.display = 'block'
          document.body.appendChild(el)
          let positionElement = this.positionElement || this.$el
          utils.setDropdownPosition(el, positionElement, this)
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
