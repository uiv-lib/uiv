<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <a name="dropdown" class="anchor"></a>
        <h2 class="page-header">Dropdown</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <dropdown id="dropdown-1" ref="dropdown1">
          <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
            <span>Dropdown 1</span>
            <span class="caret"></span>
          </button>
          <ul slot="dropdown" class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </dropdown>
        <dropdown id="dropdown-2">
          <button data-role="trigger" class="btn btn-primary dropdown-toggle" type="button">
            <span>Dropdown 2</span>
            <span class="caret"></span>
          </button>
          <ul slot="dropdown" class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </dropdown>
        <!-- Split button -->
        <dropdown id="dropdown-3" class="btn-group">
          <button type="button" class="btn btn-danger">Split Button</button>
          <button type="button" class="btn btn-danger dropdown-toggle" data-role="trigger">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul slot="dropdown" class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </dropdown>
      </div>
      <div class="col-md-6">
        <h4>Note</h4>
        <ul>
          <li>
            <p>Use as the original Bootstrap style.</p>
          </li>
          <li>
            <p>The element attached with <code>data-role="trigger"</code> will be the dropdown trigger.</p>
          </li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li>
            <p>
              <code>tag:String</code>
              <span>The HTML tag that render the dropdown component. Default: 'span'. Support: 'div' / 'li' / 'span'</span>
            </p>
          </li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li>
            <p>
              <code>dropdown</code>
              <span>Replace as the dropdown body</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <tabs class="tab-docs">
          <tab title="HTML">
            <pre><code>
&lt;dropdown id=&quot;dropdown-1&quot; ref=&quot;dropdown1&quot;&gt;
  &lt;button data-role=&quot;trigger&quot; class=&quot;btn btn-default dropdown-toggle&quot; type=&quot;button&quot;&gt;
    &lt;span&gt;Dropdown 1&lt;/span&gt;
    &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul slot=&quot;dropdown&quot; class=&quot;dropdown-menu&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role=&quot;separator&quot; class=&quot;divider&quot;&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/dropdown&gt;
&lt;dropdown id=&quot;dropdown-2&quot;&gt;
  &lt;button data-role=&quot;trigger&quot; class=&quot;btn btn-primary dropdown-toggle&quot; type=&quot;button&quot;&gt;
    &lt;span&gt;Dropdown 2&lt;/span&gt;
    &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul slot=&quot;dropdown&quot; class=&quot;dropdown-menu&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role=&quot;separator&quot; class=&quot;divider&quot;&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/dropdown&gt;
&lt;!-- Split button --&gt;
&lt;dropdown id=&quot;dropdown-3&quot; class=&quot;btn-group&quot;&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;Split Button&lt;/button&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-danger dropdown-toggle&quot; data-role=&quot;trigger&quot;&gt;
    &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;
    &lt;span class=&quot;sr-only&quot;&gt;Toggle Dropdown&lt;/span&gt;
  &lt;/button&gt;
  &lt;ul slot=&quot;dropdown&quot; class=&quot;dropdown-menu&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role=&quot;separator&quot; class=&quot;divider&quot;&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/dropdown&gt;
        </code></pre>
          </tab>
        </tabs>
      </div>
    </div>
  </section>
</template>

<script>
  import Dropdown from './../components/Dropdown.vue'
  import Tabs from './../components/Tabs.vue'
  import Tab from './../components/Tab.vue'

  export default {
    components: {Dropdown, Tab, Tabs}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
