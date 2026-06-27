<script>
import { h } from 'vue';
import { TRIGGERS } from '../../utils/dom.utils';
import popupMixin from '../../mixins/popup.mixin';
import { renderSlot } from '../../utils/vue.utils';

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
    return h(this.tag, [
      renderSlot(this.$slots.default),
      h(
        'div',
        {
          ref: 'popup',
          role: 'tooltip',
          onMouseleave: this.hideOnLeave,
        },
        [
          h('div', { class: 'tooltip-arrow' }),
          h('div', { class: 'tooltip-inner' }, this.text),
        ]
      ),
    ]);
  },
};
</script>
