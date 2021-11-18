<template>
  <div class="tab-pane" :class="{ fade: transition > 0 }" role="tabpanel">
    <slot></slot>
    <teleport v-if="isMounted && $slots.title" :to="'#' + uid.toString()">
      <slot name="title" />
    </teleport>
  </div>
</template>

<script>
import { spliceIfExist } from '../../utils/array.utils';
import { addClass, removeClass } from '../../utils/dom.utils';

const ACTIVE_CLASS = 'active';
const IN_CLASS = 'in';

let id = 0;

export default {
  props: {
    title: {
      type: String,
      default: 'Tab Title',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabClasses: {
      type: Object,
      default: () => {
        return {};
      },
    },
    group: { type: String, default: undefined },
    pullRight: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: null,
      transition: 150,
      uid: `tab_${++id}`,
      isMounted: false,
    };
  },
  watch: {
    active(active) {
      if (active) {
        setTimeout(() => {
          addClass(this.$el, ACTIVE_CLASS);
          this.$el.offsetHeight;
          addClass(this.$el, IN_CLASS);
          try {
            this.$parent.$emit('changed', this.$parent.activeIndex);
          } catch (e) {
            throw new Error('<tab> parent must be <tabs>.');
          }
        }, this.transition);
      } else {
        removeClass(this.$el, IN_CLASS);
        setTimeout(() => {
          removeClass(this.$el, ACTIVE_CLASS);
        }, this.transition);
      }
    },
  },
  created() {
    try {
      this.$parent.tabs.push(this);
    } catch (e) {
      throw new Error('<tab> parent must be <tabs>.');
    }
  },
  mounted() {
    this.isMounted = true;
  },
  beforeUnmount() {
    const tabs = this.$parent && this.$parent.tabs;
    spliceIfExist(tabs, this);
  },
  methods: {
    show() {
      this.$nextTick(() => {
        addClass(this.$el, ACTIVE_CLASS);
        addClass(this.$el, IN_CLASS);
      });
    },
  },
};
</script>
