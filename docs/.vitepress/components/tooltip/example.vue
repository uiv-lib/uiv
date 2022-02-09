<template>
  <Btn id="btn" type="primary">Hover me!</Btn>
  <Tooltip text="Static tooltip content goes here" target="#btn" />
</template>

<script setup>
import { Btn, Tooltip } from 'uiv';
</script>
