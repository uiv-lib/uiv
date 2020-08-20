import Local from '../../mixins/locale.mixin'
import Btn from './../button/Btn'
import {
  EVENTS,
  on,
  off,
  removeFromDom,
  toggleBodyOverflow,
  addClass,
  removeClass,
  getComputedStyle
} from '../../utils/dom.utils'
import { isFunction, isPromiseSupported } from '../../utils/object.utils'

const MODAL_BACKDROP = 'modal-backdrop'
const IN = 'in'
const getOpenModals = () => document.querySelectorAll(`.${MODAL_BACKDROP}`)
const getOpenModalNum = () => getOpenModals().length

export default {
  mixins: [Local],
  components: { Btn },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: String,
    size: String,
    backdrop: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    cancelText: String,
    cancelType: {
      type: String,
      default: 'default'
    },
    okText: String,
    okType: {
      type: String,
      default: 'primary'
    },
    dismissBtn: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Number,
      default: 150
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    beforeClose: Function,
    zOffset: {
      type: Number,
      default: 20
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    displayStyle: {
      type: String,
      default: 'block'
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    modalSizeClass () {
      return {
        [`modal-${this.size}`]: Boolean(this.size)
      }
    }
  },
  watch: {
    value (v) {
      this.$toggle(v)
    }
  },
  mounted () {
    removeFromDom(this.$refs.backdrop)
    on(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose)
    on(window, EVENTS.KEY_UP, this.onKeyPress)
    if (this.value) {
      this.$toggle(true)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeoutId)
    removeFromDom(this.$refs.backdrop)
    removeFromDom(this.$el)
    if (getOpenModalNum() === 0) {
      toggleBodyOverflow(true)
    }
    off(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose)
    off(window, EVENTS.MOUSE_UP, this.unsuppressBackgroundClose)
    off(window, EVENTS.KEY_UP, this.onKeyPress)
  },
  methods: {
    onKeyPress (event) {
      if (this.keyboard && this.value && event.keyCode === 27) {
        const thisModal = this.$refs.backdrop
        let thisZIndex = thisModal.style.zIndex
        thisZIndex = thisZIndex && thisZIndex !== 'auto' ? parseInt(thisZIndex) : 0
        // Find out if this modal is the top most one.
        const modals = getOpenModals()
        const modalsLength = modals.length
        for (let i = 0; i < modalsLength; i++) {
          if (modals[i] !== thisModal) {
            let zIndex = modals[i].style.zIndex
            zIndex = zIndex && zIndex !== 'auto' ? parseInt(zIndex) : 0
            // if any existing modal has higher zIndex, ignore
            if (zIndex > thisZIndex) {
              return
            }
          }
        }
        this.toggle(false)
      }
    },
    toggle (show, msg) {
      let shouldClose = true
      if (isFunction(this.beforeClose)) {
        shouldClose = this.beforeClose(msg)
      }

      if (isPromiseSupported()) {
        // Skip the hiding when beforeClose returning falsely value or returned Promise resolves to falsely value
        // Use Promise.resolve to accept both Boolean values and Promises
        Promise.resolve(shouldClose).then((shouldClose) => {
          // Skip the hiding while show===false
          if (!show && shouldClose) {
            this.msg = msg
            this.$emit('input', show)
          }
        })
      } else {
        // Fallback to old version if promise is not supported
        // skip the hiding while show===false & beforeClose returning falsely value
        if (!show && !shouldClose) {
          return
        }

        this.msg = msg
        this.$emit('input', show)
      }
    },
    $toggle (show) {
      const modal = this.$el
      const backdrop = this.$refs.backdrop
      clearTimeout(this.timeoutId)
      if (show) {
        // If two modals share the same v-if condition the calculated z-index is incorrect,
        // resulting in popover misbehaviour.
        // solved by adding a nextTick.
        // https://github.com/uiv-lib/uiv/issues/342
        this.$nextTick(() => {
          const alreadyOpenModalNum = getOpenModalNum()
          document.body.appendChild(backdrop)
          if (this.appendToBody) {
            document.body.appendChild(modal)
          }
          modal.style.display = this.displayStyle
          modal.scrollTop = 0
          backdrop.offsetHeight // force repaint
          toggleBodyOverflow(false)
          addClass(backdrop, IN)
          addClass(modal, IN)
          // fix z-index for nested modals
          // no need to calculate if no modal is already open
          if (alreadyOpenModalNum > 0) {
            const modalBaseZ = parseInt(getComputedStyle(modal).zIndex) || 1050 // 1050 is default modal z-Index
            const backdropBaseZ = parseInt(getComputedStyle(backdrop).zIndex) || 1040 // 1040 is default backdrop z-Index
            const offset = alreadyOpenModalNum * this.zOffset
            modal.style.zIndex = `${modalBaseZ + offset}`
            backdrop.style.zIndex = `${backdropBaseZ + offset}`
          }
          // z-index fix end
          this.timeoutId = setTimeout(() => {
            if (this.autoFocus) {
              let btn = this.$el.querySelector('[data-action="auto-focus"]')
              if (btn) {
                btn.focus()
              }
            }
            this.$emit('show')
            this.timeoutId = 0
          }, this.transition)
        })
      } else {
        removeClass(backdrop, IN)
        removeClass(modal, IN)
        this.timeoutId = setTimeout(() => {
          modal.style.display = 'none'
          removeFromDom(backdrop)
          if (this.appendToBody) {
            removeFromDom(modal)
          }
          if (getOpenModalNum() === 0) {
            toggleBodyOverflow(true)
          }
          this.$emit('hide', this.msg || 'dismiss')
          this.msg = ''
          this.timeoutId = 0
          // restore z-index for nested modals
          modal.style.zIndex = ''
          backdrop.style.zIndex = ''
          // z-index fix end
        }, this.transition)
      }
    },
    suppressBackgroundClose: function (event) {
      if (event && event.target === this.$el) {
        return
      }

      this.isCloseSuppressed = true
      on(window, 'mouseup', this.unsuppressBackgroundClose)
    },
    unsuppressBackgroundClose: function () {
      if (this.isCloseSuppressed) {
        off(window, 'mouseup', this.unsuppressBackgroundClose)
        setTimeout(() => {
          this.isCloseSuppressed = false
        }, 1)
      }
    },
    backdropClicked (event) {
      if (this.backdrop && !this.isCloseSuppressed) {
        this.toggle(false)
      }
    }
  }
}
