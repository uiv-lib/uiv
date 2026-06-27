<script lang="jsx">
import { h } from 'vue';
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
    return h(this.tag, [
      renderSlot(this.$slots.default),
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
          this.title ? h('h3', { class: 'popover-title' }, this.title) : null,
          h('div', { class: 'popover-content' }, [
            this.content || renderSlot(this.$slots.popover),
          ]),
        ]
      ),
    ]);
  },
};
</script>
