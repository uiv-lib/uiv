<script>
  import utils from './../../utils/domUtils'

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
              h('h3', {'class': 'popover-title'}, this.title),
              h('div', {'class': 'popover-content'}, [this.$slots.popover])
            ]
          )
        ]
      )
    },
    props: {
      tag: {
        type: String,
        'default': 'span'
      },
      title: {
        type: String,
        'default': ''
      },
      trigger: {
        type: String,
        'default': utils.triggers.OUTSIDE_CLICK
      },
      placement: {
        type: String,
        'default': utils.placements.TOP
      },
      autoPlacement: {
        type: Boolean,
        'default': true
      },
      appendTo: {
        type: String,
        'default': 'body'
      },
      transitionDuration: {
        type: Number,
        'default': 150
      },
      enable: {
        type: Boolean,
        'default': true
      }
    },
    data () {
      return {
        triggerEl: null,
        timeoutId: 0
      }
    },
    mounted () {
      utils.ensureElementMatchesFunction()
      this.triggerEl = this.$el.querySelector('[data-role="trigger"]')
      this.initListeners()
      utils.removeFromDom(this.$refs.popover)
    },
    beforeDestroy () {
      this.clearListeners()
      utils.removeFromDom(this.$refs.popover)
    },
    watch: {
      trigger () {
        this.clearListeners()
        this.initListeners()
      }
    },
    methods: {
      initListeners () {
        if (this.triggerEl) {
          if (this.trigger === utils.triggers.HOVER) {
            utils.on(this.triggerEl, utils.events.MOUSE_ENTER, this.show)
            utils.on(this.triggerEl, utils.events.MOUSE_LEAVE, this.hide)
          } else if (this.trigger === utils.triggers.FOCUS) {
            utils.on(this.triggerEl, utils.events.FOCUS, this.show)
            utils.on(this.triggerEl, utils.events.BLUR, this.hide)
          } else if (this.trigger === utils.triggers.HOVER_FOCUS) {
            utils.on(this.triggerEl, utils.events.MOUSE_ENTER, this.handleAuto)
            utils.on(this.triggerEl, utils.events.MOUSE_LEAVE, this.handleAuto)
            utils.on(this.triggerEl, utils.events.FOCUS, this.handleAuto)
            utils.on(this.triggerEl, utils.events.BLUR, this.handleAuto)
          } else if (this.trigger === utils.triggers.CLICK || this.trigger === utils.triggers.OUTSIDE_CLICK) {
            utils.on(this.triggerEl, utils.events.CLICK, this.toggle)
          } else {
            throw new TypeError(this.trigger + ' trigger is not supported.')
          }
        }
        utils.on(window, utils.events.CLICK, this.windowClicked)
      },
      clearListeners () {
        if (this.triggerEl) {
          utils.off(this.triggerEl, utils.events.FOCUS, this.show)
          utils.off(this.triggerEl, utils.events.BLUR, this.hide)
          utils.off(this.triggerEl, utils.events.MOUSE_ENTER, this.show)
          utils.off(this.triggerEl, utils.events.MOUSE_LEAVE, this.hide)
          utils.off(this.triggerEl, utils.events.CLICK, this.toggle)
          utils.off(this.triggerEl, utils.events.MOUSE_ENTER, this.handleAuto)
          utils.off(this.triggerEl, utils.events.MOUSE_LEAVE, this.handleAuto)
          utils.off(this.triggerEl, utils.events.FOCUS, this.handleAuto)
          utils.off(this.triggerEl, utils.events.BLUR, this.handleAuto)
        }
        utils.off(window, utils.events.CLICK, this.windowClicked)
      },
      show () {
        let popover = this.$refs.popover
        if (!this.enable || !this.triggerEl || utils.hasClass(popover, SHOW_CLASS)) {
          return
        }
        if (this.timeoutId > 0) {
          clearTimeout(this.timeoutId)
          this.timeoutId = 0
        } else {
          popover.className = `${BASE_CLASS} ${this.placement}`
          let container = document.querySelector(this.appendTo)
          container.appendChild(popover)
          utils.setTooltipPosition(popover, this.triggerEl, this.placement, this.autoPlacement, this.appendTo)
          popover.offsetHeight
        }
        utils.addClass(popover, SHOW_CLASS)
        this.$emit('popover-show')
      },
      hide () {
        clearTimeout(this.timeoutId)
        utils.removeClass(this.$refs.popover, SHOW_CLASS)
        this.timeoutId = setTimeout(() => {
          utils.removeFromDom(this.$refs.popover)
          this.timeoutId = 0
          this.$emit('popover-hide')
        }, this.transitionDuration)
      },
      toggle () {
        if (this.isShown()) {
          this.hide()
        } else {
          this.show()
        }
      },
      isShown () {
        return utils.hasClass(this.$refs.popover, SHOW_CLASS)
      },
      showOnHover () {
        if (this.trigger === utils.triggers.HOVER || this.trigger === utils.triggers.HOVER_FOCUS) {
          this.show()
        }
      },
      hideOnLeave () {
        if (this.trigger === utils.triggers.HOVER || (this.trigger === utils.triggers.HOVER_FOCUS && !this.triggerEl.matches(':focus'))) {
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
          this.trigger === utils.triggers.OUTSIDE_CLICK && !this.$refs.popover.contains(event.target) &&
          this.isShown()) {
          this.hide()
        }
      }
    }
  }
</script>
