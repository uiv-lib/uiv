<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.tabs')" source-folder="tabs"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">{{$t('common.basicExample')}}</h3>
        <div class="well">
          <button type="button" id="tabs-btn-1" class="btn btn-default" @click="tabIndex = 0">
            {{$t('tabs.activeTab')}} 1
          </button>
          <button type="button" id="tabs-btn-2" class="btn btn-default" @click="tabIndex = 1">
            {{$t('tabs.activeTab')}} 2
          </button>
          <button type="button" id="tabs-btn-3" class="btn btn-default" @click="thirdTabDisabled=!thirdTabDisabled">
            <span>{{$t('tabs.enableOrDisable')}} 3</span>
          </button>
          <button type="button" id="tabs-btn-4" class="btn btn-default" @click="justified=!justified">
            <span>{{$t('tabs.justifiedStyle')}}</span>
          </button>
        </div>
        <tabs ref="tabComponent" :justified="justified" v-model="tabIndex" @change="afterTabActive">
          <tab title="Tab 1">
            <p>This is tab 1.</p>
          </tab>
          <tab title="Tab 2">
            <p>Tab 2 goes here.</p>
          </tab>
          <tab :title="thirdTabDisabled?'Tab 3 (Disabled)':'Tab 3 (Enabled)'" :disabled="thirdTabDisabled">
            <p>This tab can be enable / disable.</p>
          </tab>
          <tab title="Tab in Group 1" group="Tab Group">
            <p>This is Tab in group 1.</p>
          </tab>
          <tab title="Tab in Group 2" group="Tab Group">
            <p>This is Tab in group 2.</p>
          </tab>
          <tab title="<i class='glyphicon glyphicon-bell'></i> Alert!" :html-title="true">
            <p>This tab has a HTML and callback function.</p>
          </tab>
        </tabs>
        <h3 class="page-header">{{$t('tabs.withSlot')}}</h3>
        <tabs>
          <tab title="Tab 1">
            <p>This is tab 1.</p>
          </tab>
          <tab title="Tab 2">
            <p>Tab 2 goes here.</p>
          </tab>
          <form slot="nav-right">
            <select class="form-control" style="display: inline-block;width: auto">
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
        <br/>
        <demo-code-panel demo-file="TabsDoc.vue">
        <pre><code>
&lt;tabs&gt;
  &lt;tab&gt;...&lt;/tab&gt;
  &lt;tab&gt;...&lt;/tab&gt;
&lt;/tabs&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="tabsApi" folder="tabs" file="Tabs.vue"></api-panel>
        <api-panel :api="tabApi" folder="tabs" file="Tab.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import Tabs from '../../../src/components/tabs/Tabs.vue'
  import Tab from '../../../src/components/tabs/Tab.vue'
  import hljsMixin from '../../mixins/hljsMixin'
  import ApiPanel from '../architecture/ApiPanel.vue'

  export default {
    mixins: [hljsMixin],
    components: {
      AnchorHeader, DemoCodePanel, Tabs, Tab, ApiPanel
    },
    data () {
      return {
        tabsApi: {
          props: [
            {
              name: 'v-model',
              desc: 'The current tab index, use this to manual change tab index.',
              type: 'Number'
            },
            {
              name: 'justified',
              desc: 'Use justified style.',
              type: 'Boolean',
              'default': 'false'
            }
          ],
          slots: [
            {
              name: 'default',
              desc: 'The tabs content.'
            },
            {
              name: 'nav-right',
              desc: 'The snip at right side of tab nav. Note: it won\'t display if using justified style.'
            }
          ],
          events: [
            {
              name: 'change',
              desc: 'Fire after active tab changed, with the active index.',
              params: ['index']
            }
          ]
        },
        tabApi: {
          props: [
            {
              name: 'title',
              desc: 'The tab title.',
              type: 'String'
            },
            {
              name: 'html-title',
              desc: 'Use HTML title.',
              'default': 'false',
              type: 'Boolean'
            },
            {
              name: 'disabled',
              desc: 'Disable the tab.',
              'default': 'false',
              type: 'Boolean'
            },
            {
              name: 'group',
              desc: 'Tabs nav with same group will in a dropdown list.',
              type: 'String'
            },
            {
              name: 'pull-right',
              desc: 'Add <code>pull-right</code> class to the tab nav. A grouped tab will be pull to right if one of its sub-tabs has this prop set to <code>true</code>.',
              'default': 'false',
              type: 'Boolean'
            }
          ]
        },
        activeTab: {index: 0},
        thirdTabDisabled: true,
        justified: false,
        tabIndex: 0
      }
    },
    methods: {
      afterTabActive (index) {
        if (index === 5) {
          window.alert('You clicked on a tab that has callback function!')
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
