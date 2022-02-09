<template>
  <div>
    <MultiSelect v-model="selected" :options="options" size="sm" />
  </div>
  <br />
  <div>
    <MultiSelect v-model="selected" :options="options" />
  </div>
  <br />
  <div>
    <MultiSelect v-model="selected" :options="options" size="lg" />
  </div>
  <br />
  <div>
    <MultiSelect v-model="selected" :options="options" size="lg" block />
  </div>
</template>

<script setup>
import { MultiSelect } from 'uiv';
import { ref } from 'vue';

const selected = ref([]);
const options = ref([
  { value: 1, label: 'Option1' },
  { value: 2, label: 'Option2' },
  { value: 3, label: 'Option3' },
  { value: 4, label: 'Option4' },
  { value: 5, label: 'Option5' },
]);
</script>
