<template>
  <ul
    :class="{
      nav: true,
      'navbar-nav': true,
      'navbar-left': left,
      'navbar-right': right,
    }"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  props: {
    left: Boolean,
    right: Boolean,
  },
};
</script>
