<template>
  <Btn type="primary" @click="alert">Click to open an alert modal</Btn>
</template>
<script setup>
import { Btn, MessageBox, Notification } from 'uiv';

function alert() {
  MessageBox.alert(
    {
      title: 'Title',
      content: 'This is an alert message.',
    },
    (msg) => {
      // callback after modal dismissed
      Notification.notify(`You selected ${msg}.`);
    }
  );
}
</script>
