<template>
  <div
    :class="{
      'progress-bar': true,
      'progress-bar-striped': striped,
      active: striped && active,
      [`progress-bar-${type}`]: Boolean(type),
    }"
    :style="{
      minWidth: minWidth ? '2em' : null,
      width: `${modelValue}%`,
    }"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuenow="modelValue"
    aria-valuemax="100"
  >
    {{ label ? (labelText ? labelText : `${modelValue}%`) : null }}
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0 && value <= 100
      },
    },
    labelText: { type: String, default: undefined },
    type: { type: String, default: undefined },
    label: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
