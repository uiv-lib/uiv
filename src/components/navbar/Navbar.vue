<template>
  <nav :class="navClasses">
    <div :class="fluid ? 'container-fluid' : 'container'">
      <div class="navbar-header">
        <slot name="collapse-btn">
          <button type="button" class="navbar-toggle collapsed" @click="toggle">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </slot>
        <slot name="brand" />
      </div>
      <slot />
      <collapse v-model="show" class="navbar-collapse">
        <slot name="collapse" />
      </collapse>
    </div>
  </nav>
</template>

<script>
import Collapse from '../collapse/Collapse.vue';

export default {
  components: { Collapse },
  props: {
    modelValue: Boolean,
    fluid: {
      type: Boolean,
      default: true,
    },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean,
  },
  emits: ['update:modalValue'],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    navClasses() {
      return {
        navbar: true,
        'navbar-default': !this.inverse,
        'navbar-inverse': this.inverse,
        'navbar-static-top': this.staticTop,
        'navbar-fixed-bottom': this.fixedBottom,
        'navbar-fixed-top': this.fixedTop,
      };
    },
  },
  watch: {
    modelValue(v) {
      this.show = v;
    },
  },
  mounted() {
    this.show = !!this.modelValue;
  },
  methods: {
    toggle() {
      this.show = !this.show;
      this.$emit('update:modalValue', this.show);
    },
  },
};
</script>
