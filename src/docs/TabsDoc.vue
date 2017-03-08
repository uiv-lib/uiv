<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <h2 class="page-header">Tabs</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p>
          <button type="button" class="btn btn-default" @click="selectTab(0)">Active Tab 1</button>
          <button type="button" class="btn btn-default" @click="selectTab(1)">Active Tab 2</button>
          <button type="button" class="btn btn-default" @click="thirdTabDisabled=!thirdTabDisabled">
            Enable / Disable Tab 3
          </button>
        </p>
        <p>
          <button type="button" class="btn btn-default" @click="justified=!justified">
            Enable / Disable Justified Style
          </button>
        </p>
        <tabs ref="tabComponent" :justified="justified" @after-active="afterTabActive">
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
          <tab title="Tab with callback">
            <p>This tab has a callback function after selected.</p>
          </tab>
        </tabs>
      </div>
    </div>
  </section>
</template>

<script>
  import Tabs from './../components/Tabs.vue'
  import Tab from './../components/Tab.vue'

  export default {
    components: {
      Tabs, Tab
    },
    data () {
      return {
        activeTab: {index: 0},
        thirdTabDisabled: true,
        justified: false
      }
    },
    methods: {
      selectTab (index) {
        this.$refs.tabComponent.select(index)
      },
      afterTabActive (index) {
        if (index === 4) {
          window.alert('You clicked on a tab that has callback function!')
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
