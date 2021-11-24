<template>
  <div class="uiv">
    <DatePicker v-model="date" :limit-from="limitFrom" :limit-to="limitTo" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { DatePicker } from 'uiv';

const date = ref(null);

const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);
const limitFrom = ref(today);
const limitTo = ref(nextWeek);
</script>
