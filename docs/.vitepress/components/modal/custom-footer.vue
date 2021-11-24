<template>
  <section class="uiv">
    <Btn type="primary" @click="open1 = true">Custom Footer</Btn>
    <Btn type="primary" @click="open2 = true">No Footer</Btn>
    <Modal v-model="open1" title="Modal Title">
      <p>This is a modal with custom footer.</p>
      <template #footer>
        <div>
          <Btn @click="open1 = false">Cancel</Btn>
          <Btn type="warning">Warning Action</Btn>
          <Btn type="danger">Danger Action</Btn>
        </div>
      </template>
    </Modal>
    <Modal v-model="open2" title="Modal Title" :footer="false">
      <p>This is a modal with no footer.</p>
    </Modal>
  </section>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open1 = ref(false);
const open2 = ref(false);
</script>
