<template>
  <Btn type="primary" @click="confirm">Click to open a confirm modal</Btn>
</template>
<script setup>
import { Btn, MessageBox, Notification } from 'uiv';

function confirm() {
  MessageBox.confirm({
    title: 'Confirm',
    content: 'This item will be permanently deleted. Continue?',
  })
    .then(() => {
      Notification.notify({
        type: 'success',
        content: 'Delete completed.',
      });
    })
    .catch(() => {
      Notification.notify('Delete canceled.');
    });
}
</script>
