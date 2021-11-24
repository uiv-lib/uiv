<template>
  <div class="uiv">
    <ProgressBar v-model="progress" />
  </div>
</template>

<script setup>
import { ProgressBar } from 'uiv';
import { ref } from 'vue';

const progress = ref(66);
</script>
