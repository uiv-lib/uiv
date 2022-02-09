# Dropdown

> Add dropdown menus to nearly anything, including the navbar, tabs, and pills.

## Examples

Order to decide the dropdown trigger:

1. The element attached with `data-role="trigger"` inside the default slot (if exist).
1. The element has `dropdown-toggle` class inside the default slot (if exist).
2. The first element inside the default slot.

Use `v-model` to indicate the dropdown status.

<DemoWrapper><dropdown-example/></DemoWrapper>

<<< @/.vitepress/components/dropdown/example.vue

## Alignment

By default, a dropdown menu is automatically positioned 100% from the top and along the left side of its parent. Add `menu-right` to a dropdown component to right align the dropdown menu.

<DemoWrapper><dropdown-alignment/></DemoWrapper>

<<< @/.vitepress/components/dropdown/alignment.vue

## Dropup

Dropdown menus can be changed to expand upwards (instead of downwards) by adding `dropup` to the dropdown component.

<DemoWrapper><dropdown-dropup/></DemoWrapper>

<<< @/.vitepress/components/dropdown/dropup.vue

## Append to body

Use this option to avoid influence from the parent node by appending dropdown list to `<body>`.

<DemoWrapper><dropdown-append-to-body/></DemoWrapper>

<<< @/.vitepress/components/dropdown/append-to-body.vue

## Within navbar

<br/>

<DemoWrapper><dropdown-within-navbar/></DemoWrapper>

<<< @/.vitepress/components/dropdown/within-navbar.vue

## Within pills

<br/>

<DemoWrapper><dropdown-within-pills/></DemoWrapper>

<<< @/.vitepress/components/dropdown/within-pills.vue

## Advanced

You can place anything you wish inside a dropdown, for example, a simple form with checkboxes:

::: tip
use `not-close-elements` to prevent dropdown close on menu body click if needed.
:::

<DemoWrapper><dropdown-advanced/></DemoWrapper>

<<< @/.vitepress/components/dropdown/advanced.vue


## API Reference

### [Dropdown](https://github.com/uiv-lib/uiv/blob/1.x/src/components/dropdown/Dropdown.vue)

#### Props

| Name                 | Type    | Default  | Required | Description                                                                             |
|----------------------|---------|----------|----------|-----------------------------------------------------------------------------------------|
| `v-model`            | Boolean |          |          | Indicate the dropdown status (show / hide).                                             |
| `tag`                | String  | div      |          | The HTML tag that render the dropdown component.                                        |
| `append-to-body`     | Boolean | false    |          | Append the dropdown slot to body.                                                       |
| `dropup`             | Boolean | false    |          | Use dropup style.                                                                       |
| `menu-right`         | Boolean | false    |          | Use dropdown-menu-right style.                                                          |
| `disabled`           | Boolean | false    |          | Disable the dropdown.                                                                   |
| `not-close-elements` | Array   |          |          | Pass an array of element which the dropdown will not close on click.                    |
| `position-element`   | Element | this.$el |          | Pass an HTML element which the dropdown will be positioned by (in append-to-body mode). |

#### Slots

| Name       | Description                                                 |
|------------|-------------------------------------------------------------|
| `dropdown` | Replace as the dropdown body.                               |
| `default`  | Replace as the rest of the component (e.g. trigger stuffs). |
