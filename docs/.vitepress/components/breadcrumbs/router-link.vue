<template>
  <div class="uiv">
    <breadcrumbs :items="items" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Home', to: '/', exact: true },
  { text: 'Breadcrumbs', to: '/breadcrumbs' },
]);
</script>
