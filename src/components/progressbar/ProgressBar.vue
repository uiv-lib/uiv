<template>
  <div class="progress">
    <slot>
      <progress-bar-stack
        :min="min"
        :max="max"
        v-model="value"
        :label="label"
        :label-text="labelText"
        :min-width="minWidth"
        :type="type"
        :striped="striped"
        :active="active"></progress-bar-stack>
    </slot>
  </div>
</template>

<script>
  import ProgressBarStack from './ProgressBarStack.vue'
  export default {
    components: {ProgressBarStack},
    props: {
      min: Number,
      max: Number,
      value: Number,
      label: Boolean,
      labelText: String,
      minWidth: Boolean,
      type: String,
      striped: Boolean,
      active: Boolean
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
