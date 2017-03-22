<script>
  import utils from './../../utils/domUtils'

  export default {
    render (h) {
      return h(
        this.tag,
        [this.$slots.default]
      )
    },
    props: {
      tag: {
        type: String,
        'default': 'span'
      },
      text: {
        type: String,
        'default': ''
      },
      trigger: {
        type: String,
        'default': 'hover'
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
        tooltip: null
      }
    },
    mounted () {
      this.initListeners()
    },
    beforeDestroy () {
      this.clearListeners()
    },
    watch: {
      trigger () {
        this.clearListeners()
        this.initListeners()
      }
    },
    methods: {
      initListeners () {
        let el = this.$el.firstChild
        if (el) {
          if (this.trigger === 'hover') {
            el.addEventListener('mouseenter', this.show)
            el.addEventListener('mouseleave', this.hide)
          } else if (this.trigger === 'focus') {
            el.addEventListener('focus', this.show)
            el.addEventListener('blur', this.hide)
          } else {
            el.addEventListener('click', this.toggle)
          }
        }
      },
      clearListeners () {
        let el = this.$el.firstChild
        if (el) {
          el.removeEventListener('focus', this.show)
          el.removeEventListener('blur', this.hide)
          el.removeEventListener('mouseenter', this.show)
          el.removeEventListener('mouseleave', this.hide)
          el.removeEventListener('click', this.toggle)
        }
      },
      show () {
        let el = this.$el.firstChild
        if (!this.enable || !el) {
          return
        }
        let container = document.querySelector(this.appendTo)
        this.tooltip = document.createElement('div')
        this.tooltip.setAttribute('role', 'tooltip')
        this.tooltip.className = `tooltip fade ${this.placement}`
        this.tooltip.innerHTML = `<div class="tooltip-arrow"></div><div class="tooltip-inner">${this.text}</div>`
        container.appendChild(this.tooltip)
        utils.setTooltipPosition(this.tooltip, el, this.placement, this.appendTo)
        this.tooltip.offsetHeight
        this.tooltip.className += ' in'
      },
      hide () {
        let self = this
        if (self.tooltip) {
          ((tooltip) => {
            tooltip.className = `tooltip fade ${self.placement}`
            setTimeout(() => {
              try {
                tooltip.parentNode.removeChild(tooltip)
              } catch (e) {
                // Silent
              }
            }, self.transitionDuration)
          })(self.tooltip)
        }
      },
      toggle () {
        if (this.tooltip && this.tooltip.className.indexOf('in') >= 0) {
          this.hide()
        } else {
          this.show()
        }
      }
    }
  }
</script>
