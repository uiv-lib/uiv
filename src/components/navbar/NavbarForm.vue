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

<script>
export default {
  props: {
    left: Boolean,
    right: Boolean,
  },
};
</script>
