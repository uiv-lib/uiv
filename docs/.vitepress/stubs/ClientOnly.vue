<template>
  <div v-if="show" class="uiv">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>
