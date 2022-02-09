<template>
  <Btn type="primary" @click="notify">Notification Without Dismiss Button</Btn>
</template>

<script setup>
import { Notification, Btn } from 'uiv';

function notify() {
  Notification.notify({
    title: 'Title',
    content: 'This is a notification without dismiss btn.',
    dismissible: false,
  });
}
</script>
