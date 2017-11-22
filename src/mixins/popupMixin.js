import {
  PLACEMENTS,
  ensureElementMatchesFunction,
  on,
  off,
  EVENTS,
  TRIGGERS,
  removeFromDom,
  removeClass,
  hasClass,
  setTooltipPosition
} from '@src/utils/domUtils'

const SHOW_CLASS = 'in'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'span'
    },
    placement: {
      type: String,
      default: PLACEMENTS.TOP
    },
    autoPlacement: {
      type: Boolean,
      default: true
    },
    appendTo: {
      type: String,
      default: 'body'
    },
    transitionDuration: {
      type: Number,
      default: 150
    },
    enable: {
      type: Boolean,
      default: true
    },
    target: null
  },
  data () {
    return {
      triggerEl: null,
      timeoutId: 0
    }
  },
  watch: {
    value (v) {
      v ? this.show() : this.hide()
    },
    trigger () {
      this.clearListeners()
      this.initListeners()
    },
    target (value) {
      this.clearListeners()
      this.initTriggerElByTarget(value)
      this.initListeners()
    }
  },
  mounted () {
    ensureElementMatchesFunction()
    removeFromDom(this.$refs.popup)
    this.$nextTick(() => {
      this.initTriggerElByTarget(this.target)
      this.initListeners()
      if (this.value) {
        this.show()
      }
    })
  },
  beforeDestroy () {
    this.clearListeners()
    removeFromDom(this.$refs.popup)
  },
  methods: {
    initListeners () {
      if (this.triggerEl) {
        if (this.trigger === TRIGGERS.HOVER) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.show)
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide)
        } else if (this.trigger === TRIGGERS.FOCUS) {
          on(this.triggerEl, EVENTS.FOCUS, this.show)
          on(this.triggerEl, EVENTS.BLUR, this.hide)
        } else if (this.trigger === TRIGGERS.HOVER_FOCUS) {
          on(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto)
          on(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto)
          on(this.triggerEl, EVENTS.FOCUS, this.handleAuto)
          on(this.triggerEl, EVENTS.BLUR, this.handleAuto)
        } else if (this.trigger === TRIGGERS.CLICK || this.trigger === TRIGGERS.OUTSIDE_CLICK) {
          on(this.triggerEl, EVENTS.CLICK, this.toggle)
        }
      }
      on(window, EVENTS.CLICK, this.windowClicked)
    },
    clearListeners () {
      if (this.triggerEl) {
        off(this.triggerEl, EVENTS.FOCUS, this.show)
        off(this.triggerEl, EVENTS.BLUR, this.hide)
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.show)
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.hide)
        off(this.triggerEl, EVENTS.CLICK, this.toggle)
        off(this.triggerEl, EVENTS.MOUSE_ENTER, this.handleAuto)
        off(this.triggerEl, EVENTS.MOUSE_LEAVE, this.handleAuto)
        off(this.triggerEl, EVENTS.FOCUS, this.handleAuto)
        off(this.triggerEl, EVENTS.BLUR, this.handleAuto)
      }
      off(window, EVENTS.CLICK, this.windowClicked)
    },
    resetPosition () {
      const popup = this.$refs.popup
      setTooltipPosition(popup, this.triggerEl, this.placement, this.autoPlacement, this.appendTo)
      popup.offsetHeight
    },
    showOnHover () {
      if (this.trigger === TRIGGERS.HOVER || this.trigger === TRIGGERS.HOVER_FOCUS) {
        this.show()
      }
    },
    hideOnLeave () {
      if (this.trigger === TRIGGERS.HOVER || (this.trigger === TRIGGERS.HOVER_FOCUS && !this.triggerEl.matches(':focus'))) {
        this.hide()
      }
    },
    toggle () {
      if (this.isShown()) {
        this.hide()
      } else {
        this.show()
      }
    },
    hide () {
      if (this.isShown()) {
        clearTimeout(this.timeoutId)
        removeClass(this.$refs.popup, SHOW_CLASS)
        this.timeoutId = setTimeout(() => {
          removeFromDom(this.$refs.popup)
          this.timeoutId = 0
          this.$emit('input', false)
          this.$emit('hide')
        }, this.transitionDuration)
      }
    },
    isShown () {
      return hasClass(this.$refs.popup, SHOW_CLASS)
    },
    windowClicked (event) {
      if (this.triggerEl && !this.triggerEl.contains(event.target) &&
        this.trigger === TRIGGERS.OUTSIDE_CLICK && !this.$refs.popup.contains(event.target) &&
        this.isShown()) {
        this.hide()
      }
    },
    handleAuto () {
      setTimeout(() => {
        if (this.triggerEl.matches(':hover, :focus')) {
          this.show()
        } else {
          this.hide()
        }
      }, 20) // 20ms make firefox happy
    }
  }
}
