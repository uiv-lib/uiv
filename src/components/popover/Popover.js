import {TRIGGERS} from '@src/utils/domUtils'
import popupMixin from '@src/mixins/popupMixin'

export default {
  mixins: [popupMixin],
  data () {
    return {
      name: 'popover'
    }
  },
  render (h) {
    /* eslint-disable no-unused-vars */
    const Tag = this.tag
    return (
      <Tag>
        {this.$slots.default}
        <div ref={'popup'} style={{display: 'block'}} onMouseEnter={this.showOnHover} onMouseLeave={this.hideOnLeave}>
          <div class={'arrow'}/>
          <h3 class={'popover-title'} v-show={this.title}>
            {this.title}
          </h3>
          <div class={'popover-content'}>
            {this.content || this.$slots.popover}
          </div>
        </div>
      </Tag>
    )
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: TRIGGERS.OUTSIDE_CLICK
    }
  },
  computed: {
    allContent () {
      return this.title + this.content
    }
  },
  methods: {
    isNotEmpty () {
      return this.title || this.content || this.$slots.popover
    }
  }
}
