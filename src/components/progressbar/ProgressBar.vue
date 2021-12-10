<template>
  <div class="progress">
    <slot v-if="$slots.default" />
    <ProgressBarStack v-else v-bind="$props" />
  </div>
</template>

<script setup>
import { progressBarProps } from '../../props/progress-bar.props';

defineProps({
  ...progressBarProps,
});
</script>
