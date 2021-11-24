<template>
  <div class="uiv">
    <Btn type="primary" @click="confirm">Click to open a prompt modal</Btn>
  </div>
</template>
<script setup>
import { Btn, MessageBox, Notification } from 'uiv';

function confirm() {
  MessageBox.prompt({
    title: 'Welcome',
    content: 'Please input your email:',
    // A simple input validator
    // returns the err msg (not valid) or null (valid)
    validator(value) {
      return /\S+@\S+\.\S+/.test(value) ? null : 'Email address is not valid!';
    },
  })
    .then((value) => {
      Notification.notify({
        type: 'success',
        content: `You email address is ${value}`,
      });
    })
    .catch(() => {
      Notification.notify('Input canceled.');
    });
}
</script>
