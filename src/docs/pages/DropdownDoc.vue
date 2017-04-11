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
        <demo-code-panel demo-file="DropdownDoc.vue">
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
        </demo-code-panel>
        <api-panel :api="api" folder="dropdown" file="Dropdown.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import Dropdown from '../../components/dropdown/Dropdown.vue'
  import hljsMixin from './../mixins/hljsMixin'
  import ApiPanel from './../architecture/ApiPanel.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Dropdown, ApiPanel},
    data () {
      return {
        api: {
          props: [
            {
              name: 'v-model',
              type: 'Boolean',
              'default': false,
              desc: 'Show / hide the dropdown',
              required: true
            },
            {
              name: 'tag',
              type: 'String',
              'default': 'div',
              desc: 'The HTML tag that render the dropdown component'
            },
            {
              name: 'append-to-body',
              type: 'Boolean',
              'default': false,
              desc: 'Append the dropdown slot to body'
            }
          ],
          slots: [
            {
              name: 'dropdown',
              desc: 'Replace as the dropdown body'
            },
            {
              name: 'default',
              desc: 'Replace as the rest of the component (e.g. trigger stuffs)'
            }
          ]
        },
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
