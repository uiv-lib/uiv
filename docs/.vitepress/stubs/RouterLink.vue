<template>
  <a :href="to">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    to: { type: String, default: '/' },
  },
};
</script>
