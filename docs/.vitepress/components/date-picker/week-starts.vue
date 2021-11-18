<template>
  <div class="uiv">
    <date-picker v-model="date" :week-starts-with="1" />
  </div>
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
