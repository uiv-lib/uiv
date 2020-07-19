import { t } from '../locale'
import { assign } from '../utils/objectUtils'

export default {
  methods: {
    t () {
      const args = assign({}, arguments)
      args[1] = assign({ $$locale: this.locale }, args[1])
      return t.apply(this, args)
    }
  },
  props: {
    locale: Object
  }
}
