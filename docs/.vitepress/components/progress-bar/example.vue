<template>
  <ProgressBar v-model="progress" />
</template>

<script setup>
import { ProgressBar } from 'uiv';
import { ref } from 'vue';

const progress = ref(66);
</script>
