<template>
  <section class="uiv">
    <Btn type="primary" @click="show = !show">Toggle Collapsing Alert</Btn>
    <hr />
    <Collapse v-model="show">
      <Alert type="warning" dismissible @dismissed="show = false"
        >This alert <b>will collapse on open / close</b>.</Alert
      >
    </Collapse>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Alert, Btn, Collapse } from 'uiv';

const show = ref(true);
</script>
