<template>
  <div :class="computedClass"
       role="progressbar"
       aria-valuemin="0"
       :aria-valuenow="value"
       aria-valuemax="100"
       :style="computedStyle">
    <template v-if="label">
      <template v-if="labelText">{{labelText}}</template>
      <template v-else>{{value}}%</template>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        required: true,
        validator (value) {
          return value >= 0 && value <= 100
        }
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
          width: `${this.value}%`
        }
      }
    }
  }
</script>
