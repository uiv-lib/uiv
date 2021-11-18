<template>
  <div class="uiv">
    <pagination v-model="currentPage" :total-page="totalPage" />
    <pagination v-model="currentPage" :total-page="totalPage" align="center" />
    <pagination v-model="currentPage" :total-page="totalPage" align="right" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalPage: 18,
      currentPage: 1,
    };
  },
};
</script>
