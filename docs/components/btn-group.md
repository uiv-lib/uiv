# ButtonGroup

> Group a series of buttons together on a single line with the button group.

::: warning
When using tooltips or popovers on elements within a btn-group, make sure they're appended to body.
:::

## Example

Wrap a series of `<btn>` in `<btn-group>`.

<ClientOnly><btn-group-example/></ClientOnly>

<<< @/.vitepress/components/btn-group/example.vue

## Button toolbar

Combine sets of `<btn-group>` into a `<btn-toolbar>` for more complex components.

<ClientOnly><btn-group-toolbar/></ClientOnly>

<<< @/.vitepress/components/btn-group/toolbar.vue

## Sizing

Instead of applying button sizing classes to every button in a group, just add `size` to each `<btn-group>`, including when nesting multiple groups.

<ClientOnly><btn-group-sizes/></ClientOnly>

<<< @/.vitepress/components/btn-group/sizes.vue

## Nesting

`btn-group` class will be automatically added to `<dropdown>` when you want dropdown menus mixed with a series of buttons.

<ClientOnly><btn-group-nesting/></ClientOnly>

<<< @/.vitepress/components/btn-group/nesting.vue

## Vertical

Make a set of buttons appear vertically stacked rather than horizontally by adding `vertical`. 

::: warning
Split button dropdowns are not supported here.
:::

<ClientOnly><btn-group-vertical/></ClientOnly>

<<< @/.vitepress/components/btn-group/vertical.vue

## Justified

Make a group of buttons stretch at equal sizes to span the entire width of its parent by adding `justified`. Also works with button dropdowns within the button group.

::: warning
Due to Bootstrap limitation, `justified` prop on `<btn>` is needed while it is render as `button`.
:::

<ClientOnly><btn-group-justified/></ClientOnly>

<<< @/.vitepress/components/btn-group/justified.vue

## API Reference

### [BtnGroup](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/BtnGroup.js)

#### Props

| Name        | Type    | Default | Required | Description                                         |
|-------------|---------|---------|----------|-----------------------------------------------------|
| `size`      | String  |         |          | Optional button sizes. Supported: `lg`, `sm`, `xs`. |
| `vertical`  | Boolean | false   |          | Apply vertical style.                               |
| `justified` | Boolean | false   |          | Apply justified style.                              |

#### Slots

| Name      | Description            |
|-----------|------------------------|
| `default` | The button group body. |

### [BtnToolbar](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/BtnToolbar.js)

This component has no props.
