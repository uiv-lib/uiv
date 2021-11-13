import { t } from '../locale'
import { assign } from '../utils/object.utils'

export default {
  methods: {
    t() {
      const args = []
      for (let i = 0; i < arguments.length; ++i) {
        args.push(arguments[i])
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1])
      return t.apply(this, args)
    },
  },
  props: {
    locale: Object,
  },
}
