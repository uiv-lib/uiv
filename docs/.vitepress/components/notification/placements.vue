<template>
  <Btn type="primary" @click="notify('top-right')">Top Right (Default)</Btn>
  <Btn type="primary" @click="notify('bottom-right')">Bottom Right</Btn>
  <Btn type="primary" @click="notify('bottom-left')">Bottom Left</Btn>
  <Btn type="primary" @click="notify('top-left')">Top Left</Btn>
</template>

<script setup>
import { Notification, Btn } from 'uiv';

function notify(placement) {
  Notification.notify({
    placement, // equal to `placement: placement` in ES6
    title: 'Title',
    content: `This is a notify msg at ${placement}.`,
  });
}
</script>
