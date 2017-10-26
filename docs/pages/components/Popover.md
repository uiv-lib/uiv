# Popover

> Add small overlays of content, like those on the iPad, to any element for housing secondary information.

## Example

Click the button below to toggle popover.

```html
<button type="button" class="btn btn-primary" id="popover-trigger">Popover</button>
<popover title="Title" target="#popover-trigger">
  <div slot="popover">
    <h1>Hello world!</h1>
  </div>
</popover>
<!-- popover-example.vue -->
```

## Trigger Target

Order to decide the popover trigger:

1. Use `target` if exist.
2. Use element in default slot with `data-role="trigger"` attribute if exist.
3. Use the first element present in default slot.

A `target` can be:

* Selector that can be recognized by `querySelect`.
* Reference to Element.
* Reference to Component.

## With Empty Title

If you don't want the title of popover, just leave the `title` prop unset or blank.

```html
<popover>
  <button type="button" class="btn btn-primary" id="empty-title-trigger">Popover</button>
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
  <button type="button" class="btn btn-primary" id="left-trigger">Left</button>
  <div slot="popover">
    <p>Popover on left</p>
  </div>
</popover>
<popover title="Title" placement="top">
  <button type="button" class="btn btn-primary" id="top-trigger">Top</button>
  <div slot="popover">
    <p>Popover on top</p>
  </div>
</popover>
<popover title="Title" placement="bottom">
  <button type="button" class="btn btn-primary" id="bottom-trigger">Bottom</button>
  <div slot="popover">
    <p>Popover on bottom</p>
  </div>
</popover>
<popover title="Title" placement="right">
  <button type="button" class="btn btn-primary" id="right-trigger">Right</button>
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
  <button type="button" class="btn btn-primary">Outside-Click (Default)</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="hover">
  <button type="button" class="btn btn-primary" id="hover-trigger">Hover</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="focus">
  <button type="button" class="btn btn-primary" id="focus-trigger">Focus</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="hover-focus">
  <button type="button" class="btn btn-primary" id="hover-focus-trigger">Hover-Focus</button>
  <div slot="popover">
    <p>Popover content</p>
  </div>
</popover>
<popover title="Title" trigger="click">
  <button type="button" class="btn btn-primary" id="click-trigger">Click</button>
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
    <button type="button" class="btn btn-default">You Can't Trigger Popover Here...</button>
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
  <button type="button" class="btn btn-primary" id="disabled-trigger">Disabled Popover</button>
  <div slot="popover">
    <h1>Hello world!</h1>
  </div>
</popover>
<!-- popover-disable.vue -->
```

# API Reference

## [Popover.vue](https://github.com/wxsms/uiv/tree/master/src/components/popover/Popover.vue)

### Props

Name                  | Type       | Default       | Required | Description
----------------      | ---------- | --------      | -------- | -----------------------
`v-model`             | Boolean    |               |          | Show / hide the popover.
`target`              |            |               |          | Popover trigger, can be a select or reference to Element / Component.
`tag`                 | String     | span          |          | The HTML tag that render the component.
`title`               | String     |               |          | The popover title.
`enable`              | Boolean    | true          |          | Enable the popover.
`placement`           | String     | top           |          | The popover placement, support `top` / `bottom` / `left` / `right`.
`auto-placement`      | Boolean    | true          |          | Try to auto adjust the placement if the set one does not have enough space to show.
`trigger`             | String     | outside-click |          | The popover trigger event, support `hover` / `focus` / `hover-focus` / `click` / `outside-click` / `manual`
`append-to`           | String     | body          |          | Element selector that the popover append to.
`transition-duration` | Number     | 150           |          | The popover show / hide transition time in ms.

### Slots

Name      | Description
--------- | -----------------------
`popover` | Replace as the popover body.
`default` | Replace as the rest of the component (e.g. trigger stuffs).

### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | Fire after popover show.
`hide`      |        | Fire after popover hide.
