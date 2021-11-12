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

<script>
export default {
  props: {
    left: Boolean,
    right: Boolean,
  },
}
</script>
