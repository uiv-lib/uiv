<template>
  <section class="uiv">
    <Btn type="primary" @click="open = true">Disable Animation</Btn>
    <Modal v-model="open" title="Modal Title" :transition="0">
      <p>This is a modal that has no transition effect.</p>
    </Modal>
  </section>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open = ref(false);
</script>
