import { TRIGGERS } from '../../utils/dom.utils'
import popupMixin from '../../mixins/popup.mixin'
import { h } from 'vue'

export default {
  mixins: [popupMixin],
  data() {
    return {
      name: 'tooltip',
    }
  },
  render() {
    return h(this.tag, [
      this.$slots.default && this.$slots.default(),
      h(
        'div',
        {
          ref: 'popup',
          role: 'tooltip',
          onMouseleave: this.hideOnLeave,
        },
        [
          h('div', { class: 'tooltip-arrow' }),
          h(
            'div',
            {
              class: 'tooltip-inner',
            },
            this.text
          ),
        ]
      ),
    ])
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    trigger: {
      type: String,
      default: TRIGGERS.HOVER_FOCUS,
    },
  },
  computed: {
    allContent() {
      return this.text
    },
  },
  methods: {
    isNotEmpty() {
      return this.text
    },
  },
}
