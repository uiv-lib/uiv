<template>
  <TimePicker v-model="time" :show-meridian="false" />
</template>

<script setup>
import { TimePicker } from 'uiv';
import { ref } from 'vue';

const time = ref(new Date());
</script>
