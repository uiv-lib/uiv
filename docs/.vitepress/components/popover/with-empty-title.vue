<template>
  <div class="uiv">
    <Btn v-popover="{ content: 'Popover without a title' }" type="primary">
      Popover
    </Btn>
  </div>
</template>

<script setup>
import { popover as vPopover, Btn } from 'uiv';
</script>
