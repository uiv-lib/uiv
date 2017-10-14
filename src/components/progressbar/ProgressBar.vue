<template>
  <div class="progress">
    <slot>
      <progress-bar-stack
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
      value: {
        type: Number
      },
      label: {
        type: Boolean,
        'default': false
      },
      labelText: {
        type: String
      },
      minWidth: {
        type: Boolean,
        'default': false
      },
      type: {
        type: String
      },
      striped: {
        type: Boolean,
        'default': false
      },
      active: {
        type: Boolean,
        'default': false
      }
    }
  }
</script>
