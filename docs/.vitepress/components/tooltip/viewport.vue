<template>
  <div id="tooltip-viewport" class="uiv">
    <Btn
      v-tooltip="{
        text: 'Tooltip content auto',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
    >
      Auto
    </Btn>
    <Btn
      v-tooltip.left="{
        text: 'Tooltip content on left',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
    >
      Left
    </Btn>
    <Btn
      v-tooltip.top="{
        text: 'Tooltip content on top',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
    >
      Top
    </Btn>
    <Btn
      v-tooltip.bottom="{
        text: 'Tooltip content on bottom',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
    >
      Bottom
    </Btn>
    <Btn
      v-tooltip.right="{
        text: 'Tooltip content on right',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
    >
      Right
    </Btn>
    <Btn
      v-tooltip="{
        text: 'Tooltip content auto',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
    >
      Auto
    </Btn>
  </div>
</template>

<script setup>
import { Btn, tooltip as vTooltip } from 'uiv';
</script>

<style scoped>
#tooltip-viewport {
  display: inline-block;
  padding: 20px;
  background-color: #eee;
}
</style>
