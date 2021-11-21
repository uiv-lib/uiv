<template>
  <div role="alert" :class="alertClass">
    <button
      v-if="dismissible"
      type="button"
      class="close"
      aria-label="Close"
      @click="closeAlert"
    >
      <span aria-hidden="true">&times;</span>
    </button>
    <slot />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  dismissible: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: 'info',
  },
});

const emit = defineEmits(['dismissed']);

let timeout = 0;

const alertClass = computed(() => ({
  alert: true,
  [`alert-${props.type}`]: !!props.type,
  'alert-dismissible': props.dismissible,
}));

function closeAlert() {
  clearTimeout(timeout);
  emit('dismissed');
}

onMounted(() => {
  if (props.duration > 0) {
    timeout = setTimeout(closeAlert, props.duration);
  }
});

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>
