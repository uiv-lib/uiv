<template>
  <ProgressBar>
    <ProgressBarStack v-model="progress35" type="success" />
    <ProgressBarStack v-model="progress20" type="warning" striped />
    <ProgressBarStack v-model="progress10" type="danger" />
  </ProgressBar>
</template>

<script setup>
import { ProgressBar, ProgressBarStack } from 'uiv';
import { ref } from 'vue';

const progress20 = ref(20);
const progress35 = ref(35);
const progress10 = ref(10);
</script>
