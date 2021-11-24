<template>
  <div class="uiv">
    <Btn
      v-popover="{ title: 'Title', content: 'Popover content' }"
      type="primary"
    >
      Popover
    </Btn>
  </div>
</template>

<script setup>
import { popover as vPopover, Btn } from 'uiv';
</script>
