<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Tabs" source-folder="tabs"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Basic Example</h3>
        <div class="well">
          <button type="button" id="tabs-btn-1" class="btn btn-default" @click="selectTab(0)">Active Tab 1</button>
          <button type="button" id="tabs-btn-2" class="btn btn-default" @click="selectTab(1)">Active Tab 2</button>
          <button type="button" id="tabs-btn-3" class="btn btn-default" @click="thirdTabDisabled=!thirdTabDisabled">
            Enable / Disable Tab 3
          </button>
          <button type="button" id="tabs-btn-4" class="btn btn-default" @click="justified=!justified">
            Justified Style
          </button>
        </div>
        <tabs ref="tabComponent" :justified="justified">
          <tab title="Tab 1">
            <p>This is tab 1.</p>
          </tab>
          <tab title="Tab 2">
            <p>Tab 2 goes here.</p>
          </tab>
          <tab :title="thirdTabDisabled?'Tab 3 (Disabled)':'Tab 3 (Enabled)'" :disabled="thirdTabDisabled">
            <p>This tab can be enable / disable.</p>
          </tab>
        </tabs>
        <h3>Advanced</h3>
        <tabs @after-active="afterTabActive">
          <tab title="<i class='glyphicon glyphicon-heart'></i> HTML Title" :html-title="true">
            <p>This tab has a HTML title.</p>
          </tab>
          <tab title="Tab with Callback">
            <p>This tab has a callback function after selected.</p>
          </tab>
          <tab title="Tab in Group 1" group="Tab Group">
            <p>This is Tab in group 1.</p>
          </tab>
          <tab title="Tab in Group 2" group="Tab Group">
            <p>This is Tab in group 2.</p>
          </tab>
          <form slot="rightside" class="form-inline" @click.stop.prevent>
              <label>Something rightside</label>
              <select class="form-control">
                <option>option1</option>
                <option>option2</option>
                <option>option3</option>
                <option>option4</option>
              </select>
            <button type="button" class="btn btn-success">Button</button>
          </form>
        </tabs>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="TabsDoc.vue">
        <pre><code>
&lt;tabs&gt;
  &lt;tab&gt;...&lt;/tab&gt;
  &lt;tab&gt;...&lt;/tab&gt;
&lt;/tabs&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">API</h3>
        <h4>Props (Tabs)</h4>
        <ul>
          <li><p><code>justified: Boolean</code> Use justified style. Default: false.</p></li>
        </ul>
        <h4>Methods (Tabs)</h4>
        <ul>
          <li><p><code>select (index: Number)</code> Select tab by index.</p></li>
        </ul>
        <h4>Props (Tab)</h4>
        <ul>
          <li><p><code>title: String</code> The tab title</p></li>
          <li><p><code>htmlTitle: Boolean</code> Use HTML title. Default: false.</p></li>
          <li><p><code>disabled: Boolean</code> Disable the tab. Default: false.</p></li>
          <li><p><code>group: String</code> Tabs nav with same group will in a dropdown list.</p></li>
        </ul>
        <h4>Slots</h4>
        <ul>
		      <li><p><code>defalut</code> The tab content.</p></li>
          <li><p><code>rightside</code> The snip at rightside of tabbar.</p></li>
        </ul>
        <h4>Events (Tabs)</h4>
        <ul>
          <li><p><code>after-active (index: Number)</code> Fire after tab active.</p></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodeBlock from '../architecture/DemoCodeBlock.vue'
  import Tabs from '../../components/tabs/Tabs.vue'
  import Tab from '../../components/tabs/Tab.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {
      AnchorHeader, DemoCodeBlock, Tabs, Tab
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
        if (index === 1) {
          window.alert('You clicked on a tab that has callback function!')
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
