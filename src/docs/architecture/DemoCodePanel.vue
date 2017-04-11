<template>
  <div class="panel panel-default">
    <div class="panel-heading clearfix">
      <span>Code</span>
      <a v-if="demoFile" class="pull-right"
         :href="'https://github.com/wxsms/uiv/blob/master/src/docs/pages/'+demoFile">
        <i class="glyphicon glyphicon-share"></i>
        <span>Demo Source</span>
      </a>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['demoFile']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .panel {
    pre {
      border: none;
      padding: 0;
    }
  }
</style>
