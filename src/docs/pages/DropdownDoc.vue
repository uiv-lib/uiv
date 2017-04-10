<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Dropdown" source-folder="dropdown"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Basic Example</h3>
        <div class="dropdowns well">
          <dropdown v-model="open1" ref="dropdown">
            <button @click="open1 = !open1" class="btn btn-default dropdown-toggle" type="button">
              <span>Dropdown 1</span>
              <span class="caret"></span>
            </button>
            <template slot="dropdown">
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </dropdown>
          <dropdown v-model="open2">
            <button @click="open2 = !open2" class="btn btn-primary dropdown-toggle" type="button">
              <span>Dropdown 2</span>
              <span class="caret"></span>
            </button>
            <template slot="dropdown">
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </dropdown>
          <dropdown class="btn-group" v-model="open3">
            <button type="button" class="btn btn-danger">Split Button</button>
            <button type="button" class="btn btn-danger dropdown-toggle" @click="open3 = !open3">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <template slot="dropdown">
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </dropdown>
        </div>
        <h3>Append to Body</h3>
        <div class="dropdowns well">
          <dropdown :append-to-body="true" v-model="open4">
            <button @click="open4 = !open4" class="btn btn-default dropdown-toggle" type="button">
              <span>Dropdown</span>
              <span class="caret"></span>
            </button>
            <template slot="dropdown">
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </dropdown>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="DropdownDoc.vue">
        <pre><code>
&lt;dropdown v-model=&quot;open&quot;&gt;
  &lt;button @click=&quot;open = !open&quot; class=&quot;btn btn-default dropdown-toggle&quot; type=&quot;button&quot;&gt;
    &lt;span&gt;Dropdown&lt;/span&gt;
    &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;template slot=&quot;dropdown&quot;&gt;
    &lt;li&gt;&lt;a role=&quot;button&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a role=&quot;button&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a role=&quot;button&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role=&quot;separator&quot; class=&quot;divider&quot;&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a role=&quot;button&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
  &lt;/template&gt;
&lt;/dropdown&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">API</h3>
        <h4>Props</h4>
        <ul>
          <li>
            <p><code>v-model: Boolean</code><span> Show / hide the dropdown. Default: false</span></p>
          </li>
          <li>
            <p><code>tag: String</code><span> The HTML tag that render the dropdown component. Default: 'div'</span></p>
          </li>
          <li>
            <p><code>append-to-body: Boolean</code><span> Append the dropdown slot to body. Default: false</span></p>
          </li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li><p><code>dropdown</code><span> Replace as the dropdown body.</span></p></li>
          <li><p><code>default</code><span> Replace as the rest of the component (e.g. trigger stuffs).</span></p></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodeBlock from '../architecture/DemoCodeBlock.vue'
  import Dropdown from '../../components/dropdown/Dropdown.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodeBlock, Dropdown},
    data () {
      return {
        open1: false,
        open2: false,
        open3: false,
        open4: false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .dropdowns {
    .dropdown {
      display: inline-block;
    }
  }
</style>
