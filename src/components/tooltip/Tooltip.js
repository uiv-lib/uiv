import { TRIGGERS } from '../../utils/dom.utils'
import popupMixin from '../../mixins/popup.mixin'

export default {
  mixins: [popupMixin],
  data () {
    return {
      name: 'tooltip'
    }
  },
  render (h) {
    return h(
      this.tag,
      [
        this.$slots.default,
        h('div',
          {
            ref: 'popup',
            attrs: {
              role: 'tooltip'
            },
            on: {
              mouseleave: this.hideOnLeave
            }
          },
          [
            h('div', { class: 'tooltip-arrow' }),
            h('div', {
              class: 'tooltip-inner',
              domProps: { innerHTML: this.text }
            })
          ]
        )
      ]
    )
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: TRIGGERS.HOVER_FOCUS
    }
  },
  computed: {
    allContent () {
      return this.text
    }
  },
  methods: {
    isNotEmpty () {
      return this.text
    }
  }
}
