<template>
  <div class="uiv">
    <Alert type="success"
      ><b>Well done!</b> You successfully read this important alert
      message.</Alert
    >
    <Alert type="info"
      ><b>Heads up!</b> This alert needs your attention, but it's not super
      important.</Alert
    >
    <Alert type="warning"
      ><b>Warning!</b> Better check yourself, you're not looking too
      good.</Alert
    >
    <Alert type="danger"
      ><b>Oh snap!</b> Change this and that and try again.</Alert
    >
  </div>
</template>

<script setup>
import { Alert } from 'uiv';
</script>
