<template>
  <section class="uiv">
    <Btn type="primary" @click="open1 = true">Open set of nested modals</Btn>
    <!-- `append-to-body` not required here -->
    <Modal ref="modal1" v-model="open1" title="Modal 1" size="lg">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <Btn type="info" @click="open2 = true">Open Modal 2</Btn>
      <!-- `append-to-body` required, because this is a nested modal -->
      <Modal ref="modal2" v-model="open2" title="Modal 2" append-to-body>
        <p>This is a nested modal.</p>
        <Btn type="info" @click="open3 = true">Open Modal 3</Btn>
        <!-- `append-to-body` required, because this is a nested modal -->
        <Modal
          ref="modal3"
          v-model="open3"
          title="Modal 3"
          size="sm"
          append-to-body
        >
          <p>This is another nested modal.</p>
        </Modal>
      </Modal>
    </Modal>
  </section>
</template>

<script setup>
import { Modal, Btn } from 'uiv';
import { ref } from 'vue';

const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
</script>
