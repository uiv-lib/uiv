<template>
  <div :class="computedClass"
       role="progressbar"
       :aria-valuemin="min"
       :aria-valuenow="value"
       :aria-valuemax="max"
       :style="computedStyle">
    <template v-if="label">
      <template v-if="labelText">{{labelText}}</template>
      <template v-else>{{finished}}%</template>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      min: {
        type: Number,
        'default': 0
      },
      max: {
        type: Number,
        'default': 100
      },
      value: {
        type: Number,
        'default': 0
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
    },
    computed: {
      finished () {
        return (this.value - this.min) / (this.max - this.min) * 100
      },
      computedClass () {
        return {
          'progress-bar': true,
          'progress-bar-striped': this.striped,
          'active': this.striped && this.active,
          [`progress-bar-${this.type}`]: !!this.type
        }
      },
      computedStyle () {
        return {
          minWidth: this.minWidth ? '2em' : null,
          width: `${this.finished}%`
        }
      }
    }
  }
</script>
