export default {
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data () {
    return {
      timeout: 0
    }
  },
  computed: {
    alertClass () {
      return {
        alert: true,
        [`alert-${this.type}`]: Boolean(this.type),
        'alert-dismissible': this.dismissible
      }
    }
  },
  methods: {
    closeAlert () {
      clearTimeout(this.timeout)
      this.$emit('dismissed')
    }
  },
  mounted () {
    if (this.duration > 0) {
      this.timeout = setTimeout(this.closeAlert, this.duration)
    }
  },
  destroyed () {
    clearTimeout(this.timeout)
  }
}
