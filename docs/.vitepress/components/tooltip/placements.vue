<template>
  <div class="uiv">
    <Btn v-tooltip.left="'Tooltip content on left'" type="primary">Left</Btn>
    <Btn v-tooltip.top="'Tooltip content on top'" type="primary">Top</Btn>
    <Btn v-tooltip.bottom="'Tooltip content on bottom'" type="primary">
      Bottom
    </Btn>
    <Btn v-tooltip.right="'Tooltip content on right'" type="primary">Right</Btn>
  </div>
</template>

<script setup>
import { Btn, tooltip as vTooltip } from 'uiv';
</script>
