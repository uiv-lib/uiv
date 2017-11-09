<template>
  <div :class="classes" role="group" data-toggle="buttons">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: String
      },
      vertical: {
        type: Boolean,
        default: false
      },
      justified: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return {
          'btn-group': !this.vertical,
          'btn-group-vertical': this.vertical,
          'btn-group-justified': this.justified,
          [`btn-group-${this.size}`]: this.size
        }
      }
    }
  }
</script>
