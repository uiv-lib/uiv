# Popover

> Add small overlays of content, like those on the iPad, to any element for housing secondary information.

## Example

The element attached with `data-role="trigger"` will be the popover trigger.

```html
<template>
  <popover v-model="open1" :title="title" :placement="placement" :auto-placement="autoPlacement" :trigger="trigger" :enable="enable" ref="popover">
    <button type="button" class="btn btn-default" data-role="trigger">Popover</button>
    <div slot="popover">
      <h1>Hello world!</h1>
    </div>
  </popover>
  <popover v-model="open2" :title="title" :placement="placement" :auto-placement="autoPlacement" :trigger="trigger" :enable="enable">
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
  <hr/>
  <h4>Settings</h4>
  <form class="form-horizontal">
    <div class="form-group">
      <div class="col-md-3 col-sm-6">
        <label>Enable / Disable Popover</label>
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
          <button class="btn btn-default" type="button" @click="open1 = !open1">
            <span>Toggle Popover 1</span>
          </button>
          <button class="btn btn-default" type="button" @click="open2 = !open2">
            <span>Toggle Popover 2</span>
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
<!-- Live demo -->
```

# API Reference

## [Popover.vue](https://github.com/wxsms/uiv/tree/master/src/components/popover/Popover.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Note</span></td>
    </tr>
    <tr>
      <td colspan="5">The element attached with <code>data-role="trigger"</code>
        will be the popover trigger
      </td>
    </tr>
    </tbody>
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
      <td>Show / hide the popover</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>tag</code></td>
      <td>String</td>
      <td>span</td>
      <td></td>
      <td>The HTML tag that render the component</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>title</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>The popover title</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>enable</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Enable the popover</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>placement</code></td>
      <td>String</td>
      <td>top</td>
      <td></td>
      <td>The popover placement, support top / bottom / left / right</td>
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
      <td>outside-click</td>
      <td></td>
      <td>
        <p>The popover trigger event, support:</p>
        <ul>
          <li><p>hover -&gt; show on mouseenter, hide on mouseleave</p></li>
          <li><p>focus -&gt; show on focus, hide on blur</p></li>
          <li><p>hover-focus -&gt; combination of hover and focus trigger</p></li>
          <li><p>click -&gt; toggle on trigger click</p></li>
          <li><p>outside-click -&gt; same as click, but not close on popover click and close on outside click</p></li>
          <li><p>manual -&gt; do not add event listeners, and controls only by v-model change</p></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>append-to</code></td>
      <td>String</td>
      <td>body</td>
      <td></td>
      <td>Element selector that the popover append to</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>transition-duration</code></td>
      <td>Number</td>
      <td>150</td>
      <td></td>
      <td>The popover show / hide transition time in ms</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>target</code></td>
      <td>HTMLElement</td>
      <td></td>
      <td></td>
      <td>
        Use this prop to specify an HTML Element as the popover trigger, useful when not able to use parent-child structure.
      </td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Slots</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th colspan="4">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>popover</code></td>
      <td colspan="4">Replace as the popover body</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">Replace as the rest of the component (e.g. trigger stuffs)</td>
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
      <td colspan="3">Fire after popover show</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>hide</code></td>
      <td></td>
      <td colspan="3">Fire after popover hide</td>
    </tr>
    </tbody>
  </table>
</div>


<!-- Live demo script
<script>
  export default {
    data () {
      return {
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
-->
