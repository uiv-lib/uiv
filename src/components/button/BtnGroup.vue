<template>
  <div
    :class="{
      'btn-group': !vertical,
      'btn-group-vertical': vertical,
      'btn-group-justified': justified,
      [`btn-group-${size}`]: size,
    }"
    role="group"
    data-toggle="buttons"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  size: { type: String, default: undefined },
  vertical: { type: Boolean, default: false },
  justified: { type: Boolean, default: false },
});
</script>
