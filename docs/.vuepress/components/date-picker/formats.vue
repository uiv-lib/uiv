<template>
  <section class="uiv">
    <date-picker v-model="date" format="yyyy/MMMM/dd" />
    <br />
    <alert v-show="date" type="info"
      >You selected <b>{{ date }}</b
      >.</alert
    >
  </section>
</template>
<script>
export default {
  data() {
    return {
      date: null,
    }
  },
}
</script>
