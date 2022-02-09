<template>
  <TimePicker v-model="time" readonly />
</template>

<script setup>
import { TimePicker } from 'uiv';
import { ref } from 'vue';

const time = ref(new Date());
</script>
