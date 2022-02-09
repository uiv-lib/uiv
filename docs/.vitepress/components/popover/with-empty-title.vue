<template>
  <Btn v-popover="{ content: 'Popover without a title' }" type="primary">
    Popover
  </Btn>
</template>

<script setup>
import { popover as vPopover, Btn } from 'uiv';
</script>
