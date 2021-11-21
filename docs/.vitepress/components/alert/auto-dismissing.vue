<template>
  <section class="uiv">
    <alert
      v-for="(item, index) in alerts"
      :key="item.key"
      :duration="duration"
      @dismissed="alerts.splice(index, 1)"
    >
      This alert <b>will dismiss after {{ duration }}ms</b>.
    </alert>
    <hr />
    <btn type="primary" @click="addAutoDismissAlert()"
      >Add Auto Dismiss Alert</btn
    >
  </section>
</template>
<script setup>
import { reactive } from 'vue';

const alerts = reactive([]);
const duration = 2000;

function addAutoDismissAlert() {
  alerts.push({ key: new Date().getTime() });
}
</script>
