<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h2 class="page-header">
          Demo
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p>
          <button type="button" class="btn btn-default" @click="activeTabIndex=0">Active Tab 1</button>
          <button type="button" class="btn btn-default" @click="activeTabIndex=1">Active Tab 2</button>
          <button type="button" class="btn btn-default" @click="thirdTabDisabled=!thirdTabDisabled">
            Enable / Disable Tab 3
          </button>
        </p>
        <tabs :active.sync="activeTabIndex">
          <tab title="Tab 1">
            <p>This is tab 1.</p>
          </tab>
          <tab title="Tab 2">
            <p>Tab 2 goes here.</p>
          </tab>
          <tab :title="thirdTabDisabled?'Tab 3 (Disabled)':'Tab 3 (Enabled)'" :disabled="thirdTabDisabled">
            <p>This tab can be enable / disable.</p>
          </tab>
          <tab title="<i class='glyphicon glyphicon-heart'></i> HTML Title" :html-title="true">
            <p>This tab has a HTML title.</p>
          </tab>
          <tab title="Tab with callback" :after-active="afterTabActive">
            <p>This tab has a callback function after selected.</p>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import Tabs from './components/Tabs.vue'
  import Tab from './components/Tab.vue'

  export default {
    name: 'app',
    components: {
      Tabs, Tab
    },
    data () {
      return {
        activeTabIndex: 0,
        thirdTabDisabled: true
      }
    },
    methods: {
      afterTabActive () {
        window.alert('You clicked on a tab that has callback function!')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
