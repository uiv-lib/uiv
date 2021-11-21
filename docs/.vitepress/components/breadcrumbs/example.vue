<template>
  <div class="uiv">
    <breadcrumbs :items="items" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'Home', href: '#' },
  { text: 'Library', href: '#' },
  { text: 'Data', href: '#' },
]);
</script>
