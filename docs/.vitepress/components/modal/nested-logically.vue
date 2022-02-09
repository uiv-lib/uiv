<template>
  <Btn type="primary" @click="open1 = true"
    >Open set of nested modals (logically)</Btn
  >
  <Modal v-model="open1" title="Modal 1" size="lg">
    <p>This is a simple large modal.</p>
    <p>Click on the button below to open a nested modal.</p>
    <Btn type="info" @click="open2 = true">Open Modal 2</Btn>
  </Modal>
  <Modal v-model="open2" title="Modal 2">
    <p>This is a nested modal.</p>
    <Btn type="info" @click="open3 = true">Open Modal 3</Btn>
  </Modal>
  <Modal v-model="open3" title="Modal 3" size="sm">
    <p>This is another nested modal.</p>
  </Modal>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
</script>
