<template>
  <div class="uiv">
    <DatePicker v-model="date" :week-starts-with="1" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { DatePicker } from 'uiv';

const date = ref(null);
</script>
