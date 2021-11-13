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
<script>
export default {
  data() {
    return {
      alerts: [],
      duration: 2000,
    }
  },
  methods: {
    addAutoDismissAlert() {
      this.alerts.push({ key: new Date().getTime() })
    },
  },
}
</script>
