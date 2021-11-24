<template>
  <div class="uiv">
    <Btn type="primary" @click="confirm">Click to open a confirm modal</Btn>
  </div>
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
