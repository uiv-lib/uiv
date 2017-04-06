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
          <tooltip :text="text" :placement="placement" :trigger="trigger" :enable="enable" ref="tooltip">
            <button type="button" class="btn btn-default">Tooltip Sample</button>
          </tooltip>
          <tooltip :text="text" :placement="placement" :trigger="trigger" :enable="enable">
            <button type="button" class="btn btn-default">Another Sample</button>
          </tooltip>
          <tooltip :text="text" :placement="placement" :trigger="trigger" :enable="enable">
            <input type="text" class="form-control" placeholder="An input samle">
          </tooltip>
        </form>
        <br/>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-md-6">
                <label>Enable / Disable</label>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="enable"> Enable Tooltips
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
                </select>
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
          <li><p><code>text: String</code> The tooltip content, support HTML string.</p></li>
          <li><p><code>enable: Boolean</code> Enable the tooltip. Default: true.</p></li>
          <li>
            <p>
              <code>placement: String</code>
              The tooltip placement, support top / bottom / left / right. Default: top.
            </p>
          </li>
          <li>
            <p>
              <code>trigger: String</code>
              The tooltip trigger event, support:
            </p>
            <ul>
              <li><p>hover -> show on mouseenter, hide on mouseleave (Default)</p></li>
              <li><p>focus -> show on focus, hide on blur</p></li>
              <li><p>hover-focus -> combination of hover and focus trigger</p></li>
              <li><p>click -> toggle on trigger click</p></li>
              <li><p>outside-click -> same as click, but not close on tooltip click and close on outside click</p></li>
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
        trigger: 'hover',
        enable: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
