<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Tooltip" source-folder="tooltip"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Basic Example</h3>
        <tooltip text="Static tooltip content goes here.">
          <button type="button" class="btn btn-default">Hover Me!</button>
        </tooltip>
        <h3>Dynamic Example</h3>
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
                <label>Enable / Disable Tooltip</label>
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
                <label>Tooltip Text (Support HTML)</label>
                <input type="text" class="form-control" v-model="text">
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
                    <span>Toggle 1</span>
                  </button>
                  <button class="btn btn-default" @click="open2 = !open2">
                    <span>Toggle 2</span>
                  </button>
                  <button class="btn btn-default" @click="open3 = !open3">
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
        <demo-code-block demo-file="TooltipDoc.vue">
        <pre><code>
&lt;tooltip text=&quot;Static tooltip content goes here.&quot;&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;Hover Me!&lt;/button&gt;
&lt;/tooltip&gt;
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
            <p>
              <code>tag: String</code>
              <span>The HTML tag that render the component. Default: 'span'.</span>
            </p>
          </li>
          <li><p><code>v-model: Boolean</code> Show / hide the tooltip.</p></li>
          <li><p><code>text: String</code> The tooltip content, support HTML string.</p></li>
          <li><p><code>enable: Boolean</code> Enable the tooltip. Default: true.</p></li>
          <li>
            <p>
              <code>placement: String</code>
              The tooltip placement, support top / right / bottom / left. Default: top.
            </p>
          </li>
          <li>
            <p>
              <code>auto-placement: Boolean</code>
              Try to auto adjust the content placement if the set one does not have enough space to show. Try order:
              top -> right -> bottom -> left, and use the set one if none of these matched. Default: true.
            </p>
          </li>
          <li>
            <p>
              <code>trigger: String</code>
              The tooltip trigger event, support:
            </p>
            <ul>
              <li><p>hover -> show on mouseenter, hide on mouseleave</p></li>
              <li><p>focus -> show on focus, hide on blur</p></li>
              <li><p>hover-focus -> combination of hover and focus trigger (Default)</p></li>
              <li><p>click -> toggle on trigger click</p></li>
              <li><p>outside-click -> same as click, but not close on tooltip click and close on outside click</p></li>
              <li><p>manual -> do not add event listeners, and controls only by v-model change</p></li>
            </ul>
          </li>
          <li><p><code>append-to: String</code> Element selector that the tooltip append to. Default: body.</p></li>
          <li>
            <p>
              <code>transition-duration: Number</code>
              The tooltip show / hide transition time in ms. Default: 150.
            </p>
          </li>
        </ul>
        <h4>Events</h4>
        <ul>
          <li><p><code>tooltip-show</code> Fire after tooltip show.</p></li>
          <li><p><code>tooltip-hide</code> Fire after tooltip hide.</p></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodeBlock from '../architecture/DemoCodeBlock.vue'
  import Tooltip from '../../components/tooltip/Tooltip.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodeBlock, Tooltip},
    data () {
      return {
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
