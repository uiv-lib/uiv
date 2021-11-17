import { t } from '../locale'

export default {
  methods: {
    t() {
      const args = []
      for (let i = 0; i < arguments.length; ++i) {
        args.push(arguments[i])
      }
      args[1] = { $$locale: this.locale, ...args[1] }
      return t.apply(this, args)
    },
  },
  props: {
    locale: Object,
  },
}
