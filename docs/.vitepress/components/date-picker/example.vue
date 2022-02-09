<template>
  <DatePicker v-model="date" />
  <br />
  <Alert v-show="date" type="info">
    You selected
    <b>{{ date }}.</b>
  </Alert>
</template>
<script setup>
import { ref } from 'vue';
import { DatePicker, Alert } from 'uiv';

const date = ref(null);
</script>
