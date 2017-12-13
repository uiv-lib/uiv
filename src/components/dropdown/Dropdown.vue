<script>
  import {setDropdownPosition, on, off, EVENTS} from '../../utils/domUtils'
  import {isBoolean} from '../../utils/objectUtils'

  const DEFAULT_TAG = 'div'

  export default {
    render (h) {
      return h(
        this.tag,
        {
          class: {
            'btn-group': this.tag === DEFAULT_TAG,
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
              class: {
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
        default: DEFAULT_TAG
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      value: Boolean,
      dropup: {
        type: Boolean,
        default: false
      },
      menuRight: {
        type: Boolean,
        default: false
      },
      notCloseElements: Array,
      positionElement: null
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
      this.initTrigger()
      if (this.triggerEl) {
        on(this.triggerEl, EVENTS.CLICK, this.toggle)
      }
      on(window, EVENTS.CLICK, this.windowClicked)
      if (this.value) {
        this.toggle(true)
      }
    },
    beforeDestroy () {
      this.removeDropdownFromBody()
      if (this.triggerEl) {
        off(this.triggerEl, EVENTS.CLICK, this.toggle)
      }
      off(window, EVENTS.CLICK, this.windowClicked)
    },
    methods: {
      initTrigger () {
        const trigger = this.$el.querySelector('[data-role="trigger"]') || this.$el.querySelector('.dropdown-toggle') || this.$el.firstChild
        this.triggerEl = trigger && trigger !== this.$refs.dropdown ? trigger : null
      },
      toggle (show) {
        if (isBoolean(show)) {
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
          setDropdownPosition(el, positionElement, this)
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
