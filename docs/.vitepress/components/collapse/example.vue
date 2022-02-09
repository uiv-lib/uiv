<template>
  <div>
    <Btn type="primary" @click="show = !show">Click me!</Btn>
  </div>
  <br />
  <Collapse v-model="show">
    <div class="well" style="margin-bottom: 0">Hi there.</div>
  </Collapse>
</template>
<script setup>
import { ref } from 'vue';
import { Collapse, Btn } from 'uiv';

const show = ref(false);
</script>
