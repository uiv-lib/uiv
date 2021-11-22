<template>
  <div class="uiv">
    <date-picker v-model="date" :today-btn="false" :clear-btn="false" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const date = ref(null);
</script>
