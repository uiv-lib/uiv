<template>
  <Btn type="primary" @click="open = true">Custom Button Text and Type</Btn>
  <Modal
    v-model="open"
    title="Are you sure?"
    ok-text="Yes, please"
    cancel-text="No way!"
    ok-type="danger"
    cancel-type="warning"
  >
    <p>Do you really want to destroy this item?</p>
  </Modal>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open = ref(false);
</script>
