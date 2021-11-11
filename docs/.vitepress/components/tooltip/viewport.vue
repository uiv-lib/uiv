<template>
  <div id="tooltip-viewport" class="uiv">
    <btn
      v-tooltip="{
        text: 'Tooltip content auto',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
      >Auto</btn
    >
    <btn
      v-tooltip.left="{
        text: 'Tooltip content on left',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
      >Left</btn
    >
    <btn
      v-tooltip.top="{
        text: 'Tooltip content on top',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
      >Top</btn
    >
    <btn
      v-tooltip.bottom="{
        text: 'Tooltip content on bottom',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
      >Bottom
    </btn>
    <btn
      v-tooltip.right="{
        text: 'Tooltip content on right',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
      >Right</btn
    >
    <btn
      v-tooltip="{
        text: 'Tooltip content auto',
        viewport: '#tooltip-viewport',
      }"
      type="primary"
      >Auto</btn
    >
  </div>
</template>
<style scoped>
#tooltip-viewport {
  display: inline-block;
  padding: 20px;
  background-color: #eee;
}
</style>
