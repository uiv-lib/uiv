<template>
  <form
    :class="{
      'navbar-form': true,
      'navbar-left': left,
      'navbar-right': right,
    }"
  >
    <slot />
  </form>
</template>

<script setup>
defineProps({
  left: Boolean,
  right: Boolean,
});
</script>
