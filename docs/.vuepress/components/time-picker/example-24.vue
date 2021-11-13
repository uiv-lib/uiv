<template>
  <div class="uiv">
    <time-picker v-model="time" :show-meridian="false" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: new Date(),
    }
  },
}
</script>
