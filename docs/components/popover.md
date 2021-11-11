# Popover

> Add small overlays of content, like those on the iPad, to any element for housing secondary information.

## Example

::: tip
Popovers whose both title and content are zero-length are never displayed.
:::

Click the button below to toggle popover:

<popover-example/>

<<< @/.vitepress/components/popover/example.vue

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

<popover-directive/>

<<< @/.vitepress/components/popover/directive.vue

## With empty title

If you don't want the title of popover, just leave the `title` prop unset or blank.

<popover-with-empty-title/>

<<< @/.vitepress/components/popover/with-empty-title.vue

## Placements

Supported placements:

* **top** (Default)
* **right**
* **bottom**
* **left**

<popover-placements/>

<<< @/.vitepress/components/popover/placements.vue

## Auto placement

Popover will try to find the best placement for displaying while `auto-placement` is set to `true` (by default) base on the default placement setting. Useful while there does not have enough space to show the entire popover content.

`auto-placement` try order: right -> bottom -> left -> top, and use the set one if none of these matched.

## Viewport

Keeps the popover within the bounds of this element.

<popover-viewport/>

<<< @/.vitepress/components/popover/viewport.vue

## Triggers

Supported triggers:

* `hover` show on mouseenter, hide on mouseleave.
* `focus` show on focus, hide on blur.
* `hover-focus` combination of hover and focus trigger.
* `click` toggle on trigger click.
* `outside-click` (Default) same as click, but not close on popover click and close on outside click.

<popover-triggers/>

<<< @/.vitepress/components/popover/triggers.vue

## Manual trigger

Set `trigger` prop to `manual` to disable all the event listeners, and controls popover show / hide only by `v-model` change.

<popover-manual-trigger/>

<<< @/.vitepress/components/popover/manual-trigger.vue

## API Reference

### [Popover](https://github.com/uiv-lib/uiv/blob/1.x/src/components/popover/Popover.vue)

#### Props

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
`position-by`         | String     |               |          | (1.2.0+) Element selector that the popover position by, see [#410](https://github.com/uiv-lib/uiv/issues/410).
`transition`          | Number     | 150           |          | The popover show / hide transition time in ms.
`show-delay`          | Number     | 0             |          | Delay showing the Popover (ms).
`hide-delay`          | Number     | 0             |          | Delay hidding the Popover (ms).
`viewport`            | String or Function |       |          | Keeps the popover within the bounds of this element. Example: viewport: '#viewport'. If a function is given, it is called with the triggering element DOM node as its only argument.
`custom-class`        | String     |               |          | Apply a custom css class to the popover.

#### Slots

Name      | Description
--------- | -----------------------
`popover` | Replace as the popover body.
`default` | Replace as the rest of the component (e.g. trigger stuffs).

#### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | Fire after popover show.
`hide`      |        | Fire after popover hide.

### [Directive](https://github.com/uiv-lib/uiv/blob/1.x/src/directives/popover/popover.js)

The binding value will be the title and text content of corresponding popover.

#### Simplest Usage

```
v-popover="{title:'Title', content:'Popover content'}"
```

#### Placements Examples

```
v-popover.left="{title:'Title', content:'Popover content'}"
v-popover.right="{title:'Title', content:'Popover content'}"
```

#### Triggers Examples

```
v-popover.hover="{title:'Title', content:'Popover content'}"
v-popover.click="{title:'Title', content:'Popover content'}"
```

#### Unenterable

```
v-popover.unenterable="{title:'Title', content:'Popover content'}"
```

#### Custom `append-to`

```
v-popover:arg="{title:'Title', content:'Popover content'}"
```

`arg` is the ID (without prefix `#`) of the element to append to, leave it empty to use default value `body`.

#### Combination

```
v-popover.left.hover="{title:'Title', content:'Popover content'}"
v-popover:some-id.right.click="{title:'Title', content:'Popover content'}"
```
