<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <h2 class="page-header">
          <a name="tabs">Tabs</a>
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <p>
          <button type="button" id="tabs-btn-1" class="btn btn-default" @click="selectTab(0)">Active Tab 1</button>
          <button type="button" id="tabs-btn-2" class="btn btn-default" @click="selectTab(1)">Active Tab 2</button>
          <button type="button" id="tabs-btn-3" class="btn btn-default" @click="thirdTabDisabled=!thirdTabDisabled">
            Enable / Disable Tab 3
          </button>
        </p>
        <p>
          <button type="button" id="tabs-btn-4" class="btn btn-default" @click="justified=!justified">
            Enable / Disable Justified Style
          </button>
        </p>
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
        <br/>
        <tabs @after-active="afterTabActive">
          <tab title="<i class='glyphicon glyphicon-heart'></i> HTML Title" :html-title="true">
            <p>This tab has a HTML title.</p>
          </tab>
          <tab title="Tab with callback">
            <p>This tab has a callback function after selected.</p>
          </tab>
          <tab title="Tab in group 1" group="Tab Group">
            <p>This is Tab in group 1.</p>
          </tab>
          <tab title="Tab in group 2" group="Tab Group">
            <p>This is Tab in group 2.</p>
          </tab>
        </tabs>
      </div>
      <div class="col-md-6">
        <h4>Props (Tabs)</h4>
        <ul>
          <li><p><code>justified:Boolean</code> Use justified style. Default: false.</p></li>
        </ul>
        <h4>Methods (Tabs)</h4>
        <ul>
          <li><p><code>select (index:Number)</code> Select tab by index.</p></li>
        </ul>
        <h4>Props (Tab)</h4>
        <ul>
          <li><p><code>title:String</code> The tab title</p></li>
          <li><p><code>htmlTitle:Boolean</code> Use HTML title. Default: false.</p></li>
          <li><p><code>disabled:Boolean</code> Disable the tab. Default: false.</p></li>
          <li><p><code>group:String</code> Tabs nav with same group will in a dropdown list.</p></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <tabs class="tab-docs">
          <tab title="HTML">
            <pre><code>
  &lt;p&gt;
    &lt;button type=&quot;button&quot; id=&quot;tabs-btn-1&quot; class=&quot;btn btn-default&quot; @click=&quot;selectTab(0)&quot;&gt;Active Tab 1&lt;/button&gt;
    &lt;button type=&quot;button&quot; id=&quot;tabs-btn-2&quot; class=&quot;btn btn-default&quot; @click=&quot;selectTab(1)&quot;&gt;Active Tab 2&lt;/button&gt;
    &lt;button type=&quot;button&quot; id=&quot;tabs-btn-3&quot; class=&quot;btn btn-default&quot; @click=&quot;thirdTabDisabled=!thirdTabDisabled&quot;&gt;
      Enable / Disable Tab 3
    &lt;/button&gt;
  &lt;/p&gt;
  &lt;p&gt;
    &lt;button type=&quot;button&quot; id=&quot;tabs-btn-4&quot; class=&quot;btn btn-default&quot; @click=&quot;justified=!justified&quot;&gt;
      Enable / Disable Justified Style
    &lt;/button&gt;
  &lt;/p&gt;
  &lt;tabs ref=&quot;tabComponent&quot; :justified=&quot;justified&quot;&gt;
    &lt;tab title=&quot;Tab 1&quot;&gt;
      &lt;p&gt;This is tab 1.&lt;/p&gt;
    &lt;/tab&gt;
    &lt;tab title=&quot;Tab 2&quot;&gt;
      &lt;p&gt;Tab 2 goes here.&lt;/p&gt;
    &lt;/tab&gt;
    &lt;tab :title=&quot;thirdTabDisabled?'Tab 3 (Disabled)':'Tab 3 (Enabled)'&quot; :disabled=&quot;thirdTabDisabled&quot;&gt;
      &lt;p&gt;This tab can be enable / disable.&lt;/p&gt;
    &lt;/tab&gt;
  &lt;/tabs&gt;
  &lt;br/&gt;
  &lt;tabs @after-active=&quot;afterTabActive&quot;&gt;
    &lt;tab title=&quot;&lt;i class='glyphicon glyphicon-heart'&gt;&lt;/i&gt; HTML Title&quot; :html-title=&quot;true&quot;&gt;
      &lt;p&gt;This tab has a HTML title.&lt;/p&gt;
    &lt;/tab&gt;
    &lt;tab title=&quot;Tab with callback&quot;&gt;
      &lt;p&gt;This tab has a callback function after selected.&lt;/p&gt;
    &lt;/tab&gt;
    &lt;tab title=&quot;Tab in group 1&quot; group=&quot;Tab Group&quot;&gt;
      &lt;p&gt;This is Tab in group 1.&lt;/p&gt;
    &lt;/tab&gt;
    &lt;tab title=&quot;Tab in group 2&quot; group=&quot;Tab Group&quot;&gt;
      &lt;p&gt;This is Tab in group 2.&lt;/p&gt;
    &lt;/tab&gt;
  &lt;/tabs&gt;
            </code></pre>
          </tab>
          <tab title="JavaScript">
            <pre><code>
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
        if (index === 1) {
          window.alert('You clicked on a tab that has callback function!')
        }
      }
    }
            </code></pre>
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
        if (index === 1) {
          window.alert('You clicked on a tab that has callback function!')
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
