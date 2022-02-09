<template>
  <Btn v-tooltip="'Static tooltip content goes here'" type="primary">
    Hover me!
  </Btn>
</template>

<script setup>
import { Btn, tooltip as vTooltip } from 'uiv';
</script>
