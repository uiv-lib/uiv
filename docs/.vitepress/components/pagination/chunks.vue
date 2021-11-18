<template>
  <div class="uiv">
    <pagination v-model="currentPage" :total-page="totalPage" :max-size="3" />
    <pagination v-model="currentPage" :total-page="totalPage" />
    <pagination
      v-model="currentPage"
      :total-page="totalPage"
      :max-size="totalPage"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalPage: 10,
      currentPage: 1,
    };
  },
};
</script>
