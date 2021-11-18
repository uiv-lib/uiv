<template>
  <section class="uiv">
    <date-picker v-model="date" week-numbers />
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
    };
  },
};
</script>
