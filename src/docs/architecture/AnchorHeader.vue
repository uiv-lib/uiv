<template>
  <div>
    <a :name="anchorText" class="anchor"></a>
    <h2 class="page-header">
      <span>{{text}}</span>
      <small v-if="sourceFolder">
        <a :href="'https://github.com/wxsms/uiv/tree/master/src/components/'+sourceFolder" target="_blank">source</a>
      </small>
    </h2>
  </div>
</template>

<script>
  export default {
    props: ['text', 'sourceFolder'],
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
