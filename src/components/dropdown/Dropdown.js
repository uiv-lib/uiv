import {
  setDropdownPosition,
  on,
  off,
  EVENTS,
  focus,
} from '../../utils/dom.utils'
import { isBoolean } from '../../utils/object.utils'

const DEFAULT_TAG = 'div'

export default {
  render(h) {
    return h(
      this.tag,
      {
        class: {
          'btn-group': this.tag === DEFAULT_TAG,
          dropdown: !this.dropup,
          dropup: this.dropup,
          open: this.show,
        },
      },
      [
        this.$slots.default,
        h(
          'ul',
          {
            class: {
              'dropdown-menu': true,
              'dropdown-menu-right': this.menuRight,
            },
            ref: 'dropdown',
          },
          [this.$slots.dropdown]
        ),
      ]
    )
  },
  props: {
    tag: {
      type: String,
      default: DEFAULT_TAG,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    value: Boolean,
    dropup: {
      type: Boolean,
      default: false,
    },
    menuRight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    notCloseElements: Array,
    positionElement: null,
  },
  data() {
    return {
      show: false,
      triggerEl: undefined,
    }
  },
  watch: {
    value(v) {
      this.toggle(v)
    },
  },
  mounted() {
    this.initTrigger()
    if (this.triggerEl) {
      on(this.triggerEl, EVENTS.CLICK, this.toggle)
      on(this.triggerEl, EVENTS.KEY_DOWN, this.onKeyPress)
    }
    on(this.$refs.dropdown, EVENTS.KEY_DOWN, this.onKeyPress)
    on(window, EVENTS.CLICK, this.windowClicked)
    on(window, EVENTS.TOUCH_END, this.windowClicked)
    if (this.value) {
      this.toggle(true)
    }
  },
  beforeDestroy() {
    this.removeDropdownFromBody()
    if (this.triggerEl) {
      off(this.triggerEl, EVENTS.CLICK, this.toggle)
      off(this.triggerEl, EVENTS.KEY_DOWN, this.onKeyPress)
    }
    off(this.$refs.dropdown, EVENTS.KEY_DOWN, this.onKeyPress)
    off(window, EVENTS.CLICK, this.windowClicked)
    off(window, EVENTS.TOUCH_END, this.windowClicked)
  },
  methods: {
    getFocusItem() {
      const dropdownEl = this.$refs.dropdown
      /* START.TESTS_ONLY */
      /* istanbul ignore else */
      if (typeof window.__karma__ !== 'undefined') {
        return dropdownEl.querySelector('li > a[focus=true]')
      }
      /* END.TESTS_ONLY */
      /* istanbul ignore next */
      return dropdownEl.querySelector('li > a:focus')
    },
    onKeyPress(event) {
      if (this.show) {
        const dropdownEl = this.$refs.dropdown
        const keyCode = event.keyCode
        if (keyCode === 27) {
          // esc
          this.toggle(false)
          this.triggerEl && this.triggerEl.focus()
        } else if (keyCode === 13) {
          // enter
          const currentFocus = this.getFocusItem()
          currentFocus && currentFocus.click()
        } else if (keyCode === 38 || keyCode === 40) {
          // up || down
          event.preventDefault()
          event.stopPropagation()
          const currentFocus = this.getFocusItem()
          const items = dropdownEl.querySelectorAll('li:not(.disabled) > a')
          if (!currentFocus) {
            focus(items[0])
          } else {
            for (let i = 0; i < items.length; i++) {
              if (currentFocus === items[i]) {
                if (keyCode === 38 && i < items.length > 0) {
                  focus(items[i - 1])
                } else if (keyCode === 40 && i < items.length - 1) {
                  focus(items[i + 1])
                }
                break
              }
            }
          }
        }
      }
    },
    initTrigger() {
      const trigger =
        this.$el.querySelector('[data-role="trigger"]') ||
        this.$el.querySelector('.dropdown-toggle') ||
        this.$el.firstChild
      this.triggerEl =
        trigger && trigger !== this.$refs.dropdown ? trigger : null
    },
    toggle(show) {
      if (this.disabled) {
        return
      }
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
    windowClicked(event) {
      const target = event.target
      if (this.show && target) {
        let targetInNotCloseElements = false
        if (this.notCloseElements) {
          for (let i = 0, l = this.notCloseElements.length; i < l; i++) {
            const isTargetInElement = this.notCloseElements[i].contains(target)
            let shouldBreak = isTargetInElement
            /* istanbul ignore else */
            if (this.appendToBody) {
              const isTargetInDropdown = this.$refs.dropdown.contains(target)
              const isElInElements =
                this.notCloseElements.indexOf(this.$el) >= 0
              shouldBreak =
                isTargetInElement || (isTargetInDropdown && isElInElements)
            }
            if (shouldBreak) {
              targetInNotCloseElements = true
              break
            }
          }
        }
        const targetInDropdownBody = this.$refs.dropdown.contains(target)
        const targetInTrigger =
          this.$el.contains(target) && !targetInDropdownBody
        // normally, a dropdown select event is handled by @click that trigger after @touchend
        // then @touchend event have to be ignore in this case
        const targetInDropdownAndIsTouchEvent =
          targetInDropdownBody && event.type === 'touchend'
        if (
          !targetInTrigger &&
          !targetInNotCloseElements &&
          !targetInDropdownAndIsTouchEvent
        ) {
          this.toggle(false)
        }
      }
    },
    appendDropdownToBody() {
      try {
        const el = this.$refs.dropdown
        el.style.display = 'block'
        document.body.appendChild(el)
        const positionElement = this.positionElement || this.$el
        setDropdownPosition(el, positionElement, this)
      } catch (e) {
        // Silent
      }
    },
    removeDropdownFromBody() {
      try {
        const el = this.$refs.dropdown
        el.removeAttribute('style')
        this.$el.appendChild(el)
      } catch (e) {
        // Silent
      }
    },
  },
}
