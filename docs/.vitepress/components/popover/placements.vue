<template>
  <div class="uiv">
    <Btn
      v-popover.left="{ title: 'Title', content: 'Popover on left' }"
      type="primary"
    >
      Left
    </Btn>
    <Btn
      v-popover.top="{ title: 'Title', content: 'Popover on top' }"
      type="primary"
    >
      Top
    </Btn>
    <Btn
      v-popover.bottom="{ title: 'Title', content: 'Popover on bottom' }"
      type="primary"
    >
      Bottom
    </Btn>
    <Btn
      v-popover.right="{ title: 'Title', content: 'Popover on right' }"
      type="primary"
    >
      Right
    </Btn>
  </div>
</template>

<script setup>
import { popover as vPopover, Btn } from 'uiv';
</script>
