<template>
  <div class="uiv">
    <h4>Buttons</h4>
    <Btn disabled type="primary">Primary button</Btn>
    <Btn disabled>Button</Btn>
    <h4>Links</h4>
    <Btn disabled href="#" type="primary">Primary button</Btn>
    <Btn disabled to="/">Button</Btn>
  </div>
</template>

<script setup>
import { Btn } from 'uiv';
</script>
