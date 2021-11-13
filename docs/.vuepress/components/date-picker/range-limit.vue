<template>
  <div class="uiv">
    <date-picker v-model="date" :limit-from="limitFrom" :limit-to="limitTo" />
  </div>
</template>
<script>
export default {
  data() {
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)

    return {
      date: null,
      limitFrom: today,
      limitTo: nextWeek,
    }
  },
}
</script>
