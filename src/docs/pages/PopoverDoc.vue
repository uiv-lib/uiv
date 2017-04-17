<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Popover" source-folder="popover"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div>
          <popover :title="title"
                   :placement="placement"
                   :auto-placement="autoPlacement"
                   :trigger="trigger"
                   :enable="enable"
                   v-model="open1"
                   ref="popover">
            <button type="button" class="btn btn-default" data-role="trigger">Dynamic Popover</button>
            <div slot="popover">
              <h1>Hello world!</h1>
            </div>
          </popover>
          <popover :title="title"
                   :placement="placement"
                   :auto-placement="autoPlacement"
                   :trigger="trigger"
                   v-model="open2"
                   :enable="enable">
            <button type="button" class="btn btn-default" data-role="trigger">Functional Popover</button>
            <div slot="popover">
              <form>
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" class="form-control" v-model="title">
                </div>
              </form>
            </div>
          </popover>
        </div>
        <br/>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-md-3 col-sm-6">
                <label>Enable / Disable Popover</label>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="enable"> Enable
                  </label>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <label>Auto Adjust Placement</label>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="autoPlacement"> Enable
                  </label>
                </div>
              </div>
              <div class="col-md-6">
                <label>Title</label>
                <input type="text" class="form-control" v-model="title">
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>Placement</label>
                <select class="form-control" v-model="placement">
                  <option>top</option>
                  <option>right</option>
                  <option>left</option>
                  <option>bottom</option>
                </select>
              </div>
              <div class="col-md-6">
                <label>Trigger</label>
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
                  <button class="btn btn-default" @click="open1 = !open1">
                    <span>Toggle Popover 1</span>
                  </button>
                  <button class="btn btn-default" @click="open2 = !open2">
                    <span>Toggle Popover 2</span>
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
        <demo-code-panel demo-file="PopoverDoc.vue">
        <pre><code>
&lt;popover title=&quot;Popover Title&quot;&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; data-role=&quot;trigger&quot;&gt;Popover Trigger&lt;/button&gt;
  &lt;div slot=&quot;popover&quot;&gt;
    &lt;h1&gt;Hello world!&lt;/h1&gt;
  &lt;/div&gt;
&lt;/popover&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="popover" file="Popover.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import Popover from '../../components/popover/Popover.vue'
  import hljsMixin from './../mixins/hljsMixin'
  import ApiPanel from './../architecture/ApiPanel.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Popover, ApiPanel},
    data () {
      return {
        api: {
          notes: [
            'The element attached with <code>data-role="trigger"</code> will be the popover trigger'
          ],
          props: [
            {
              name: 'v-model',
              desc: 'Show / hide the popover',
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
              name: 'title',
              desc: 'The popover title',
              type: 'String'
            },
            {
              name: 'enable',
              desc: 'Enable the popover',
              type: 'Boolean',
              'default': 'true'
            },
            {
              name: 'placement',
              desc: 'The popover placement, support top / bottom / left / right',
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
<p>The popover trigger event, support:</p>
<ul>
  <li><p>hover -> show on mouseenter, hide on mouseleave</p></li>
  <li><p>focus -> show on focus, hide on blur</p></li>
  <li><p>hover-focus -> combination of hover and focus trigger</p></li>
  <li><p>click -> toggle on trigger click</p></li>
  <li><p>outside-click -> same as click, but not close on popover click and close on outside click</p></li>
  <li><p>manual -> do not add event listeners, and controls only by v-model change</p></li>
</ul>
              `,
              type: 'String',
              'default': 'outside-click'
            },
            {
              name: 'append-to',
              desc: 'Element selector that the popover append to',
              type: 'String',
              'default': 'body'
            },
            {
              name: 'transition-duration',
              desc: 'The popover show / hide transition time in ms',
              type: 'Number',
              'default': '150'
            }
          ],
          slots: [
            {
              name: 'popover',
              desc: 'Replace as the popover body'
            },
            {
              name: 'default',
              desc: 'Replace as the rest of the component (e.g. trigger stuffs)'
            }
          ],
          events: [
            {
              name: 'show',
              desc: 'Fire after popover show'
            },
            {
              name: 'hide',
              desc: 'Fire after popover hide'
            }
          ]
        },
        enable: true,
        title: 'Popover Title',
        trigger: 'outside-click',
        placement: 'top',
        autoPlacement: true,
        open1: false,
        open2: false
      }
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
