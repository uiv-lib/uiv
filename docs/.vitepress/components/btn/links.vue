<template>
  <div class="uiv">
    <h4>Native links</h4>
    <Btn href="#">Default</Btn>
    <Btn href="#" type="primary">Primary</Btn>
    <h4>Vue Router links</h4>
    <Btn to="/">Default</Btn>
    <Btn to="/" type="primary">Primary</Btn>
  </div>
</template>

<script setup>
import { Btn } from 'uiv';
</script>
