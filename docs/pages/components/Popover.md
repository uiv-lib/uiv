# Popover

> Add small overlays of content, like those on the iPad, to any element for housing secondary information.

## Example

**Note**: Popovers whose both title and content are zero-length are never displayed.

Click the button below to toggle popover:

```html
<btn type="primary" id="btn">Popover</btn>
<popover title="Title" target="#btn">
  <template slot="popover">
    <h1>Hello world!</h1>
  </template>
</popover>
<!-- popover-example.vue -->
```

### Trigger target

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
<btn v-popover="{title:'Title', content:'Popover content'}" type="primary">Popover</btn>
<!-- popover-directive.vue -->
```

## With empty title

If you don't want the title of popover, just leave the `title` prop unset or blank.

```html
<btn v-popover="{content:'Popover without a title'}" type="primary">Popover</btn>
<!-- popover-with-empty-title.vue -->
```

## Placements

Supported placements:

* **top** (Default)
* **right**
* **bottom**
* **left**

```html
<btn v-popover.left="{title:'Title', content:'Popover on left'}" type="primary">Left</btn>
<btn v-popover.top="{title:'Title', content:'Popover on top'}" type="primary">Top</btn>
<btn v-popover.bottom="{title:'Title', content:'Popover on bottom'}" type="primary">Bottom</btn>
<btn v-popover.right="{title:'Title', content:'Popover on right'}" type="primary">Right</btn>
<!-- popover-placements.vue -->
```

## Auto placement

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
<btn v-popover="{title:'Title', content:'Popover content'}" type="primary">Outside-Click (Default)</btn>
<btn v-popover.hover="{title:'Title', content:'Popover content'}" type="primary">Hover</btn>
<btn v-popover.focus="{title:'Title', content:'Popover content'}" type="primary">Focus</btn>
<btn v-popover.hover-focus="{title:'Title', content:'Popover content'}" type="primary">Hover-Focus</btn>
<btn v-popover.click="{title:'Title', content:'Popover content'}" type="primary">Click</btn>
<!-- popover-triggers.vue -->
```

## Manual trigger

Set `trigger` prop to `manual` to disable all the event listeners, and controls popover show / hide only by `v-model` change.

```html
<template>
  <section>
    <popover title="Title" trigger="manual" v-model="show">
      <btn>You Can't Trigger Popover Here...</btn>
      <template slot="popover">
        <p>Popover content</p>
      </template>
    </popover>
    <hr/>
    <btn type="primary" @click="show = !show">Toggle Popover</btn>
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
<!-- popover-manual-trigger.vue -->
```

## Disable popover

Set `enable` prop to `false` to disable a popover.

```html
<popover title="Title" :enable="false">
  <btn type="primary">Disabled Popover</btn>
  <template slot="popover">
    <h1>Hello world!</h1>
  </template>
</popover>
<!-- popover-disable.vue -->
```

## Change duration

Set `enable` prop to `false` to disable a popover.

```html
<popover title="Title" :hideTransitionDuration='1000' :showTransitionDuration='3000' trigger='hover'>
  <btn type="primary">Hover</btn>
  <template slot="popover">
    <h1>Hello world!</h1>
  </template>
</popover>
<!-- popover-duration.vue -->
```

# API Reference

## [Popover](https://github.com/wxsms/uiv/blob/master/src/components/popover/Popover.vue)

### Props

Name                  | Type       | Default       | Required | Description
----------------      | ---------- | --------      | -------- | -----------------------
`v-model`             | Boolean    |               |          | Show / hide the popover.
`target`              |            |               |          | Popover trigger, can be a select or reference to Element / Component.
`tag`                 | String     | span          |          | The HTML tag that render the component.
`title`               | String     |               |          | The popover title.
`content`             | String     |               |          | The popover content text. Use `popover` slot instead if you need full control.
`enable`              | Boolean    | true          |          | Enable the popover.
`enterable`           | Boolean    | true          |          | Whether mouse can enter the popover.
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

### [Directive](https://github.com/wxsms/uiv/blob/master/src/directives/popover/popover.js)

The binding value will be the title and text content of corresponding popover.

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

**Unenterable**

```
v-popover.unenterable="{title:'Title', content:'Popover content'}"
```

**Custom append-to**

```
v-popover:arg="{title:'Title', content:'Popover content'}"
```

`arg` is the ID (without prefix `#`) of the element to append to, leave it empty to use default value `body`.

**Combination**

```
v-popover.left.hover="{title:'Title', content:'Popover content'}"
v-popover:some-id.right.click="{title:'Title', content:'Popover content'}"
```
