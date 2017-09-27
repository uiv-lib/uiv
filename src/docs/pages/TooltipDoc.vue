<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.tooltip')" source-folder="tooltip"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">{{$t('common.basicExample')}}</h3>
        <tooltip text="Static tooltip content goes here.">
          <button type="button" class="btn btn-default">Hover Me!</button>
        </tooltip>
        <h3 class="page-header">{{$t('common.dynamicExample')}}</h3>
        <form class="form-inline">
          <tooltip :text="text" :placement="placement" :auto-placement="autoPlacement" :trigger="trigger"
                   :enable="enable" ref="tooltip" v-model="open1">
            <button type="button" class="btn btn-default">Tooltip Sample</button>
          </tooltip>
          <tooltip :text="text" :placement="placement" :auto-placement="autoPlacement" :trigger="trigger"
                   :enable="enable" v-model="open2">
            <button type="button" class="btn btn-default">Another Sample</button>
          </tooltip>
          <tooltip :text="text" :placement="placement" :auto-placement="autoPlacement" :trigger="trigger"
                   :enable="enable" v-model="open3">
            <input type="text" class="form-control" placeholder="An input samle">
          </tooltip>
        </form>
        <br/>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-md-3 col-sm-6">
                <label>{{$t('tooltip.enableOrDisable')}}</label>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="enable"> Enable
                  </label>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <label>{{$t('tooltip.autoAdjust')}}</label>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="autoPlacement"> Enable
                  </label>
                </div>
              </div>
              <div class="col-md-6">
                <label>{{$t('tooltip.text')}}</label>
                <input type="text" class="form-control" v-model="text">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>{{$t('tooltip.placement')}}</label>
                <select class="form-control" v-model="placement">
                  <option>top</option>
                  <option>right</option>
                  <option>left</option>
                  <option>bottom</option>
                </select>
              </div>
              <div class="col-md-6">
                <label>{{$t('tooltip.trigger')}}</label>
                <select class="form-control" v-model="trigger">
                  <option>hover</option>
                  <option>focus</option>
                  <option>hover-focus</option>
                  <option>click</option>
                  <option>outside-click</option>
                  <option>manual</option>
                </select>
                <div v-show="trigger === 'manual'">
                  <br/>
                  <button class="btn btn-default" type="button" @click="open1 = !open1">
                    <span>Toggle 1</span>
                  </button>
                  <button class="btn btn-default" type="button" @click="open2 = !open2">
                    <span>Toggle 2</span>
                  </button>
                  <button class="btn btn-default" type="button" @click="open3 = !open3">
                    <span>Toggle 3</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="TooltipDoc.vue">
        <pre><code>
&lt;tooltip text=&quot;Static tooltip content goes here.&quot;&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;Hover Me!&lt;/button&gt;
&lt;/tooltip&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="tooltip" file="Tooltip.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import Tooltip from '../../components/tooltip/Tooltip.vue'
  import hljsMixin from './../mixins/hljsMixin'
  import ApiPanel from './../architecture/ApiPanel.vue'

  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Tooltip, ApiPanel},
    data () {
      return {
        api: {
          notes: [
            'The first element appear in node will be the tooltip trigger.'
          ],
          props: [
            {
              name: 'v-model',
              desc: 'Show / hide the tooltip',
              type: 'Boolean',
              'default': ''
            },
            {
              name: 'tag',
              desc: 'The HTML tag that render the component',
              type: 'String',
              'default': 'span'
            },
            {
              name: 'text',
              desc: 'The tooltip content, support HTML string.',
              type: 'String'
            },
            {
              name: 'enable',
              desc: 'Enable the tooltip',
              type: 'Boolean',
              'default': 'true'
            },
            {
              name: 'placement',
              desc: 'The tooltip placement, support top / bottom / left / right',
              type: 'String',
              'default': 'top'
            },
            {
              name: 'auto-placement',
              desc: 'Try to auto adjust the placement if the set one does not have enough space to show. Try order: top -> right -> bottom -> left, and use the set one if none of these matched',
              type: 'Boolean',
              'default': 'true'
            },
            {
              name: 'trigger',
              desc: `
<p>The tooltip trigger event, support:</p>
<ul>
  <li><p>hover -> show on mouseenter, hide on mouseleave</p></li>
  <li><p>focus -> show on focus, hide on blur</p></li>
  <li><p>hover-focus -> combination of hover and focus trigger</p></li>
  <li><p>click -> toggle on trigger click</p></li>
  <li><p>outside-click -> same as click, but not close on tooltip click and close on outside click</p></li>
  <li><p>manual -> do not add event listeners, and controls only by v-model change</p></li>
</ul>
             `,
              type: 'String',
              'default': 'hover-focus'
            },
            {
              name: 'append-to',
              desc: 'Element selector that the tooltip append to',
              type: 'String',
              'default': 'body'
            },
            {
              name: 'transition-duration',
              desc: 'The tooltip show / hide transition time in ms',
              type: 'Number',
              'default': '150'
            },
            {
              name: 'target',
              desc: 'Use this prop to specify an HTML Element as the tooltip trigger, useful when not able to use parent-child structure.',
              type: 'HTMLElement'
            }
          ],
          events: [
            {
              name: 'show',
              desc: 'Fire after tooltip show.'
            },
            {
              name: 'hide',
              desc: 'Fire after tooltip hide.'
            }
          ]
        },
        text: 'Some helpful text',
        placement: 'top',
        autoPlacement: true,
        trigger: 'hover-focus',
        enable: true,
        open1: false,
        open2: false,
        open3: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
