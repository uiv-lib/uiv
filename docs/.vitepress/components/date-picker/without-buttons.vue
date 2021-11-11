<template>
  <div class="uiv">
    <date-picker v-model="date" :today-btn="false" :clear-btn="false" />
  </div>
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
