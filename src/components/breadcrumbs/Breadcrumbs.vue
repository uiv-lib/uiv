<template>
  <ol class="breadcrumb">
    <slot>
      <breadcrumb-item
        v-for="(item, index) in items"
        :key="item.key ? item.key : index"
        :active="isItemActive(item, index)"
        :href="item.href"
        :target="item.target"
        :to="item.to">{{item.text}}</breadcrumb-item>
    </slot>
  </ol>
</template>

<script>
  import BreadcrumbItem from './BreadcrumbItem.vue'

  export default {
    components: {BreadcrumbItem},
    props: {
      items: {
        type: Array
      }
    },
    methods: {
      isItemActive (item, index) {
        return typeof item.active === 'boolean' ? item.active : index === this.items.length - 1
      }
    }
  }
</script>
