<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.dropdown')" source-folder="dropdown"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="dropdowns">
          <dropdown ref="dropdown" :dropup="dropup" :menu-right="menuRight">
            <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
              <span>{{$t('dropdown.dropdown1')}}</span>
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
          <dropdown v-model="open2" :dropup="dropup" :menu-right="menuRight">
            <button @click="open2 = !open2" class="btn btn-primary dropdown-toggle" type="button">
              <span>{{$t('dropdown.dropdown2')}}</span>
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
          <dropdown class="btn-group" v-model="open3" :dropup="dropup" :menu-right="menuRight">
            <button type="button" class="btn btn-danger">{{$t('dropdown.splitButton')}}</button>
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
          <dropdown :append-to-body="true" v-model="open4" :dropup="dropup" :menu-right="menuRight">
            <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
              <span>{{$t('dropdown.dropdownAppendToBody')}}</span>
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
        <br/>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-xs-12">
                <label class="checkbox-inline">
                  <input v-model="dropup" type="checkbox"> {{$t('dropdown.dropup')}}
                </label>
                <label class="checkbox-inline">
                  <input v-model="menuRight" type="checkbox"> {{$t('dropdown.menuOnRight')}}
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="DropdownDoc.vue">
        <pre><code>
&lt;dropdown&gt;
  &lt;button data-role=&quot;trigger&quot; class=&quot;btn btn-default dropdown-toggle&quot; type=&quot;button&quot;&gt;
    &lt;span&gt;Dropdown 1&lt;/span&gt;
    &lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;
  &lt;/button&gt;
  &lt;template slot=&quot;dropdown&quot;&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Another action&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Something else here&lt;/a&gt;&lt;/li&gt;
    &lt;li role=&quot;separator&quot; class=&quot;divider&quot;&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#&quot;&gt;Separated link&lt;/a&gt;&lt;/li&gt;
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
  import Dropdown from '../../../src/components/dropdown/Dropdown.vue'
  import hljsMixin from '../../mixins/hljsMixin'
  import ApiPanel from '../architecture/ApiPanel.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Dropdown, ApiPanel},
    data () {
      return {
        api: {
          notes: [
            'The element attached with <code>data-role="trigger"</code> will be the dropdown trigger, use <code>v-model</code> instead if you want manual control.'
          ],
          props: [
            {
              name: 'v-model',
              type: 'Boolean',
              desc: 'Show / hide the dropdown.'
            },
            {
              name: 'tag',
              type: 'String',
              'default': 'div',
              desc: 'The HTML tag that render the dropdown component.'
            },
            {
              name: 'append-to-body',
              type: 'Boolean',
              'default': false,
              desc: 'Append the dropdown slot to body.'
            },
            {
              name: 'dropup',
              type: 'Boolean',
              'default': false,
              desc: 'Use dropup style.'
            },
            {
              name: 'menu-right',
              type: 'Boolean',
              'default': false,
              desc: 'Use dropdown-menu-right style.'
            },
            {
              name: 'not-close-elements',
              type: 'Array',
              desc: 'Pass an array of element which the dropdown will not close on click.'
            },
            {
              name: 'position-element',
              'default': 'this.$el',
              desc: 'Pass an HTML element which the dropdown will be positioned by (in append-to-body mode).'
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
        dropup: false,
        menuRight: false,
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
    .dropdown, .dropup {
      display: inline-block;
    }
  }
</style>
