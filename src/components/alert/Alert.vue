<template>
  <div role="alert" :class="alertClass">
    <button type="button" class="close" aria-label="Close" v-if="dismissible" @click="closeAlert">
      <span aria-hidden="true">&times;</span>
    </button>
    <slot></slot>
  </div>
</template>

<script src="./Alert.js"/>
