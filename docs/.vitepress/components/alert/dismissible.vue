<template>
  <section class="uiv">
    <Alert v-if="show" type="warning" dismissible @dismissed="show = false">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </Alert>
    <Alert
      v-for="(item, index) in alerts"
      :key="item.key"
      dismissible
      @dismissed="alerts.splice(index, 1)"
    >
      <b>Heads up!</b> This alert needs your attention, but it's not super
      important.
    </Alert>
    <hr />
    <Btn type="primary" @click="addDismissibleAlert()"
      >Add Dismissible Alert</Btn
    >
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Alert, Btn } from 'uiv';

const show = ref(true);
const alerts = reactive([]);

function addDismissibleAlert() {
  alerts.push({ key: new Date().getTime() });
}
</script>
