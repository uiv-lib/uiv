<template>
  <div class="uiv">
    <DatePicker v-model="date" :today-btn="false" :clear-btn="false" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { DatePicker } from 'uiv';

const date = ref(null);
</script>
