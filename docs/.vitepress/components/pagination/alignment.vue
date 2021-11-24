<template>
  <div class="uiv">
    <Pagination v-model="currentPage" :total-page="totalPage" />
    <Pagination v-model="currentPage" :total-page="totalPage" align="center" />
    <Pagination v-model="currentPage" :total-page="totalPage" align="right" />
  </div>
</template>

<script setup>
import { Pagination } from 'uiv';
import { ref } from 'vue';

const totalPage = ref(18);
const currentPage = ref(1);
</script>
