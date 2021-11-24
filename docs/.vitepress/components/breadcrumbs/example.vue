<template>
  <div class="uiv">
    <Breadcrumbs :items="items" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Breadcrumbs } from 'uiv';

const items = ref([
  { text: 'Home', href: '#' },
  { text: 'Library', href: '#' },
  { text: 'Data', href: '#' },
]);
</script>
