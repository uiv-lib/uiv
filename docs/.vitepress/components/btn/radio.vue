<template>
  <section class="uiv">
    <BtnGroup>
      <Btn v-model="model" input-type="radio" input-value="1">Radio 1</Btn>
      <Btn v-model="model" input-type="radio" input-value="2">Radio 2</Btn>
      <Btn v-model="model" input-type="radio" input-value="3">Radio 3</Btn>
      <Btn v-model="model" input-type="radio" input-value="4" disabled
        >Radio 4 (Disabled)</Btn
      >
    </BtnGroup>
    <hr />
    <Alert>Selected: {{ model }}</Alert>
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { Btn, BtnGroup, Alert } from 'uiv';

const model = ref('1');
</script>
