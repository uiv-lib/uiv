<template>
  <div class="uiv">
    <Btn id="btn" type="primary">Hover me!</Btn>
    <Tooltip text="Static tooltip content goes here" target="#btn" />
  </div>
</template>

<script setup>
import { Btn, Tooltip } from 'uiv';
</script>
