<template>
  <a :href="to">
    <slot />
  </a>
</template>

<script>
export default {
  props: ['to'],
}
</script>
