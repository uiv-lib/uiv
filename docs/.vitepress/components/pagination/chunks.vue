<template>
  <Pagination v-model="currentPage" :total-page="totalPage" :max-size="3" />
  <Pagination v-model="currentPage" :total-page="totalPage" />
  <Pagination
    v-model="currentPage"
    :total-page="totalPage"
    :max-size="totalPage"
  />
</template>

<script setup>
import { Pagination } from 'uiv';
import { ref } from 'vue';

const totalPage = ref(10);
const currentPage = ref(1);
</script>
