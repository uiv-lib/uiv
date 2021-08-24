import { addClass, removeClass } from '../../utils/dom.utils'

const COLLAPSE = 'collapse'
const IN = 'in'
const COLLAPSING = 'collapsing'

export default {
  render(h) {
    return h(this.tag, {}, this.$slots.default)
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    value: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: Number,
      default: 350,
    },
  },
  data() {
    return {
      timeoutId: 0,
    }
  },
  watch: {
    value(show) {
      this.toggle(show)
    },
  },
  mounted() {
    const el = this.$el
    addClass(el, COLLAPSE)
    if (this.value) {
      addClass(el, IN)
    }
  },
  methods: {
    toggle(show) {
      clearTimeout(this.timeoutId)
      const el = this.$el
      if (show) {
        this.$emit('show')
        removeClass(el, COLLAPSE)
        el.style.height = 'auto'
        const height = window.getComputedStyle(el).height
        el.style.height = null
        addClass(el, COLLAPSING)
        el.offsetHeight // force repaint
        el.style.height = height
        this.timeoutId = setTimeout(() => {
          removeClass(el, COLLAPSING)
          addClass(el, COLLAPSE)
          addClass(el, IN)
          el.style.height = null
          this.timeoutId = 0
          this.$emit('shown')
        }, this.transition)
      } else {
        this.$emit('hide')
        el.style.height = window.getComputedStyle(el).height
        removeClass(el, IN)
        removeClass(el, COLLAPSE)
        el.offsetHeight
        el.style.height = null
        addClass(el, COLLAPSING)
        this.timeoutId = setTimeout(() => {
          addClass(el, COLLAPSE)
          removeClass(el, COLLAPSING)
          el.style.height = null
          this.timeoutId = 0
          this.$emit('hidden')
        }, this.transition)
      }
    },
  },
}
