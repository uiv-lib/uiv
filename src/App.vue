<template>
  <div class="container">
    <dropdown-doc></dropdown-doc>
    <tabs-doc></tabs-doc>
  </div>
</template>

<script>
  import TabsDoc from './docs/TabsDoc.vue'
  import DropdownDoc from './docs/DropdownDoc.vue'

  export default {
    name: 'app',
    components: {
      TabsDoc, DropdownDoc
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
