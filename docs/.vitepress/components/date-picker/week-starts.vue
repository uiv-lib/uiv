<template>
  <div class="uiv">
    <date-picker v-model="date" :week-starts-with="1" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const date = ref(null);
</script>
