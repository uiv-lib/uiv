<template>
  <Tooltip
    v-model="show"
    text="Static tooltip content goes here"
    trigger="manual"
  >
    <btn>You Can't Trigger Tooltip Here...</btn>
  </Tooltip>
  <hr />
  <Btn type="primary" @click="show = !show">Toggle Tooltip</Btn>
</template>

<script setup>
import { Btn, Tooltip } from 'uiv';
import { ref } from 'vue';

const show = ref(false);
</script>
