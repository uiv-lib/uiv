import {TRIGGERS} from '@src/utils/domUtils'
import popupMixin from '@src/mixins/popupMixin'

export default {
  mixins: [popupMixin],
  data () {
    return {
      name: 'tooltip'
    }
  },
  render (h) {
    /* eslint-disable no-unused-vars */
    const Tag = this.tag
    return (
      <Tag>
        {this.$slots.default}
        <div ref={'popup'} role={'tooltip'} onMouseEnter={this.showOnHover} onMouseLeave={this.hideOnLeave}>
          <div class={'tooltip-arrow'}/>
          <div class={'tooltip-inner'}>
            {this.text}
          </div>
        </div>
      </Tag>
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
