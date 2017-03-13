<template>
  <div class="container">
    <modal-doc></modal-doc>
    <dropdown-doc></dropdown-doc>
    <tabs-doc></tabs-doc>
  </div>
</template>

<script>
  import TabsDoc from './docs/TabsDoc.vue'
  import DropdownDoc from './docs/DropdownDoc.vue'
  import ModalDoc from './docs/ModalDoc.vue'
  export default {
    name: 'app',
    components: {
      TabsDoc, DropdownDoc, ModalDoc
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  h1, h2, h3, h4, h5, h6 {
    a {
      color: #333;
      text-decoration: none;

      &:active, &:visited, &:focus, &:hover {
        color: #333;
        text-decoration: none;
      }
    }
  }
</style>
