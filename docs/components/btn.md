# Button

> Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.

## Examples

Use any of the available button types to quickly create a styled button.

<DemoWrapper><btn-example/></DemoWrapper>

<<< @/.vitepress/components/btn/example.vue

## Links

Buttons with `href` or `to` prop will render as link tag.

<DemoWrapper><btn-links/></DemoWrapper>

<<< @/.vitepress/components/btn/links.vue

## Sizes

Fancy larger or smaller buttons? Add size `lg`, `sm`, or `xs` for additional sizes.

<DemoWrapper><btn-sizes/></DemoWrapper>

<<< @/.vitepress/components/btn/sizes.vue

Create block level buttons—those that span the full width of a parent — by adding `block`.

<DemoWrapper><btn-block/></DemoWrapper>

<<< @/.vitepress/components/btn/block.vue

## Active state

Add `active` to make buttons appear pressed (with a darker background, darker border, and inset shadow).

<DemoWrapper><btn-active/></DemoWrapper>

<<< @/.vitepress/components/btn/active.vue

## Disabled state

Add `disabled` to make buttons unclickable.

<DemoWrapper><btn-disabled/></DemoWrapper>

<<< @/.vitepress/components/btn/disabled.vue

## Checkbox / Radio

Add `input-type` to render `<btn>` as `checkbox` or `radio` input.

::: tip
This needed to work with [`btn-group`](/components/btn-group.html) for correct styles.
:::

### Checkbox example

<br/>

<DemoWrapper><btn-checkbox/></DemoWrapper>

<<< @/.vitepress/components/btn/checkbox.vue

### Radio example

<br/>

<DemoWrapper><btn-radio/></DemoWrapper>

<<< @/.vitepress/components/btn/radio.vue

## API Reference

### [Btn](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/Btn.js)

#### Props

| Name          | Type             | Default | Required | Description                                                                                                                   |
|---------------|------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `type`        | String           | default |          | Button types in Bootstrap. Supported: `default`, `primary`, `info`, `success`, `warning`, `danger`, `link`.                   |
| `native-type` | String           | button  |          | Native button type. Supported: `button`, `submit`, `reset`.                                                                   |
| `size`        | String           |         |          | Optional button sizes. Supported: `lg`, `sm`, `xs`.                                                                           |
| `block`       | Boolean          | false   |          | Apply block level style.                                                                                                      |
| `active`      | Boolean          | false   |          | Apply active state.                                                                                                           |
| `disabled`    | Boolean          | false   |          | Apply disabled state.                                                                                                         |
| `href`        | String           |         |          | An native link will be created if this prop present.                                                                          |
| `target`      | String           |         |          | Native link prop.                                                                                                             |
| `to`          | String or Object |         |          | An Vue-Router link will be created if this prop present.                                                                      |
| `replace`     | Boolean          | false   |          | Vue-Router link prop.                                                                                                         |
| `append`      | Boolean          | false   |          | Vue-Router link prop.                                                                                                         |
| `exact`       | Boolean          | false   |          | Vue-Router link prop.                                                                                                         |
| `input-type`  | String           |         |          | Use this prop to turn btn to checkbox or radio input. Supported types: `checkbox` / `radio`                                   |
| `input-value` |                  |         |          | The value of input.                                                                                                           |
| `v-model`     |                  |         |          | The model of input. Note that this prop **is required** if `input-type` present.                                              |
| `justified`   | Boolean          | false   |          | Due to Bootstrap limitation, this prop is needed while using `<btn>` in `<btn-group justified>`. Otherwise it can be ignored. |

#### Slots

| Name      | Description      |
|-----------|------------------|
| `default` | The button body. |

#### Events

| Name    | Params | Description                   |
|---------|--------|-------------------------------|
| `click` |        | Click event of button / link. |
