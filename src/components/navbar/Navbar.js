import Collapse from '../collapse/Collapse.js'

export default {
  components: { Collapse },
  props: {
    value: Boolean,
    fluid: {
      type: Boolean,
      default: true
    },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    navClasses () {
      return {
        navbar: true,
        'navbar-default': !this.inverse,
        'navbar-inverse': this.inverse,
        'navbar-static-top': this.staticTop,
        'navbar-fixed-bottom': this.fixedBottom,
        'navbar-fixed-top': this.fixedTop
      }
    }
  },
  mounted () {
    this.show = !!this.value
  },
  watch: {
    value (v) {
      this.show = v
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
      this.$emit('input', this.show)
    }
  }
}
