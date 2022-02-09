<template>
  <Btn type="primary" @click="open1 = true">HTML Title</Btn>
  <Btn type="primary" @click="open2 = true">No Header</Btn>
  <Modal v-model="open1">
    <template #title>
      <span><i class="glyphicon glyphicon-heart"></i> Modal Title</span>
    </template>
    <p>This is a modal with HTML title.</p>
  </Modal>
  <Modal v-model="open2" :header="false">
    <p>This is a modal with no header.</p>
  </Modal>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open1 = ref(false);
const open2 = ref(false);
</script>
