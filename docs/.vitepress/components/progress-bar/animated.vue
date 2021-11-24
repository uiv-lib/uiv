<template>
  <div class="uiv">
    <ProgressBar v-model="progress" striped active />
  </div>
</template>

<script setup>
import { ProgressBar } from 'uiv';
import { ref } from 'vue';

const progress = ref(40);
</script>
