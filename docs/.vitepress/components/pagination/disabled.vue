<template>
  <div class="uiv">
    <Pagination v-model="currentPage" :total-page="totalPage" disabled />
  </div>
</template>

<script setup>
import { Pagination } from 'uiv';
import { ref } from 'vue';

const totalPage = ref(18);
const currentPage = ref(1);
</script>
