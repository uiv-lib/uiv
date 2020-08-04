<template>
  <div class="hidden-print">
    <div :class="classes" :style="styles" v-scroll="onScroll">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./Affix.js"/>
