<template>
  <div class="uiv">
    <Btn
      v-popover="{ title: 'Title', content: 'Popover content' }"
      type="primary"
    >
      Outside-Click (Default)
    </Btn>
    <Btn
      v-popover.hover="{ title: 'Title', content: 'Popover content' }"
      type="primary"
    >
      Hover
    </Btn>
    <Btn
      v-popover.focus="{ title: 'Title', content: 'Popover content' }"
      type="primary"
    >
      Focus
    </Btn>
    <Btn
      v-popover.hover-focus="{ title: 'Title', content: 'Popover content' }"
      type="primary"
    >
      Hover-Focus
    </Btn>
    <Btn
      v-popover.click="{ title: 'Title', content: 'Popover content' }"
      type="primary"
    >
      Click
    </Btn>
  </div>
</template>

<script setup>
import { popover as vPopover, Btn } from 'uiv';
</script>
