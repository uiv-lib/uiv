# Tooltip

## Example

Hover over the button below to see tooltips.

**Note**: The first element appear in `<tooltip>` node will be the trigger element.

```html
<tooltip text="Static tooltip content goes here.">
  <button type="button" class="btn btn-primary">Hover me!</button>
</tooltip>
<!-- Live demo -->
```

## With Options

```html
<template>
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
  <hr/>
  <h4>Settings</h4>
  <form class="form-horizontal">
    <div class="form-group">
      <div class="col-md-3 col-sm-6">
        <label>Enable / Disable Tooltip</label>
        <div class="checkbox">
          <label><input type="checkbox" v-model="enable"> Enable</label>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <label>Auto Adjust Placement</label>
        <div class="checkbox">
          <label><input type="checkbox" v-model="autoPlacement"> Enable</label>
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
</template>

<script>
  export default {
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
<!-- Live demo -->
```

# API Reference

## [Tooltip.vue](https://github.com/wxsms/uiv/tree/master/src/components/tooltip/Tooltip.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>v-model</code></td>
      <td>Boolean</td>
      <td></td>
      <td></td>
      <td>Show / hide the tooltip</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>tag</code></td>
      <td>String</td>
      <td>span</td>
      <td></td>
      <td>The HTML tag that render the component</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>text</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>The tooltip content, support HTML string.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>enable</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Enable the tooltip</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>placement</code></td>
      <td>String</td>
      <td>top</td>
      <td></td>
      <td>The tooltip placement, support top / bottom / left / right</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>auto-placement</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>
        Try to auto adjust the placement if the set one does not have enough space to show. Try order: right -&gt; bottom -&gt; left -&gt; top, and use the set one if none of these matched
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>trigger</code></td>
      <td>String</td>
      <td>hover-focus</td>
      <td></td>
      <td>
        <p>The tooltip trigger event, support:</p>
        <ul>
          <li><p>hover -&gt; show on mouseenter, hide on mouseleave</p></li>
          <li><p>focus -&gt; show on focus, hide on blur</p></li>
          <li><p>hover-focus -&gt; combination of hover and focus trigger</p></li>
          <li><p>click -&gt; toggle on trigger click</p></li>
          <li><p>outside-click -&gt; same as click, but not close on tooltip click and close on outside click</p></li>
          <li><p>manual -&gt; do not add event listeners, and controls only by v-model change</p></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>append-to</code></td>
      <td>String</td>
      <td>body</td>
      <td></td>
      <td>Element selector that the tooltip append to</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>transition-duration</code></td>
      <td>Number</td>
      <td>150</td>
      <td></td>
      <td>The tooltip show / hide transition time in ms</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>target</code></td>
      <td>HTMLElement</td>
      <td></td>
      <td></td>
      <td>
        Use this prop to specify an HTML Element as the tooltip trigger, useful when not able to use parent-child structure.
      </td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Events</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>show</code></td>
      <td></td>
      <td colspan="3">Fire after tooltip show.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>hide</code></td>
      <td></td>
      <td colspan="3">Fire after tooltip hide.</td>
    </tr>
    </tbody>
  </table>
</div>


<!-- Live demo script
<script>
  export default {
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
-->
