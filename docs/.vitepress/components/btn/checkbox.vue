<template>
  <BtnGroup>
    <Btn v-model="model" input-type="checkbox" input-value="1">Checkbox 1</Btn>
    <Btn v-model="model" input-type="checkbox" input-value="2">Checkbox 2</Btn>
    <Btn v-model="model" input-type="checkbox" input-value="3">Checkbox 3</Btn>
    <Btn v-model="model" input-type="checkbox" input-value="4" disabled
      >Checkbox 4 (Disabled)</Btn
    >
  </BtnGroup>
  <hr />
  <Alert>Selected: {{ model }}</Alert>
</template>
<script setup>
import { ref } from 'vue';
import { Btn, BtnGroup, Alert } from 'uiv';

const model = ref(['1']);
</script>
