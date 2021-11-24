<template>
  <div class="uiv">
    <TimePicker v-model="time" :max="max" :min="min" />
  </div>
</template>

<script setup>
import { TimePicker } from 'uiv';
import { ref } from 'vue';

const time = ref(new Date());
const min = ref(new Date('2017/01/01 8:00')); // date doesn't matter
const max = ref(new Date('2017/01/01 20:00'));
</script>
