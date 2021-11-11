<template>
  <div class="uiv">
    <btn v-tooltip="'Static tooltip content'" type="primary"
      >Hover-Focus (Default)</btn
    >
    <btn v-tooltip.hover="'Static tooltip content'" type="primary">Hover</btn>
    <btn v-tooltip.focus="'Static tooltip content'" type="primary">Focus</btn>
    <btn v-tooltip.click="'Static tooltip content'" type="primary">Click</btn>
    <btn v-tooltip.outside-click="'Static tooltip content'" type="primary"
      >Outside-Click</btn
    >
  </div>
</template>
