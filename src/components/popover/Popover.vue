<script>
  import {
    PLACEMENTS,
    TRIGGERS,
    EVENTS,
    on,
    off,
    ensureElementMatchesFunction,
    removeFromDom,
    removeClass,
    addClass,
    hasClass,
    isElement,
    setTooltipPosition
  } from '@src/utils/domUtils'

  const SHOW_CLASS = 'in'
  const BASE_CLASS = 'popover fade'

  export default {
    render (h) {
      return h(this.tag,
        [
          this.$slots.default,
          h('div',
            {
              style: {
                display: 'block'
              },
              ref: 'popover',
              on: {
                mouseenter: this.showOnHover,
                mouseleave: this.hideOnLeave
              }
            },
            [
              h('div', {'class': 'arrow'}),
              h('h3', {
                'class': 'popover-title',
                directives: [
                  {name: 'show', value: this.title}
                ]
              }, this.title),
              h('div', {'class': 'popover-content'}, [this.content || this.$slots.popover])
            ]
          )
        ]
      )
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      tag: {
        type: String,
        default: 'span'
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      trigger: {
        type: String,
        default: TRIGGERS.OUTSIDE_CLICK
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
      target: {}
    },
    data () {
      return {
        triggerEl: null,
        timeoutId: 0
      }
    },
    mounted () {
      ensureElementMatchesFunction()
      removeFromDom(this.$refs.popover)
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
      removeFromDom(this.$refs.popover)
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
    methods: {
      initTriggerElByTarget (target) {
        if (target) {
          // target exist
          if (typeof target === 'string') { // is selector
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
            this.triggerEl = firstChild === this.$refs.popover ? null : firstChild
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
      show () {
        if (this.enable && this.triggerEl && (this.title || this.content || this.$slots.popover) && !this.isShown()) {
          let popover = this.$refs.popover
          if (this.timeoutId > 0) {
            clearTimeout(this.timeoutId)
            this.timeoutId = 0
          } else {
            popover.className = `${BASE_CLASS} ${this.placement}`
            let container = document.querySelector(this.appendTo)
            container.appendChild(popover)
            setTooltipPosition(popover, this.triggerEl, this.placement, this.autoPlacement, this.appendTo)
            popover.offsetHeight
          }
          addClass(popover, SHOW_CLASS)
          this.$emit('input', true)
          this.$emit('show')
        }
      },
      hide () {
        if (this.isShown()) {
          clearTimeout(this.timeoutId)
          removeClass(this.$refs.popover, SHOW_CLASS)
          this.timeoutId = setTimeout(() => {
            removeFromDom(this.$refs.popover)
            this.timeoutId = 0
            this.$emit('input', false)
            this.$emit('hide')
          }, this.transitionDuration)
        }
      },
      toggle () {
        if (this.isShown()) {
          this.hide()
        } else {
          this.show()
        }
      },
      isShown () {
        return hasClass(this.$refs.popover, SHOW_CLASS)
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
      handleAuto () {
        setTimeout(() => {
          if (this.triggerEl.matches(':hover, :focus')) {
            this.show()
          } else {
            this.hide()
          }
        }, 20) // 20ms make firefox happy
      },
      windowClicked (event) {
        if (this.triggerEl && !this.triggerEl.contains(event.target) &&
          this.trigger === TRIGGERS.OUTSIDE_CLICK && !this.$refs.popover.contains(event.target) &&
          this.isShown()) {
          this.hide()
        }
      }
    }
  }
</script>
