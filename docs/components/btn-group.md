# ButtonGroup

> Group a series of buttons together on a single line with the button group.

::: warning
When using tooltips or popovers on elements within a btn-group, make sure they're appended to body.
:::

## Example

Wrap a series of `<btn>` in `<btn-group>`.

<btn-group-example/>

<<< @/docs/.vuepress/components/btn-group/example.vue

## Button toolbar

Combine sets of `<btn-group>` into a `<btn-toolbar>` for more complex components.

<btn-group-toolbar/>

<<< @/docs/.vuepress/components/btn-group/toolbar.vue

## Sizing

Instead of applying button sizing classes to every button in a group, just add `size` to each `<btn-group>`, including when nesting multiple groups.

<btn-group-sizes/>

<<< @/docs/.vuepress/components/btn-group/sizes.vue

## Nesting

`btn-group` class will be automatically added to `<dropdown>` when you want dropdown menus mixed with a series of buttons.

<btn-group-nesting/>

<<< @/docs/.vuepress/components/btn-group/nesting.vue

## Vertical

Make a set of buttons appear vertically stacked rather than horizontally by adding `vertical`. 

::: warning
Split button dropdowns are not supported here.
:::

<btn-group-vertical/>

<<< @/docs/.vuepress/components/btn-group/vertical.vue

## Justified

Make a group of buttons stretch at equal sizes to span the entire width of its parent by adding `justified`. Also works with button dropdowns within the button group.

::: warning
Due to Bootstrap limitation, `justified` prop on `<btn>` is needed while it is render as `button`.
:::

<btn-group-justified/>

<<< @/docs/.vuepress/components/btn-group/justified.vue

## API Reference

### [BtnGroup](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/BtnGroup.js)

#### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`size`           | String     |          |          | Optional button sizes. Supported: `lg`, `sm`, `xs`.
`vertical`       | Boolean    | false    |          | Apply vertical style.
`justified`      | Boolean    | false    |          | Apply justified style.

#### Slots

Name      | Description
--------- | -----------------------
`default` | The button group body.

### [BtnToolbar](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/BtnToolbar.js)

This component has no props.
