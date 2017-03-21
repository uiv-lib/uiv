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
          <button type="button" class="btn btn-default" v-tooltip="'Static tooltip content goes here.'">Hover Me!
          </button>
        </div>
        <h3>Dynamic Example</h3>
        <div class="well">
          <div>
            <button type="button" class="btn btn-default" v-tooltip="options">Tooltip Sample</button>
            <button type="button" class="btn btn-default" v-tooltip="options">Another Sample</button>
          </div>
          <br/>
          <div>
            <input type="text" class="form-control" v-tooltip="options" placeholder="An input samle">
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
        <h4>Note</h4>
        <ul>
          <li>
            <p>
              Tooltip is a directive, you should install before use. See ES6 or Browser sample in
              <a href="#getting-started">Getting Started</a>
            </p>
          </li>
          <li><p>Support HTML tooltip content;</p></li>
          <li><p>Pass a simple string to use all default options;</p></li>
          <li><p>Pass an object for options override.</p></li>
        </ul>
        <h4>Options</h4>
        <ul>
          <li><p><code>text:String</code> The tooltip content.</p></li>
          <li><p><code>enable:Boolean</code> Enable the tooltip. Default: true.</p></li>
          <li>
            <p>
              <code>placement:String</code>
              The tooltip placement, support top / bottom / left / right. Default: top.
            </p>
          </li>
          <li>
            <p>
              <code>trigger:String</code>
              The tooltip toggle trigger event type, support hover / focus / click. Default: hover.
            </p>
          </li>
          <li><p><code>appendTo:String</code> Element selector that the tooltip append to. Default: body.</p></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="TooltipDoc.vue">
        <pre><code>
&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; v-tooltip=&quot;'...'&quot;&gt;Hover Me!&lt;/button&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'

  export default {
    components: {AnchorHeader, DemoCodeBlock},
    data () {
      return {
        text: 'Some helpful text',
        placement: 'top',
        trigger: 'hover',
        enable: true
      }
    },
    computed: {
      options () {
        return {
          text: this.text,
          placement: this.placement,
          enable: this.enable,
          trigger: this.trigger
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
