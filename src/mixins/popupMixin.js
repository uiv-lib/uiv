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
  setTooltipPosition,
  isElement,
  addClass
} from '../utils/domUtils'
import {isString} from '../utils/objectUtils'

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
    hideDelay: {
      type: Number,
      default: 0
    },
    showDelay: {
      type: Number,
      default: 0
    },
    enable: {
      type: Boolean,
      default: true
    },
    enterable: {
      type: Boolean,
      default: true
    },
    target: null
  },
  data () {
    return {
      triggerEl: null,
      hideTimeoutId: 0,
      showTimeoutId: 0
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
    },
    allContent (value) {
      // can not use value because it can not detect slot changes
      if (this.isNotEmpty()) {
        // reset position while content changed & is shown
        // nextTick is required
        this.$nextTick(() => {
          if (this.isShown()) {
            this.resetPosition()
          }
        })
      } else {
        this.hide()
      }
    },
    enable (value) {
      // hide if enable changed to false
      if (!value) {
        this.hide()
      }
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
    initTriggerElByTarget (target) {
      if (target) {
        // target exist
        if (isString(target)) { // is selector
          this.triggerEl = document.querySelector(target)
        } else if (isElement(target)) { // is element
          this.triggerEl = target
        } else if (isElement(target.$el)) { // is component
          this.triggerEl = target.$el
        }
      } else {
        // find special element
        let trigger = this.$el.querySelector('[data-role="trigger"]')
        if (trigger) {
          this.triggerEl = trigger
        } else {
          // use the first child
          let firstChild = this.$el.firstChild
          this.triggerEl = firstChild === this.$refs.popup ? null : firstChild
        }
      }
    },
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
    hideOnLeave () {
      if (this.trigger === TRIGGERS.HOVER || (this.trigger === TRIGGERS.HOVER_FOCUS && !this.triggerEl.matches(':focus'))) {
        this.$hide()
      }
    },
    toggle () {
      if (this.isShown()) {
        this.hide()
      } else {
        this.show()
      }
    },
    show () {
      if (this.enable && this.triggerEl && this.isNotEmpty() && !this.isShown()) {
        let popup = this.$refs.popup
        const popUpAppendedContainer = this.hideTimeoutId > 0 // weird condition
        if (popUpAppendedContainer) {
          clearTimeout(this.hideTimeoutId)
          this.hideTimeoutId = 0
        }
        this.showTimeoutId = setTimeout(() => {
          // add to dom
          if (!popUpAppendedContainer) {
            popup.className = `${this.name} ${this.placement} fade`
            let container = document.querySelector(this.appendTo)
            container.appendChild(popup)
            this.resetPosition()
          }
          addClass(popup, SHOW_CLASS)
          this.$emit('input', true)
          this.$emit('show')
        }, this.showDelay)
      }
    },
    hide () {
      if (this.showTimeoutId > 0) {
        clearTimeout(this.showTimeoutId)
        this.showTimeoutId = 0
      }

      if (!this.isShown()) {
        return
      }
      if (this.enterable && (this.trigger === TRIGGERS.HOVER || this.trigger === TRIGGERS.HOVER_FOCUS)) {
        setTimeout(() => {
          if (!this.$refs.popup.matches(':hover')) {
            this.$hide()
          }
        }, 100)
      } else {
        this.$hide()
      }
    },
    $hide () {
      if (this.isShown()) {
        clearTimeout(this.hideTimeoutId)
        this.hideTimeoutId = setTimeout(() => {
          removeClass(this.$refs.popup, SHOW_CLASS)
          // gives fade out time
          setTimeout(() => {
            removeFromDom(this.$refs.popup)
            this.hideTimeoutId = 0
            this.$emit('input', false)
            this.$emit('hide')
          }, this.transitionDuration)
        }, this.hideDelay)
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
