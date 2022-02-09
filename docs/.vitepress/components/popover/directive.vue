<template>
  <Btn
    v-popover="{ title: 'Title', content: 'Popover content' }"
    type="primary"
  >
    Popover
  </Btn>
</template>

<script setup>
import { popover as vPopover, Btn } from 'uiv';
</script>
