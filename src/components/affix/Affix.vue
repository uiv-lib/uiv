<template>
  <div class="hidden-print">
    <div v-scroll="onScroll" :class="classes" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./Affix.js" />
