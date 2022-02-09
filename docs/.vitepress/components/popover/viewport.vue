<template>
  <div id="popover-viewport">
    <Btn
      v-popover="{
        title: 'Title',
        content: 'Popover auto',
        viewport: '#popover-viewport',
      }"
      type="primary"
    >
      Auto
    </Btn>
    <Btn
      v-popover.left="{
        title: 'Title',
        content: 'Popover on left',
        viewport: '#popover-viewport',
      }"
      type="primary"
    >
      Left
    </Btn>
    <Btn
      v-popover.top="{
        title: 'Title',
        content: 'Popover on top',
        viewport: '#popover-viewport',
      }"
      type="primary"
    >
      Top
    </Btn>
    <Btn
      v-popover.bottom="{
        title: 'Title',
        content: 'Popover on bottom',
        viewport: '#popover-viewport',
      }"
      type="primary"
    >
      Bottom
    </Btn>
    <Btn
      v-popover.right="{
        title: 'Title',
        content: 'Popover on right',
        viewport: '#popover-viewport',
      }"
      type="primary"
    >
      Right
    </Btn>
    <Btn
      v-popover="{
        title: 'Title',
        content: 'Popover auto',
        viewport: '#popover-viewport',
      }"
      type="primary"
    >
      Auto
    </Btn>
  </div>
</template>

<script setup>
import { popover as vPopover, Btn } from 'uiv';
</script>

<style scoped>
#popover-viewport {
  display: inline-block;
  padding: 50px;
  background-color: #eee;
}
</style>
