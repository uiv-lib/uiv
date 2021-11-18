<template>
  <div class="uiv">
    <time-picker v-model="time" readonly />
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: new Date(),
    };
  },
};
</script>
