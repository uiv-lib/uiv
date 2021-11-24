<template>
  <div class="uiv">
    <TimePicker v-model="time" :show-meridian="false" />
  </div>
</template>

<script setup>
import { TimePicker } from 'uiv';
import { ref } from 'vue';

const time = ref(new Date());
</script>
