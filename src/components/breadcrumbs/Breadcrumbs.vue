<template>
  <ol class="breadcrumb">
    <slot />
    <BreadcrumbItem
      v-for="(item, index) of items"
      :key="item.key ?? index"
      :active="item.active ?? index === items.length - 1"
      :href="item.href"
      :to="item.to"
      :replace="item.replace"
      :append="item.append"
      :exact="item.exact"
      >{{ item.text }}</BreadcrumbItem
    >
  </ol>
</template>

<script setup>
import BreadcrumbItem from './BreadcrumbItem.vue';

defineProps({
  items: { type: Array, default: () => [] },
});
</script>
