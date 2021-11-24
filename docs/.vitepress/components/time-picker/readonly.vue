<template>
  <div class="uiv">
    <TimePicker v-model="time" readonly />
  </div>
</template>

<script setup>
import { TimePicker } from 'uiv';
import { ref } from 'vue';

const time = ref(new Date());
</script>
