<template>
  <section class="uiv">
    <Btn type="primary" @click="open1 = true">Large Modal</Btn>
    <Btn type="primary" @click="open2 = true">Small Modal</Btn>
    <Modal v-model="open1" title="Modal Title" size="lg">
      <p>This is a large modal.</p>
    </Modal>
    <Modal v-model="open2" title="Modal Title" size="sm">
      <p>This is a small modal.</p>
    </Modal>
  </section>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open1 = ref(false);
const open2 = ref(false);
</script>
