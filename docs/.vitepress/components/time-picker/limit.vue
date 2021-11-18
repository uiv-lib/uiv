<template>
  <div class="uiv">
    <time-picker v-model="time" :max="max" :min="min" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: new Date(),
      min: new Date('2017/01/01 8:00'), // date doesn't matter
      max: new Date('2017/01/01 20:00'),
    };
  },
};
</script>
