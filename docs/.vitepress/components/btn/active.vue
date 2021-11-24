<template>
  <div class="uiv">
    <h4>Buttons</h4>
    <Btn active type="primary">Primary button</Btn>
    <Btn active>Button</Btn>
    <h4>Links</h4>
    <Btn active href="#" type="primary">Primary button</Btn>
    <Btn active to="/">Button</Btn>
  </div>
</template>

<script setup>
import { Btn } from 'uiv';
</script>
