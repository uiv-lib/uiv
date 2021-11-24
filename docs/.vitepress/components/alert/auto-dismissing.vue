<template>
  <section class="uiv">
    <Alert
      v-for="(item, index) in alerts"
      :key="item.key"
      :duration="duration"
      @dismissed="alerts.splice(index, 1)"
    >
      This alert <b>will dismiss after {{ duration }}ms</b>.
    </Alert>
    <hr />
    <Btn type="primary" @click="addAutoDismissAlert()"
      >Add Auto Dismiss Alert</Btn
    >
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import { Alert, Btn } from 'uiv';

const alerts = reactive([]);
const duration = 2000;

function addAutoDismissAlert() {
  alerts.push({ key: new Date().getTime() });
}
</script>
