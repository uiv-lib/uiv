<template>
  <div class="uiv">
    <ProgressBar v-model="progress40" type="success" striped />
    <ProgressBar v-model="progress20" type="info" striped />
    <ProgressBar v-model="progress60" type="warning" striped />
    <ProgressBar v-model="progress80" type="danger" striped />
  </div>
</template>

<script setup>
import { ProgressBar } from 'uiv';
import { ref } from 'vue';

const progress20 = ref(20);
const progress40 = ref(40);
const progress60 = ref(60);
const progress80 = ref(80);
</script>
