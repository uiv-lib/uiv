import { t } from '../locale'
import { assign } from '../utils/objectUtils'

export default {
  methods: {
    t () {
      let args = []
      for (let i = 0; i < arguments.length; ++i) {
        args.push(arguments[i])
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1])
      return t.apply(this, args)
    }
  },
  props: {
    locale: Object
  }
}
