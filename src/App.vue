<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h2 class="page-header">
          Vue Component Lib
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <tab>
          <p>test</p>
          <p>test</p>
        </tab>
      </div>
    </div>
  </div>
</template>

<script>
  import Tab from './components/Tab.vue'

  export default {
    name: 'app',
    components: {
      Tab
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
