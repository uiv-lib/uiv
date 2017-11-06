# Popover

> Add small overlays of content, like those on the iPad, to any element for housing secondary information.

## Example

**Note**: Popovers whose both title and content are zero-length are never displayed.

Click the button below to toggle popover:

```html
<button type="button" class="btn btn-primary" id="btn">Popover</button>
<popover title="Title" target="#btn">
  <div slot="popover">
    <h1>Hello world!</h1>
  </div>
</popover>
<!-- popover-example.vue -->
```

### Trigger Target

Order to decide the popover trigger:

1. Use `target` if exist.
2. Use element in default slot with `data-role="trigger"` attribute if exist.
3. Use the first element present in default slot.

A `target` can be:

* Selector that can be recognized by `querySelect`.
* Reference to Element.
* Reference to Component.

## Directive

You can also simply use popovers via `v-popover` directive:

```html
<button v-popover="{title:'Title', content:'Popover content'}" type="button" class="btn btn-primary">Popover</button>
<!-- popover-directive.vue -->
```

## With Empty Title

If you don't want the title of popover, just leave the `title` prop unset or blank.

```html
<button v-popover="{content:'Popover without a title'}" type="button" class="btn btn-primary">Popover</button>
<!-- popover-with-empty-title.vue -->
```

## Placements

Supported placements:

* **top** (Default)
* **right**
* **bottom**
* **left**

```html
<button v-popover.left="{title:'Title', content:'Popover on left'}" type="button" class="btn btn-primary">Left</button>
<button v-popover.top="{title:'Title', content:'Popover on top'}" type="button" class="btn btn-primary">Top</button>
<button v-popover.bottom="{title:'Title', content:'Popover on bottom'}" type="button" class="btn btn-primary">Bottom</button>
<button v-popover.right="{title:'Title', content:'Popover on right'}" type="button" class="btn btn-primary">Right</button>
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
<button v-popover="{title:'Title', content:'Popover content'}" type="button" class="btn btn-primary">Outside-Click (Default)</button>
<button v-popover.hover="{title:'Title', content:'Popover content'}" type="button" class="btn btn-primary">Hover</button>
<button v-popover.focus="{title:'Title', content:'Popover content'}" type="button" class="btn btn-primary">Focus</button>
<button v-popover.hover-focus="{title:'Title', content:'Popover content'}" type="button" class="btn btn-primary">Hover-Focus</button>
<button v-popover.click="{title:'Title', content:'Popover content'}" type="button" class="btn btn-primary">Click</button>
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
  <button type="button" class="btn btn-primary">Disabled Popover</button>
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
`content`             | String     |               |          | The popover content text. Use `popover` slot instead if you need full control.
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

## [popover.js](https://github.com/wxsms/uiv/tree/master/src/directives/popover/popover.js)

This is the directive for `Popover.vue`. The binding value will be the title and text content of corresponding popover.

**Simplest Usage**

```
v-popover="{title:'Title', content:'Popover content'}"
```

**Placements Examples**

```
v-popover.left="{title:'Title', content:'Popover content'}"
v-popover.right="{title:'Title', content:'Popover content'}"
```

**Triggers Examples**

```
v-popover.hover="{title:'Title', content:'Popover content'}"
v-popover.click="{title:'Title', content:'Popover content'}"
```

**Combination**

```
v-popover.left.hover="{title:'Title', content:'Popover content'}"
v-popover.right.click="{title:'Title', content:'Popover content'}"
```
