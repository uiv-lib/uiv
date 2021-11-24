<template>
  <div class="uiv">
    <h4>Default Label</h4>
    <ProgressBar v-model="progress" label />
    <h4>Custom Label</h4>
    <ProgressBar
      v-model="progress"
      label
      label-text="Loading......Please wait."
    />
    <h4>Minimum Width</h4>
    <ProgressBar v-model="progress1" min-width label />
  </div>
</template>

<script setup>
import { ProgressBar } from 'uiv';
import { ref } from 'vue';

const progress1 = ref(1);
const progress = ref(66);
</script>
