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

<script>
export default {
  props: {
    size: String,
    vertical: {
      type: Boolean,
      default: false,
    },
    justified: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
