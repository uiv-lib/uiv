<template>
  <section class="uiv">
    <alert v-if="show" type="warning" dismissible @dismissed="show = false">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </alert>
    <alert
      v-for="(item, index) in alerts"
      :key="item.key"
      dismissible
      @dismissed="alerts.splice(index, 1)"
    >
      <b>Heads up!</b> This alert needs your attention, but it's not super
      important.
    </alert>
    <hr />
    <btn type="primary" @click="addDismissibleAlert()"
      >Add Dismissible Alert</btn
    >
  </section>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      alerts: [],
    };
  },
  methods: {
    addDismissibleAlert() {
      this.alerts.push({ key: new Date().getTime() });
    },
  },
};
</script>
