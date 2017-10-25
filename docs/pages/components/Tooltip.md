# Tooltip

## Example

The first element appear in `<tooltip>` node will be the trigger element.

Hover over the button below to toggle tooltips.

```html
<tooltip text="Static tooltip content goes here">
  <button type="button" class="btn btn-primary">Hover me!</button>
</tooltip>
<!-- tooltip-example.vue -->
```

## Directive

You can also simply use tooltips via `v-tooltip` directive.

```html
<button v-tooltip="'Static tooltip content goes here'" type="button" class="btn btn-primary">Hover me!</button>
<!-- tooltip-directive.vue -->
```

## Placements

Supported placements:

* **top** (Default)
* **right**
* **bottom**
* **left**

```html
<button v-tooltip.left="'Tooltip content on left'" type="button" class="btn btn-primary" id="left-trigger">Left</button>
<button v-tooltip.top="'Tooltip content on top'" type="button" class="btn btn-primary" id="top-trigger">Top</button>
<button v-tooltip.bottom="'Tooltip content on bottom'" type="button" class="btn btn-primary" id="bottom-trigger">Bottom</button>
<button v-tooltip.right="'Tooltip content on right'" type="button" class="btn btn-primary" id="right-trigger">Right</button>
<!-- tooltip-placements.vue -->
```

## Auto Placement

Tooltips will try to find the best placement for displaying while `auto-placement` is set to `true` (by default) base on the default placement setting. Useful while there does not have enough space to show the entire tooltip content.

`auto-placement` try order: right -> bottom -> left -> top, and use the set one if none of these matched.

## Triggers

Supported triggers:

* `hover` show on mouseenter, hide on mouseleave.
* `focus` show on focus, hide on blur.
* `hover-focus` (Default) combination of hover and focus trigger.
* `click` toggle on trigger click.
* `outside-click` same as click, but not close on tooltip click and close on outside click.

```html
<button v-tooltip="'Static tooltip content'" type="button" class="btn btn-primary">Hover-Focus (Default)</button>
<button v-tooltip.hover="'Static tooltip content'" type="button" class="btn btn-primary" id="hover-trigger">Hover</button>
<button v-tooltip.focus="'Static tooltip content'" type="button" class="btn btn-primary" id="focus-trigger">Focus</button>
<button v-tooltip.click="'Static tooltip content'" type="button" class="btn btn-primary" id="click-trigger">Click</button>
<button v-tooltip.outside-click="'Static tooltip content'" type="button" class="btn btn-primary" id="outside-click-trigger">Outside-Click</button>
<!-- tooltip-triggers.vue -->
```

## Manual Trigger

Set `trigger` prop to `manual` to disable all the event listeners, and controls tooltips show / hide only by `v-model` change.

```html
<template>
  <tooltip text="Static tooltip content goes here" trigger="manual" v-model="show">
    <button type="button" class="btn btn-default">You Can't Trigger Tooltip Here...</button>
  </tooltip>
  <hr/>
  <button type="button" class="btn btn-primary" @click="show = !show">Toggle Tooltip</button>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    }
  }
</script>
<!-- tooltip-manual-trigger.vue -->
```

## Disable Tooltip

Set `enable` prop to `false` to disable a tooltip.

```html
<tooltip text="Static tooltip content goes here" :enable="false">
  <button type="button" class="btn btn-primary" id="disabled-trigger">Disabled Tooltip</button>
</tooltip>
<!-- tooltip-disable.vue -->
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

## [tooltip.js](https://github.com/wxsms/uiv/tree/master/src/directives/tooltip/tooltip.js)

This is the directive for `Tooltip.vue`. The binding value will be the text content of corresponding tooltip.

**Simplest Usage**

```
v-tooltip="'tooltip content'"
```

**Placements Examples**

```
v-tooltip.left="'tooltip content'"
v-tooltip.right="'tooltip content'"
```

**Triggers Examples**

```
v-tooltip.hover="'tooltip content'"
v-tooltip.click="'tooltip content'"
```

**Combination**

```
v-tooltip.left.hover="'tooltip content'"
v-tooltip.right.click="'tooltip content'"
```
