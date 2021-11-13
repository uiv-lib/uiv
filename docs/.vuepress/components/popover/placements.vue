<template>
  <div class="uiv">
    <btn
      v-popover.left="{ title: 'Title', content: 'Popover on left' }"
      type="primary"
      >Left</btn
    >
    <btn
      v-popover.top="{ title: 'Title', content: 'Popover on top' }"
      type="primary"
      >Top</btn
    >
    <btn
      v-popover.bottom="{ title: 'Title', content: 'Popover on bottom' }"
      type="primary"
      >Bottom</btn
    >
    <btn
      v-popover.right="{ title: 'Title', content: 'Popover on right' }"
      type="primary"
      >Right</btn
    >
  </div>
</template>
