<template>
  <ol class="breadcrumb">
    <slot />
    <BreadcrumbItem
      v-for="(item, index) of items"
      :key="hasOwnProperty(item, 'key') ? item.key : index"
      :active="
        hasOwnProperty(item, 'active')
          ? item.active
          : index === items.length - 1
      "
      :href="item.href"
      :to="item.to"
      :replace="item.replace"
      :append="item.append"
      :exact="item.exact"
      >{{ item.text }}</BreadcrumbItem
    >
  </ol>
</template>

<script>
import BreadcrumbItem from './BreadcrumbItem.vue'
import { hasOwnProperty } from '../../utils/object.utils'

export default {
  functional: true,
  components: { BreadcrumbItem },
  props: {
    items: { type: Array, default: () => [] },
  },
  methods: {
    hasOwnProperty,
  },
}
</script>
