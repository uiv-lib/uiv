<script>
  import utils from './../../utils/domUtils'

  const COLLAPSE = 'collapse'
  const IN = 'in'
  const COLLAPSING = 'collapsing'

  export default {
    render (h) {
      return h(this.tag, {}, this.$slots.default)
    },
    props: {
      tag: {
        type: String,
        'default': 'div'
      },
      value: {
        type: Boolean,
        'default': false
      },
      transitionDuration: {
        type: Number,
        'default': 350
      }
    },
    data () {
      return {
        timeoutId: 0
      }
    },
    watch: {
      value (show) {
        this.toggle(show)
      }
    },
    mounted () {
      let el = this.$el
      utils.addClass(el, COLLAPSE)
      if (this.value) {
        utils.addClass(el, IN)
      }
    },
    methods: {
      toggle (show) {
        clearTimeout(this.timeoutId)
        let el = this.$el
        if (show) {
          utils.removeClass(el, COLLAPSE)
          el.style.height = 'auto'
          let height = window.getComputedStyle(el).height
          el.style.height = null
          utils.addClass(el, COLLAPSING)
          el.offsetHeight // force repaint
          el.style.height = height
          this.timeoutId = setTimeout(() => {
            utils.removeClass(el, COLLAPSING)
            utils.addClass(el, COLLAPSE)
            utils.addClass(el, IN)
            el.style.height = null
            this.timeoutId = 0
          }, this.transitionDuration)
        } else {
          el.style.height = window.getComputedStyle(el).height
          utils.removeClass(el, IN)
          utils.removeClass(el, COLLAPSE)
          el.offsetHeight
          el.style.height = null
          utils.addClass(el, COLLAPSING)
          this.timeoutId = setTimeout(() => {
            utils.addClass(el, COLLAPSE)
            utils.removeClass(el, COLLAPSING)
            el.style.height = null
            this.timeoutId = 0
          }, this.transitionDuration)
        }
      }
    }
  }
</script>
