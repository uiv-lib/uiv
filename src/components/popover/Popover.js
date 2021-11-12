import { TRIGGERS } from '../../utils/dom.utils'
import popupMixin from '../../mixins/popup.mixin'
import { h } from 'vue'

export default {
  mixins: [popupMixin],
  data() {
    return {
      name: 'popover',
    }
  },
  render() {
    return h(this.tag, [
      this.$slots.default && this.$slots.default(),
      h(
        'div',
        {
          style: {
            display: 'block',
          },
          ref: 'popup',
          onMouseleave: this.hideOnLeave,
        },
        [
          h('div', { class: 'arrow' }),
          this.title
            ? h(
                'h3',
                {
                  class: 'popover-title',
                  directives: [{ name: 'show', value: this.title }],
                },
                this.title
              )
            : null,
          h('div', { class: 'popover-content' }, [
            this.content || (this.$slots.popover && this.$slots.popover()),
          ]),
        ]
      ),
    ])
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    trigger: {
      type: String,
      default: TRIGGERS.OUTSIDE_CLICK,
    },
  },
  computed: {
    allContent() {
      return this.title + this.content
    },
  },
  methods: {
    isNotEmpty() {
      return this.title || this.content || this.$slots.popover
    },
  },
}
