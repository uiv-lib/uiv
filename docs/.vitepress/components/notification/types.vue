<template>
  <Btn type="info" @click="info">Info</Btn>
  <Btn type="success" @click="success">Success</Btn>
  <Btn type="warning" @click="warning">Warning</Btn>
  <Btn type="danger" @click="danger">Danger</Btn>
</template>

<script setup>
import { Notification, Btn } from 'uiv';

function info() {
  Notification.notify({
    type: 'info',
    title: 'Heads up!',
    content: "This alert needs your attention, but it's not super important.",
  });
}

function success() {
  Notification.notify({
    type: 'success',
    title: 'Well done!',
    content: 'You successfully read this important alert message.',
  });
}

function warning() {
  // simple warning with content only
  Notification.notify.warning(
    "Better check yourself, you're not looking too good."
  );
}

function danger() {
  // error msg with title and content (other options available too)
  // `error` is an alias of `danger` (both of them works)
  Notification.notify.error({
    title: 'Oh snap!',
    content: 'Change a few things up and try submitting again.',
  });
}
</script>
