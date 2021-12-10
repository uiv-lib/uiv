<template>
  <div
    :class="{
      'progress-bar': true,
      'progress-bar-striped': striped,
      active: striped && active,
      [`progress-bar-${type}`]: !!type,
    }"
    :style="{
      minWidth: minWidth ? '2em' : null,
      width: `${modelValue}%`,
    }"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuenow="modelValue"
    aria-valuemax="100"
  >
    {{ label ? (labelText ? labelText : `${modelValue}%`) : null }}
  </div>
</template>

<script setup>
import { progressBarProps } from '../../props/progress-bar.props';

defineProps({
  ...progressBarProps,
});
</script>
