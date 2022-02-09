<template>
  <Btn v-tooltip="'Static tooltip content'" type="primary">
    Hover-Focus (Default)
  </Btn>
  <Btn v-tooltip.hover="'Static tooltip content'" type="primary">Hover</Btn>
  <Btn v-tooltip.focus="'Static tooltip content'" type="primary">Focus</Btn>
  <Btn v-tooltip.click="'Static tooltip content'" type="primary">Click</Btn>
  <Btn v-tooltip.outside-click="'Static tooltip content'" type="primary">
    Outside-Click
  </Btn>
</template>

<script setup>
import { Btn, tooltip as vTooltip } from 'uiv';
</script>
