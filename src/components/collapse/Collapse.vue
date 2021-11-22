<script>
import { addClass, removeClass } from '../../utils/dom.utils';
import { onMounted, ref, watchEffect, defineComponent, h } from 'vue';

export default defineComponent({
  props: {
    tag: { type: String, default: 'div' },
    modelValue: { type: Boolean, default: false },
    transition: { type: Number, default: 350 },
  },
  emits: ['show', 'shown', 'hide', 'hidden'],
  setup(props, { emit, slots }) {
    const COLLAPSE = 'collapse';
    const IN = 'in';
    const COLLAPSING = 'collapsing';
    let timeoutId = 0;
    const element = ref(null);

    function toggle(show) {
      clearTimeout(timeoutId);
      const el = element.value;
      if (!el) {
        return;
      }
      if (show) {
        emit('show');
        removeClass(el, COLLAPSE);
        el.style.height = 'auto';
        const height = window.getComputedStyle(el).height;
        el.style.height = null;
        addClass(el, COLLAPSING);
        el.offsetHeight; // force repaint
        el.style.height = height;
        timeoutId = setTimeout(() => {
          removeClass(el, COLLAPSING);
          addClass(el, COLLAPSE);
          addClass(el, IN);
          el.style.height = null;
          timeoutId = 0;
          emit('shown');
        }, props.transition);
      } else {
        emit('hide');
        el.style.height = window.getComputedStyle(el).height;
        removeClass(el, IN);
        removeClass(el, COLLAPSE);
        el.offsetHeight;
        el.style.height = null;
        addClass(el, COLLAPSING);
        timeoutId = setTimeout(() => {
          addClass(el, COLLAPSE);
          removeClass(el, COLLAPSING);
          el.style.height = null;
          timeoutId = 0;
          emit('hidden');
        }, props.transition);
      }
    }

    watchEffect(() => {
      toggle(props.modelValue);
    });

    onMounted(() => {
      addClass(element.value, COLLAPSE);
      if (props.modelValue) {
        addClass(element.value, IN);
      }
    });

    return () => h(props.tag, { ref: element }, slots.default?.());
  },
});
</script>
