# Tooltip

<div id="tt"></div>

## Example

The first element appear in `<tooltip>` node will be the trigger element. You can also use `target` to reference it from outside the component.

::: tip
Tooltips with zero-length texts are never displayed.
:::

Hover over the button below to toggle tooltips:

<DemoWrapper><tooltip-example/></DemoWrapper>

<<< @/.vitepress/components/tooltip/example.vue

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

<DemoWrapper><tooltip-directive/></DemoWrapper>

<<< @/.vitepress/components/tooltip/directive.vue

## Placements

Supported placements:

* **top** (Default)
* **right**
* **bottom**
* **left**

<DemoWrapper><tooltip-placements/></DemoWrapper>

<<< @/.vitepress/components/tooltip/placements.vue

## Auto placement

Tooltips will try to find the best placement for displaying while `auto-placement` is set to `true` (by default) base on the default placement setting. Useful while there does not have enough space to show the entire tooltip content.

`auto-placement` try order: right -> bottom -> left -> top, and use the set one if none of these matched.

## Viewport

Keeps the tooltip within the bounds of this element.

<DemoWrapper><tooltip-viewport/></DemoWrapper>

<<< @/.vitepress/components/tooltip/viewport.vue

## Triggers

Supported triggers:

* `hover` show on mouseenter, hide on mouseleave.
* `focus` show on focus, hide on blur.
* `hover-focus` (Default) combination of hover and focus trigger.
* `click` toggle on trigger click.
* `outside-click` same as click, but not close on tooltip click and close on outside click.

<DemoWrapper><tooltip-triggers/></DemoWrapper>

<<< @/.vitepress/components/tooltip/triggers.vue

## Manual trigger

Set `trigger` prop to `manual` to disable all the event listeners, and controls tooltips show / hide only by `v-model` change.

<DemoWrapper><tooltip-manual-trigger/></DemoWrapper>

<<< @/.vitepress/components/tooltip/manual-trigger.vue

## API Reference

### [Tooltip](https://github.com/uiv-lib/uiv/blob/1.x/src/components/tooltip/Tooltip.vue)

#### Props

| Name             | Type               | Default     | Required | Description                                                                                                                                                                          |
|------------------|--------------------|-------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `v-model`        | Boolean            |             |          | Show / hide the tooltip.                                                                                                                                                             |
| `target`         |                    |             |          | Tooltip trigger, can be a select or reference to Element / Component.                                                                                                                |
| `tag`            | String             | span        |          | The HTML tag that render the component.                                                                                                                                              |
| `text`           | String             |             |          | The tooltip text.                                                                                                                                                                    |
| `enable`         | Boolean            | true        |          | Enable the tooltip.                                                                                                                                                                  |
| `enterable`      | Boolean            | true        |          | Whether mouse can enter the tooltip.                                                                                                                                                 |
| `placement`      | String             | top         |          | The tooltip placement, support `top` / `bottom` / `left` / `right`.                                                                                                                  |
| `auto-placement` | Boolean            | true        |          | Try to auto adjust the placement if the set one does not have enough space to show.                                                                                                  |
| `trigger`        | String             | hover-focus |          | The tooltip trigger event, support `hover` / `focus` / `hover-focus` / `click` / `outside-click` / `manual`                                                                          |
| `append-to`      | String             | body        |          | Element selector that the tooltip append to.                                                                                                                                         |
| `position-by`    | String             |             |          | Element selector that the tooltip position by, see [#410](https://github.com/uiv-lib/uiv/issues/410).                                                                                |
| `transition`     | Number             | 150         |          | The tooltip show / hide transition time in ms.                                                                                                                                       |
| `show-delay`     | Number             | 0           |          | Delay showing the tooltip (ms).                                                                                                                                                      |
| `hide-delay`     | Number             | 0           |          | Delay hidding the tooltip (ms).                                                                                                                                                      |
| `viewport`       | String or Function |             |          | Keeps the tooltip within the bounds of this element. Example: viewport: '#viewport'. If a function is given, it is called with the triggering element DOM node as its only argument. |
| `custom-class`   | String             |             |          | Apply a custom css class to the tooltip.                                                                                                                                             |

#### Events

| Name   | Params | Description              |
|--------|--------|--------------------------|
| `show` |        | Fire after tooltip show. |
| `hide` |        | Fire after tooltip hide. |

### [Directive](https://github.com/uiv-lib/uiv/blob/1.x/src/directives/tooltip/tooltip.js)

The binding value will be the text content of corresponding tooltip.

#### Simplest Usage

```
v-tooltip="'tooltip content'"
```

#### Placements Examples

```
v-tooltip.left="'tooltip content'"
v-tooltip.right="'tooltip content'"
```

#### Triggers Examples

```
v-tooltip.hover="'tooltip content'"
v-tooltip.click="'tooltip content'"
```

#### Unenterable

```
v-tooltip.unenterable="'tooltip content'"
```

#### Custom `append-to`

```
v-tooltip:arg="'tooltip content'"
```

`arg` is the ID (without prefix `#`) of the element to append to, leave it empty to use default value `body`.

#### Combination

```
v-tooltip.left.hover="'tooltip content'"
v-tooltip:some-id.right.click="'tooltip content'"
```
