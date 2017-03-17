<template>
  <div>
    <a :name="anchorText" class="anchor"></a>
    <h2 class="page-header">{{text}}</h2>
  </div>
</template>

<script>
  export default {
    props: ['text'],
    computed: {
      anchorText () {
        return this.text.toLowerCase().split(' ').join('-')
      }
    }
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
