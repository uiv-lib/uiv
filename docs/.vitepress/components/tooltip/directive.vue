<template>
  <div class="uiv">
    <Btn v-tooltip="'Static tooltip content goes here'" type="primary">
      Hover me!
    </Btn>
  </div>
</template>

<script setup>
import { Btn, tooltip as vTooltip } from 'uiv';
</script>
