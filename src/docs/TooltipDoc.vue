<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Tooltip" source-folder="tooltip"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h3>Simple Static Example</h3>
        <div class="well">
          <tooltip text="Static tooltip content goes here.">
            <button type="button" class="btn btn-default">Hover Me!</button>
          </tooltip>
        </div>
        <h3>Dynamic Example</h3>
        <div class="well">
          <div>
            <tooltip :text="text" :placement="placement" :trigger="trigger" :enable="enable">
              <button type="button" class="btn btn-default">Tooltip Sample</button>
            </tooltip>
            <tooltip :text="text" :placement="placement" :trigger="trigger" :enable="enable">
              <button type="button" class="btn btn-default">Another Sample</button>
            </tooltip>
          </div>
          <br/>
          <div>
            <tooltip :text="text" :placement="placement" :trigger="trigger" :enable="enable">
              <input type="text" class="form-control" placeholder="An input samle">
            </tooltip>
          </div>
          <br/>
          <form>
            <div class="form-group">
              <label>Enable / Disable</label>
              <div class="checkbox">
                <label>
                  <input type="checkbox" v-model="enable"> Enable Tooltips
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Tooltip Text (Support HTML)</label>
              <input type="text" class="form-control" v-model="text">
            </div>
            <div class="form-group">
              <label>Placement</label>
              <select class="form-control" v-model="placement">
                <option>top</option>
                <option>bottom</option>
                <option>left</option>
                <option>right</option>
              </select>
            </div>
            <div class="form-group">
              <label>Trigger</label>
              <select class="form-control" v-model="trigger">
                <option>hover</option>
                <option>focus</option>
                <option>click</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
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
              The tooltip trigger event, support hover / focus / click. Default: hover.
            </p>
          </li>
          <li><p><code>append-to: String</code> Element selector that the tooltip append to. Default: body.</p></li>
        <li>
          <p>
            <code>transition-duration: Number</code>
            The tooltip show / hide transition time in ms. Default: 150.
          </p>
        </li>
        </ul>
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
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'
  import Tooltip from './../components/tooltip/Tooltip.vue'

  export default {
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
