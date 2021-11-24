<template>
  <section class="uiv">
    <Btn type="primary" @click="open = true">Disable Backdrop</Btn>
    <Modal v-model="open" title="Modal Title" :backdrop="false">
      <p>This is a modal that can not close by backdrop click.</p>
    </Modal>
  </section>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open = ref(false);
</script>
