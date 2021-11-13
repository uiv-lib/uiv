<template>
  <div class="uiv">
    <pagination v-model="currentPage" :total-page="totalPage" boundary-links />
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalPage: 18,
      currentPage: 1,
    }
  },
}
</script>
