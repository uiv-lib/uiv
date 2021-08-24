<template>
  <div role="alert" :class="alertClass">
    <button
      v-if="dismissible"
      type="button"
      class="close"
      aria-label="Close"
      @click="closeAlert"
    >
      <span aria-hidden="true">&times;</span>
    </button>
    <slot></slot>
  </div>
</template>

<script src="./Alert.js" />
