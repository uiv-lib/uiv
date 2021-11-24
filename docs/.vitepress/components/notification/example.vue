<template>
  <section class="uiv">
    <Btn type="primary" @click="notify">Simplest Notification</Btn>
    <Btn type="primary" @click="notify2">No Auto-dismiss Notification</Btn>
  </section>
</template>

<script setup>
import { Notification, Btn } from 'uiv';

// example with callback
// pass a String as the notification content
function notify() {
  Notification.notify('This is a simple notify msg.', () => {
    // callback after dismissed
    console.log('dismissed');
  });
}

// example with Promise and options
function notify2() {
  Notification.notify({
    title: 'Title',
    content: 'This notification will not dismiss automatically.',
    duration: 0,
  }).then(() => {
    // resolve after dismissed
    console.log('dismissed');
  });
}
</script>
