<script lang="jsx">
import { TRIGGERS } from '../../utils/dom.utils';
import popupMixin from '../../mixins/popup.mixin';

export default {
  mixins: [popupMixin],
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
  data() {
    return {
      name: 'tooltip',
    };
  },
  computed: {
    allContent() {
      return this.text;
    },
  },
  // beforeUnmount() {
  //   console.log('unmount')
  // },
  methods: {
    isNotEmpty() {
      return this.text;
    },
  },
  render() {
    const Tag = this.tag;
    return (
      <Tag>
        {this.$slots.default?.()}
        <div ref="popup" role="tooltip" onMouseleave={this.hideOnLeave}>
          <div class="tooltip-arrow" />
          <div class="tooltip-inner">{this.text}</div>
        </div>
      </Tag>
    );
  },
};
</script>
