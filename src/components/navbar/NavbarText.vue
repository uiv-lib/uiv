<template>
  <p
    :class="{
      'navbar-text': true,
      'navbar-left': left,
      'navbar-right': right,
    }"
  >
    <slot />
  </p>
</template>

<script setup>
defineProps({
  left: Boolean,
  right: Boolean,
});
</script>
