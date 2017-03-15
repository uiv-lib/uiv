<template>
  <div>
    <a :name="text.toLowerCase()" class="anchor"></a>
    <h2 class="page-header">{{text}}</h2>
  </div>
</template>

<script>
  export default {
    props: ['text']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .anchor {
    display: block;
    position: relative;
    top: -70px;
    visibility: hidden;
  }
</style>
