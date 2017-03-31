<template>
  <div>
    <h2 class="page-header">
      <span>{{text}}</span>
      <small v-if="sourceFolder">
        &nbsp;
        <a :href="'https://github.com/wxsms/uiv/tree/master/src/components/'+sourceFolder" target="_blank">
          <i class="glyphicon glyphicon-share"></i>
          Source
        </a>
      </small>
    </h2>
  </div>
</template>

<script>
  export default {
    props: ['text', 'sourceFolder']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
