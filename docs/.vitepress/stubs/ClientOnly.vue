<template>
  <slot v-if="show" />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>
