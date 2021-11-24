<template>
  <div class="uiv">
    <p>
      <Btn size="lg" type="primary">Large button</Btn>
      <Btn size="lg">Large button</Btn>
    </p>
    <p>
      <Btn type="primary">Default button</Btn>
      <Btn>Default button</Btn>
    </p>
    <p>
      <Btn size="sm" type="primary">Small button</Btn>
      <Btn size="sm">Small button</Btn>
    </p>
    <p>
      <Btn size="xs" type="primary">Extra small button</Btn>
      <Btn size="xs">Extra small button</Btn>
    </p>
  </div>
</template>

<script setup>
import { Btn } from 'uiv';
</script>
