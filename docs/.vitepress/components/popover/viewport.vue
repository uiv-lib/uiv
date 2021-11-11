<template>
  <div id="popover-viewport" class="uiv">
    <btn
      v-popover="{
        title: 'Title',
        content: 'Popover auto',
        viewport: '#popover-viewport',
      }"
      type="primary"
      >Auto</btn
    >
    <btn
      v-popover.left="{
        title: 'Title',
        content: 'Popover on left',
        viewport: '#popover-viewport',
      }"
      type="primary"
      >Left</btn
    >
    <btn
      v-popover.top="{
        title: 'Title',
        content: 'Popover on top',
        viewport: '#popover-viewport',
      }"
      type="primary"
      >Top</btn
    >
    <btn
      v-popover.bottom="{
        title: 'Title',
        content: 'Popover on bottom',
        viewport: '#popover-viewport',
      }"
      type="primary"
      >Bottom</btn
    >
    <btn
      v-popover.right="{
        title: 'Title',
        content: 'Popover on right',
        viewport: '#popover-viewport',
      }"
      type="primary"
      >Right</btn
    >
    <btn
      v-popover="{
        title: 'Title',
        content: 'Popover auto',
        viewport: '#popover-viewport',
      }"
      type="primary"
      >Auto</btn
    >
  </div>
</template>
<style scoped>
#popover-viewport {
  display: inline-block;
  padding: 20px;
  background-color: #eee;
}
</style>
