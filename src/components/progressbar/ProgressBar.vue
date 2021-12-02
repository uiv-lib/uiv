<template>
  <div class="progress">
    <slot v-if="$slots.default" />
    <ProgressBarStack v-else v-bind="$props" />
  </div>
</template>

<script setup>
import ProgressBarStack from './ProgressBarStack.vue';

defineProps({
  modelValue: {
    type: Number,
    validator(value) {
      return value >= 0 && value <= 100;
    },
    default: 0,
  },
  labelText: { type: String, default: undefined },
  type: { type: String, default: undefined },
  label: {
    type: Boolean,
    default: false,
  },
  minWidth: {
    type: Boolean,
    default: false,
  },
  striped: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
