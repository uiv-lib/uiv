<script lang="jsx">
import { TRIGGERS } from '../../utils/dom.utils';
import popupMixin from '../../mixins/popup.mixin';
import { renderSlot } from '../../utils/vue.utils';

export default {
  mixins: [popupMixin],
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
  data() {
    return {
      name: 'popover',
    };
  },
  computed: {
    allContent() {
      return this.title + this.content;
    },
  },
  // beforeUnmount() {
  //   console.log('unmount')
  // },
  methods: {
    isNotEmpty() {
      return this.title || this.content || this.$slots.popover;
    },
  },
  render() {
    const Tag = this.tag;
    return (
      <Tag>
        {renderSlot(this.$slots.default)}
        <div
          style={{
            display: 'block',
          }}
          ref="popup"
          onMouseleave={this.hideOnLeave}
        >
          <div class="arrow" />
          {this.title ? <h3 class="popover-title">{this.title}</h3> : null}
          <div className="popover-content">
            {this.content || renderSlot(this.$slots.popover)}
          </div>
        </div>
      </Tag>
    );
  },
};
</script>
