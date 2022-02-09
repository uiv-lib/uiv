<template>
  <Btn type="primary" @click="open = true">Auto Focus</Btn>
  <Modal v-model="open" title="Modal Title" auto-focus>
    <p>Check this out! The OK button is focused now.</p>
  </Modal>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open = ref(false);
</script>
