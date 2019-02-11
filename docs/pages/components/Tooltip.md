# Tooltip

## Example

The first element appear in `<tooltip>` node will be the trigger element. You can also use `target` to reference it from outside the component.

**Note**: Tooltips with zero-length texts are never displayed.

Hover over the button below to toggle tooltips:

```html
<btn type="primary" id="btn">Hover me!</btn>
<tooltip text="Static tooltip content goes here" target="#btn"/>
<!-- tooltip-example.vue -->
```

### Trigger target

Order to decide the tooltip trigger:

1. Use `target` if exist.
2. Use element in default slot with `data-role="trigger"` attribute if exist.
3. Use the first element present in default slot.

A `target` can be:

* Selector that can be recognized by `querySelect`.
* Reference to Element.
* Reference to Component.

## Directive

You can also simply use tooltips via `v-tooltip` directive:

```html
<btn v-tooltip="'Static tooltip content goes here'" type="primary">Hover me!</btn>
<!-- tooltip-directive.vue -->
```

## Placements

Supported placements:

* **top** (Default)
* **right**
* **bottom**
* **left**

```html
<btn v-tooltip.left="'Tooltip content on left'" type="primary">Left</btn>
<btn v-tooltip.top="'Tooltip content on top'" type="primary">Top</btn>
<btn v-tooltip.bottom="'Tooltip content on bottom'" type="primary">Bottom</btn>
<btn v-tooltip.right="'Tooltip content on right'" type="primary">Right</btn>
<!-- tooltip-placements.vue -->
```

## Auto placement

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
<btn v-tooltip="'Static tooltip content'" type="primary">Hover-Focus (Default)</btn>
<btn v-tooltip.hover="'Static tooltip content'" type="primary">Hover</btn>
<btn v-tooltip.focus="'Static tooltip content'" type="primary">Focus</btn>
<btn v-tooltip.click="'Static tooltip content'" type="primary">Click</btn>
<btn v-tooltip.outside-click="'Static tooltip content'" type="primary">Outside-Click</btn>
<!-- tooltip-triggers.vue -->
```

## Manual trigger

Set `trigger` prop to `manual` to disable all the event listeners, and controls tooltips show / hide only by `v-model` change.

```html
<template>
  <section>
    <tooltip text="Static tooltip content goes here" trigger="manual" v-model="show">
      <btn>You Can't Trigger Tooltip Here...</btn>
    </tooltip>
    <hr/>
    <btn type="primary" @click="show = !show">Toggle Tooltip</btn>
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

## Disable tooltip

Set `enable` prop to `false` to disable a tooltip.

```html
<tooltip text="Static tooltip content goes here" :enable="false">
  <btn type="primary">Disabled Tooltip</btn>
</tooltip>
<!-- tooltip-disable.vue -->
```

# API Reference

## [Tooltip](https://github.com/wxsms/uiv/blob/master/src/components/tooltip/Tooltip.vue)

### Props

Name                  | Type       | Default       | Required | Description
----------------      | ---------- | --------      | -------- | -----------------------
`v-model`             | Boolean    |               |          | Show / hide the tooltip.
`target`              |            |               |          | Tooltip trigger, can be a select or reference to Element / Component.
`tag`                 | String     | span          |          | The HTML tag that render the component.
`text`                | String     |               |          | The tooltip text.
`enable`              | Boolean    | true          |          | Enable the tooltip.
`enterable`           | Boolean    | true          |          | Whether mouse can enter the tooltip.
`placement`           | String     | top           |          | The tooltip placement, support `top` / `bottom` / `left` / `right`.
`auto-placement`      | Boolean    | true          |          | Try to auto adjust the placement if the set one does not have enough space to show.
`trigger`             | String     | hover-focus   |          | The tooltip trigger event, support `hover` / `focus` / `hover-focus` / `click` / `outside-click` / `manual`
`append-to`           | String     | body          |          | Element selector that the tooltip append to.
`transition-duration` | Number     | 150           |          | The tooltip show / hide transition time in ms.
`show-delay`          | Number     | 0             |          | Delay showing the tooltip (ms).
`hide-delay`          | Number     | 0             |          | Delay hidding the tooltip (ms).

### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | Fire after tooltip show.
`hide`      |        | Fire after tooltip hide.

### [Directive](https://github.com/wxsms/uiv/blob/master/src/directives/tooltip/tooltip.js)

The binding value will be the text content of corresponding tooltip.

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

**Unenterable**

```
v-tooltip.unenterable="'tooltip content'"
```

**Custom append-to**

```
v-tooltip:arg="'tooltip content'"
```

`arg` is the ID (without prefix `#`) of the element to append to, leave it empty to use default value `body`.

**Combination**

```
v-tooltip.left.hover="'tooltip content'"
v-tooltip:some-id.right.click="'tooltip content'"
```
