# Popover

> Add small overlays of content, like those on the iPad, to any element for housing secondary information.

## Example

The element attached with `data-role="trigger"` will be the popover trigger.

Click the button below to toggle popover.

```html
<popover title="Title">
  <button type="button" class="btn btn-primary" data-role="trigger">Popover</button>
  <div slot="popover">
    <h1>Hello world!</h1>
  </div>
</popover>
<!-- popover-example.vue -->
```

## With Empty Title

If you don't want the title of popover, just leave the `title` prop unset or blank.

```html
<popover>
  <button type="button" class="btn btn-primary" data-role="trigger" id="empty-title-trigger">Popover</button>
  <div slot="popover">
    <h1>Hello world!</h1>
  </div>
</popover>
<!-- popover-with-empty-title.vue -->
```

## Placements

Supported placements:

* **top** (Default)
* **right**
* **bottom**
* **left**

```html
<popover title="Title" placement="left">
  <button type="button" class="btn btn-primary" data-role="trigger" id="left-trigger">Left</button>
  <div slot="popover">
    <p>Popover on left</p>
  </div>
</popover>
<popover title="Title" placement="top">
  <button type="button" class="btn btn-primary" data-role="trigger" id="top-trigger">Top</button>
  <div slot="popover">
    <p>Popover on top</p>
  </div>
</popover>
<popover title="Title" placement="bottom">
  <button type="button" class="btn btn-primary" data-role="trigger" id="bottom-trigger">Bottom</button>
  <div slot="popover">
    <p>Popover on bottom</p>
  </div>
</popover>
<popover title="Title" placement="right">
  <button type="button" class="btn btn-primary" data-role="trigger" id="right-trigger">Right</button>
  <div slot="popover">
    <p>Popover on right</p>
  </div>
</popover>
<!-- popover-placements.vue -->
```

## Auto Placement

Popover will try to find the best placement for displaying while `auto-placement` is set to `true` (by default) base on the default placement setting. Useful while there does not have enough space to show the entire popover content.

`auto-placement` try order: right -> bottom -> left -> top, and use the set one if none of these matched.

## Triggers

Supported triggers:

* `hover` show on mouseenter, hide on mouseleave.
* `focus` show on focus, hide on blur.
* `hover-focus` combination of hover and focus trigger.
* `click` toggle on trigger click.
* `outside-click` (Default) same as click, but not close on popover click and close on outside click.

```html
<popover title="Title">
  <button type="button" class="btn btn-primary" data-role="trigger">Outside-Click (Default)</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="hover">
  <button type="button" class="btn btn-primary" data-role="trigger" id="hover-trigger">Hover</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="focus">
  <button type="button" class="btn btn-primary" data-role="trigger" id="focus-trigger">Focus</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="hover-focus">
  <button type="button" class="btn btn-primary" data-role="trigger" id="hover-focus-trigger">Hover-Focus</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="click">
  <button type="button" class="btn btn-primary" data-role="trigger" id="click-trigger">Click</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<!-- popover-triggers.vue -->
```

## Manual Trigger

Set `trigger` prop to `manual` to disable all the event listeners, and controls popover show / hide only by `v-model` change.

```html
<template>
  <popover title="Title" trigger="manual" v-model="show">
    <button type="button" class="btn btn-default" data-role="trigger">You Can't Trigger Popover Here...</button>
    <div slot="popover">
      <p>Popover content</p>
    </div>
  </popover>
  <hr/>
  <button type="button" class="btn btn-primary" @click="show = !show">Toggle Popover</button>
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
<!-- popover-manual-trigger.vue -->
```

## Disable Popover

Set `enable` prop to `false` to disable a popover.

```html
<popover title="Title" :enable="false">
  <button type="button" class="btn btn-primary" data-role="trigger" id="disabled-trigger">Disabled Popover</button>
  <div slot="popover">
    <h1>Hello world!</h1>
  </div>
</popover>
<!-- popover-disable.vue -->
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
