<script>
  import utils from './../../utils/domUtils'

  export default {
    render (h) {
      return h(this.tag,
        [
          this.$slots.default,
          h('div',
            {
              style: {
                display: 'none'
              },
              ref: 'popover'
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
        'default': 'click'
      },
      placement: {
        type: String,
        'default': 'top'
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
        triggerEl: null
      }
    },
    mounted () {
      this.triggerEl = this.$el.querySelector('[data-role="trigger"]')
      this.initListeners()
      let popover = this.$refs.popover
      popover.parentNode.removeChild(popover)
    },
    beforeDestroy () {
      this.clearListeners()
      let popover = this.$refs.popover
      popover.parentNode.removeChild(popover)
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
          if (this.trigger === 'hover') {
            this.triggerEl.addEventListener('mouseenter', this.show)
            this.triggerEl.addEventListener('mouseleave', this.hide)
          } else if (this.trigger === 'focus') {
            this.triggerEl.addEventListener('focus', this.show)
            this.triggerEl.addEventListener('blur', this.hide)
          } else {
            this.triggerEl.addEventListener('click', this.toggle)
          }
        }
      },
      clearListeners () {
        if (this.triggerEl) {
          this.triggerEl.removeEventListener('focus', this.show)
          this.triggerEl.removeEventListener('blur', this.hide)
          this.triggerEl.removeEventListener('mouseenter', this.show)
          this.triggerEl.removeEventListener('mouseleave', this.hide)
          this.triggerEl.removeEventListener('click', this.toggle)
        }
      },
      show () {
        if (!this.enable || !this.triggerEl) {
          return
        }
        let popover = this.$refs.popover
        let container = document.querySelector(this.appendTo)
        popover.className = `popover fade ${this.placement}`
        container.appendChild(popover)
        popover.style.display = 'block'
        utils.setTooltipPosition(popover, this.triggerEl, this.placement, this.appendTo)
        popover.offsetHeight
        popover.className += ' in'
      },
      hide () {
        let popover = this.$refs.popover
        popover.className = `popover fade ${this.placement}`
        setTimeout(() => {
          try {
            popover.parentNode.removeChild(popover)
          } catch (e) {
            // Silent
          }
        }, this.transitionDuration)
      },
      toggle () {
        let popover = this.$refs.popover
        if (popover && popover.className.indexOf('in') >= 0) {
          this.hide()
        } else {
          this.show()
        }
      }
    }
  }
</script>
