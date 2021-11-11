<template>
  <div class="uiv">
    <btn
      v-popover="{ title: 'Title', content: 'Popover content' }"
      type="primary"
      >Outside-Click (Default)</btn
    >
    <btn
      v-popover.hover="{ title: 'Title', content: 'Popover content' }"
      type="primary"
      >Hover</btn
    >
    <btn
      v-popover.focus="{ title: 'Title', content: 'Popover content' }"
      type="primary"
      >Focus</btn
    >
    <btn
      v-popover.hover-focus="{ title: 'Title', content: 'Popover content' }"
      type="primary"
      >Hover-Focus</btn
    >
    <btn
      v-popover.click="{ title: 'Title', content: 'Popover content' }"
      type="primary"
      >Click</btn
    >
  </div>
</template>
