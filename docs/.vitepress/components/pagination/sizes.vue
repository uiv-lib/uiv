<template>
  <Pagination v-model="currentPage" :total-page="totalPage" size="lg" />
  <Pagination v-model="currentPage" :total-page="totalPage" />
  <Pagination v-model="currentPage" :total-page="totalPage" size="sm" />
</template>

<script setup>
import { Pagination } from 'uiv';
import { ref } from 'vue';

const totalPage = ref(18);
const currentPage = ref(1);
</script>
