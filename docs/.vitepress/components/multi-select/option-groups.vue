<template>
  <div class="uiv">
    <MultiSelect v-model="selected" :options="options" />
  </div>
</template>

<script setup>
import { MultiSelect } from 'uiv';
import { ref } from 'vue';

const selected = ref([]);
const options = ref([
  { value: 1, label: 'Apple', group: 'Fruit' },
  { value: 2, label: 'Banana', group: 'Fruit' },
  { value: 3, label: 'Orange', group: 'Fruit' },
  { value: 4, label: 'Red', group: 'Color' },
  { value: 5, label: 'Green', group: 'Color' },
]);
</script>
