import {
  PLACEMENTS,
  on,
  off,
  EVENTS,
  TRIGGERS,
  removeFromDom,
  removeClass,
  hasClass,
  setTooltipPosition,
  addClass,
  getOpenModalNum,
  getElementBySelectorOrRef,
} from '../utils/dom.utils'
import { isFunction } from '../utils/object.utils'

const SHOW_CLASS = 'in'

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'span',
    },
    placement: {
      type: String,
      default: PLACEMENTS.TOP,
    },
    autoPlacement: {
      type: Boolean,
      default: true,
    },
    appendTo: {
      type: null,
      default: 'body',
    },
    positionBy: {
      type: null,
      default: null,
    },
    transition: {
      type: Number,
      default: 150,
    },
    hideDelay: {
      type: Number,
      default: 0,
    },
    showDelay: {
      type: Number,
      default: 0,
    },
    enable: {
      type: Boolean,
      default: true,
    },
    enterable: {
      type: Boolean,
      default: true,
    },
    target: null,
    viewport: null,
    customClass: String,
  },
  data() {
    return {
      triggerEl: null,
      hideTimeoutId: 0,
      showTimeoutId: 0,
      transitionTimeoutId: 0,
      autoTimeoutId: 0,
    }
  },
  watch: {
    modelValue(v) {
      v ? this.show() : this.hide()
    },
    trigger() {
      this.clearListeners()
      this.initListeners()
    },
    target(value) {
      this.clearListeners()
      this.initTriggerElByTarget(value)
      this.initListeners()
    },
    allContent(value) {
      // can not use value because it can not detect slot changes
      if (this.isNotEmpty()) {
        // reset position while content changed & is shown
        // nextTick is required
        this.$nextTick(() => {
          /* istanbul ignore else */
          if (this.isShown()) {
            this.resetPosition()
          }
        })
      } else {
        this.hide()
      }
    },
    enable(value) {
      // hide if enable changed to false
      /* istanbul ignore else */
      if (!value) {
        this.hide()
      }
    },
  },
  mounted() {
    removeFromDom(this.$refs.popup)
    this.$nextTick(() => {
      this.initTriggerElByTarget(this.target)
      this.initListeners()
      if (this.modelValue) {
        this.show()
      }
    })
  },
  beforeDestroy() {
    this.clearListeners()
    removeFromDom(this.$refs.popup)
  },
  methods: {
    initTriggerElByTarget(target) {
      if (target) {
        // target exist
        this.triggerEl = getElementBySelectorOrRef(target)
      } else {
        // find special element
        const trigger = this.$el.querySelector('[data-role="trigger"]')
        if (trigger) {
          this.triggerEl = trigger
        } else {
          // use the first child
          const firstChild = this.$el.querySelector('*')
          this.triggerEl = firstChild === this.$refs.popup ? null : firstChild
        }
      }
    },
    initListeners() {
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
        } else if (
          this.trigger === TRIGGERS.CLICK ||
          this.trigger === TRIGGERS.OUTSIDE_CLICK
        ) {
          on(this.triggerEl, EVENTS.CLICK, this.toggle)
        }
      }
      on(window, EVENTS.CLICK, this.windowClicked)
    },
    clearListeners() {
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
      this.clearTimeouts()
    },
    clearTimeouts() {
      if (this.hideTimeoutId) {
        clearTimeout(this.hideTimeoutId)
        this.hideTimeoutId = 0
      }
      if (this.showTimeoutId) {
        clearTimeout(this.showTimeoutId)
        this.showTimeoutId = 0
      }
      if (this.transitionTimeoutId) {
        clearTimeout(this.transitionTimeoutId)
        this.transitionTimeoutId = 0
      }
      if (this.autoTimeoutId) {
        clearTimeout(this.autoTimeoutId)
        this.autoTimeoutId = 0
      }
    },
    resetPosition() {
      const popup = this.$refs.popup
      /* istanbul ignore else */
      if (popup) {
        setTooltipPosition(
          popup,
          this.triggerEl,
          this.placement,
          this.autoPlacement,
          this.appendTo,
          this.positionBy,
          this.viewport
        )
        popup.offsetHeight
      }
    },
    hideOnLeave() {
      if (
        this.trigger === TRIGGERS.HOVER ||
        (this.trigger === TRIGGERS.HOVER_FOCUS &&
          !this.triggerEl.matches(':focus'))
      ) {
        this.$hide()
      }
    },
    toggle() {
      if (this.isShown()) {
        this.hide()
      } else {
        this.show()
      }
    },
    show() {
      if (
        this.enable &&
        this.triggerEl &&
        this.isNotEmpty() &&
        !this.isShown()
      ) {
        const popUpAppendedContainer = this.hideTimeoutId > 0 // weird condition
        if (popUpAppendedContainer) {
          clearTimeout(this.hideTimeoutId)
          this.hideTimeoutId = 0
        }
        if (this.transitionTimeoutId > 0) {
          clearTimeout(this.transitionTimeoutId)
          this.transitionTimeoutId = 0
        }
        clearTimeout(this.showTimeoutId)
        this.showTimeoutId = setTimeout(() => {
          this.showTimeoutId = 0
          const popup = this.$refs.popup
          if (popup) {
            const alreadyOpenModalNum = getOpenModalNum()
            if (alreadyOpenModalNum > 1) {
              const defaultZ = this.name === 'popover' ? 1060 : 1070
              const offset = (alreadyOpenModalNum - 1) * 20
              popup.style.zIndex = `${defaultZ + offset}`
            }
            // add to dom
            if (!popUpAppendedContainer) {
              popup.className = `${this.name} ${this.placement} ${
                this.customClass ? this.customClass : ''
              } fade`
              const container = getElementBySelectorOrRef(this.appendTo)
              container.appendChild(popup)
              this.resetPosition()
            }
            addClass(popup, SHOW_CLASS)
            this.$emit('update:modelValue', true)
            this.$emit('show')
          }
        }, this.showDelay)
      }
    },
    hide() {
      if (this.showTimeoutId > 0) {
        clearTimeout(this.showTimeoutId)
        this.showTimeoutId = 0
      }

      if (!this.isShown()) {
        return
      }
      if (
        this.enterable &&
        (this.trigger === TRIGGERS.HOVER ||
          this.trigger === TRIGGERS.HOVER_FOCUS)
      ) {
        clearTimeout(this.hideTimeoutId)
        this.hideTimeoutId = setTimeout(() => {
          this.hideTimeoutId = 0
          const popup = this.$refs.popup
          if (popup && !popup.matches(':hover')) {
            this.$hide()
          }
        }, 100)
      } else {
        this.$hide()
      }
    },
    $hide() {
      if (this.isShown()) {
        clearTimeout(this.hideTimeoutId)
        this.hideTimeoutId = setTimeout(() => {
          this.hideTimeoutId = 0
          removeClass(this.$refs.popup, SHOW_CLASS)
          // gives fade out time
          this.transitionTimeoutId = setTimeout(() => {
            this.transitionTimeoutId = 0
            removeFromDom(this.$refs.popup)
            this.$emit('update:modelValue', false)
            this.$emit('hide')
          }, this.transition)
        }, this.hideDelay)
      }
    },
    isShown() {
      return hasClass(this.$refs.popup, SHOW_CLASS)
    },
    windowClicked(event) {
      if (
        this.triggerEl &&
        isFunction(this.triggerEl.contains) &&
        !this.triggerEl.contains(event.target) &&
        this.trigger === TRIGGERS.OUTSIDE_CLICK &&
        !(this.$refs.popup && this.$refs.popup.contains(event.target)) &&
        this.isShown()
      ) {
        this.hide()
      }
    },
    handleAuto() {
      clearTimeout(this.autoTimeoutId)
      this.autoTimeoutId = setTimeout(() => {
        this.autoTimeoutId = 0
        if (this.triggerEl.matches(':hover, :focus')) {
          this.show()
        } else {
          this.hide()
        }
      }, 20) // 20ms make firefox happy
    },
  },
}
