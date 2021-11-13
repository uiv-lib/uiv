<template>
  <section class="uiv">
    <btn type="primary" @click="show = !show">Toggle Collapsing Alert</btn>
    <hr />
    <collapse v-model="show">
      <alert type="warning" dismissible @dismissed="show = false"
        >This alert <b>will collapse on open / close</b>.</alert
      >
    </collapse>
  </section>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    }
  },
}
</script>
