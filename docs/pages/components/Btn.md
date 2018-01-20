# Button

## Examples

Use any of the available button types to quickly create a styled button.

```html
<btn>Default</btn>
<btn type="primary">Primary</btn>
<btn type="success">Success</btn>
<btn type="info">Info</btn>
<btn type="warning">Warning</btn>
<btn type="danger">Danger</btn>
<btn type="link">Link</btn>
<!-- btn-examples.vue -->
```

## Links

Buttons with `href` or `to` prop will render as link tag.

```html
<h4>Native links</h4>
<btn href="#">Default</btn>
<btn href="#" type="primary">Primary</btn>
<h4>Vue Router links</h4>
<btn to="/">Default</btn>
<btn to="/" type="primary">Primary</btn>
<!-- btn-links.vue -->
```

## Sizes

Fancy larger or smaller buttons? Add size `lg`, `sm`, or `xs` for additional sizes.

```html
<p>
  <btn size="lg" type="primary">Large button</btn>
  <btn size="lg">Large button</btn>
</p>
<p>
  <btn type="primary">Default button</btn>
  <btn>Default button</btn>
</p>
<p>
  <btn size="sm" type="primary">Small button</btn>
  <btn size="sm">Small button</btn>
</p>
<p>
  <btn size="xs" type="primary">Extra small button</btn>
  <btn size="xs">Extra small button</btn>
</p>
<!-- btn-sizes.vue -->
```

Create block level buttons—those that span the full width of a parent — by adding `block`.

```html
<btn block size="lg" type="primary">Block level button</btn>
<btn block size="lg">Block level button</btn>
<!-- btn-block.vue -->
```

## Active state

Add `active` to make buttons appear pressed (with a darker background, darker border, and inset shadow).

```html
<h4>Buttons</h4>
<btn active type="primary">Primary button</btn>
<btn active>Button</btn>
<h4>Links</h4>
<btn active href="#" type="primary">Primary button</btn>
<btn active to="/">Button</btn>
<!-- btn-active.vue -->
```

## Disabled state

Add `disabled` to make buttons unclickable.

```html
<h4>Buttons</h4>
<btn disabled type="primary">Primary button</btn>
<btn disabled>Button</btn>
<h4>Links</h4>
<btn disabled href="#" type="primary">Primary button</btn>
<btn disabled to="/">Button</btn>
<!-- btn-disabled.vue -->
```

## Checkbox / Radio

Add `input-type` to render `<btn>` as `checkbox` or `radio` input.

**Note**: This needed to work with `<btn-group>` for correct styles.

### Checkbox example

```html
<template>
  <btn-group>
    <btn input-type="checkbox" input-value="1" v-model="model">Checkbox 1</btn>
    <btn input-type="checkbox" input-value="2" v-model="model">Checkbox 2</btn>
    <btn input-type="checkbox" input-value="3" v-model="model">Checkbox 3</btn>
    <btn input-type="checkbox" input-value="4" v-model="model" disabled>Checkbox 4 (Disabled)</btn>
  </btn-group>
  <hr/>
  <alert>Selected: {{model}}</alert>
</template>
<script>
  export default {
    data () {
      return {
        model: ['1']
      }
    }
  }
</script>
<!-- btn-input-checkbox.vue -->
```

### Radio example

```html
<template>
  <btn-group>
    <btn input-type="radio" input-value="1" v-model="model">Radio 1</btn>
    <btn input-type="radio" input-value="2" v-model="model">Radio 2</btn>
    <btn input-type="radio" input-value="3" v-model="model">Radio 3</btn>
    <btn input-type="radio" input-value="4" v-model="model" disabled>Radio 4 (Disabled)</btn>
  </btn-group>
  <hr/>
  <alert>Selected: {{model}}</alert>
</template>
<script>
  export default {
    data () {
      return {
        model: '1'
      }
    }
  }
</script>
<!-- btn-input-radio.vue -->
```

# API Reference

## [Btn.js](https://github.com/wxsms/uiv/blob/release/src/components/button/Btn.js)

### Props

Name             | Type             | Default  | Required | Description
---------------- | ----------       | -------- | -------- | -----------------------
`type`           | String           | default  |          | Button types in Bootstrap. Supported: `default`, `primary`, `info`, `success`, `warning`, `danger`, `link`.
`native-type`    | String           | button   |          | Native button type. Supported: `button`, `submit`, `reset`.
`size`           | String           |          |          | Optional button sizes. Supported: `lg`, `sm`, `xs`.
`block`          | Boolean          | false    |          | Apply block level style.
`active`         | Boolean          | false    |          | Apply active state.
`disabled`       | Boolean          | false    |          | Apply disabled state.
`href`           | String           |          |          | An native link will be created if this prop present.
`target`         | String           |          |          | Native link prop.
`to`             | String or Object |          |          | An Vue-Router link will be created if this prop present.
`replace`        | Boolean          | false    |          | Vue-Router link prop.
`append`         | Boolean          | false    |          | Vue-Router link prop.
`exact`          | Boolean          | false    |          | Vue-Router link prop.
`input-type`     | String           |          |          | Use this prop to turn btn to checkbox or radio input. Supported types: `checkbox` / `radio`
`input-value`    |                  |          |          | The value of input.
`v-model`        |                  |          |          | The model of input. Note that this prop **is required** if `input-type` present.
`justified`      | Boolean          | false    |          | Due to Bootstrap limitation, this prop is needed while using `<btn>` in `<btn-group justified>`. Otherwise it can be ignored.

### Slots

Name      | Description
--------- | -----------------------
`default` | The button body.

### Events

Name        | Params | Description
----------- | ------ | ---------------
`click`     |        | Click event of button / link.

**Note**: Use the `.native` modifier to capture browser native events such as: `@click.native="..."`, `@mouseover.native="..."`, etc.
