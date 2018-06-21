import {t} from '../locale'

export default {
  methods: {
    t (...args) {
      args[1] = Object.assign({ $$locale: this.locale }, args[1])
      return t.apply(this, args)
    }
  },
  props: {
    locale: Object
  }
}
