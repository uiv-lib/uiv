# Tooltip

## Example

The first element appear in `<tooltip>` node will be the trigger element. You can also use `target` to reference it from outside the component.

**Note**: Tooltips with zero-length texts are never displayed.

Hover over the button below to toggle tooltips:

```html
<button type="button" class="btn btn-primary" id="btn">Hover me!</button>
<tooltip text="Static tooltip content goes here" target="#btn"/>
<!-- tooltip-example.vue -->
```

### Trigger Target

Order to decide the popover trigger:

1. Use `target` if exist.
3. Use the first element present in default slot.

A `target` can be:

* Selector that can be recognized by `querySelect`.
* Reference to Element.
* Reference to Component.

## Directive

You can also simply use tooltips via `v-tooltip` directive:

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
  <section>
    <tooltip text="Static tooltip content goes here" trigger="manual" v-model="show">
      <button type="button" class="btn btn-default">You Can't Trigger Tooltip Here...</button>
    </tooltip>
    <hr/>
    <button type="button" class="btn btn-primary" @click="show = !show">Toggle Tooltip</button>
  </section>
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

### Props

Name                  | Type       | Default       | Required | Description
----------------      | ---------- | --------      | -------- | -----------------------
`v-model`             | Boolean    |               |          | Show / hide the tooltip.
`target`              |            |               |          | Tooltip trigger, can be a select or reference to Element / Component.
`tag`                 | String     | span          |          | The HTML tag that render the component.
`title`               | String     |               |          | The tooltip title.
`enable`              | Boolean    | true          |          | Enable the tooltip.
`placement`           | String     | top           |          | The tooltip placement, support `top` / `bottom` / `left` / `right`.
`auto-placement`      | Boolean    | true          |          | Try to auto adjust the placement if the set one does not have enough space to show.
`trigger`             | String     | hover-focus   |          | The tooltip trigger event, support `hover` / `focus` / `hover-focus` / `click` / `outside-click` / `manual`
`append-to`           | String     | body          |          | Element selector that the tooltip append to.
`transition-duration` | Number     | 150           |          | The tooltip show / hide transition time in ms.

### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | Fire after tooltip show.
`hide`      |        | Fire after tooltip hide.

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
