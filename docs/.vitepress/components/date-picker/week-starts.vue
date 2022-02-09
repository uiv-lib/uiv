<template>
  <DatePicker v-model="date" :week-starts-with="1" />
</template>
<script setup>
import { ref } from 'vue';
import { DatePicker } from 'uiv';

const date = ref(null);
</script>
