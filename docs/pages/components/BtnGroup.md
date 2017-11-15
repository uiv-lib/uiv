# Button Group

> Group a series of buttons together on a single line with the button group.

**Note**: When using tooltips or popovers on elements within a btn-group, make sure they're appended to body.

## Example

Wrap a series of `<btn>` in `<btn-group>`.

```html
<btn-group>
  <btn>Left</btn>
  <btn>Middle</btn>
  <btn>Right</btn>
</btn-group>
<!-- btn-group-example.vue -->
```

## Button Toolbar

Combine sets of `<btn-group>` into a `<btn-toolbar>` for more complex components.

```html
<btn-toolbar>
  <btn-group>
    <btn>1</btn>
    <btn>2</btn>
    <btn>3</btn>
    <btn>4</btn>
  </btn-group>
  <btn-group>
    <btn>5</btn>
    <btn>6</btn>
    <btn>7</btn>
  </btn-group>
  <btn-group>
    <btn>8</btn>
  </btn-group>
</btn-toolbar>
<!-- btn-group-toolbar.vue -->
```

## Sizing

Instead of applying button sizing classes to every button in a group, just add `size` to each `<btn-group>`, including when nesting multiple groups.

```html
<p>
  <btn-group size="lg">
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
</p>
<p>
  <btn-group>
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
</p>
<p>
  <btn-group size="sm">
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
</p>
<p>
  <btn-group size="xs">
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
</p>
<!-- btn-group-sizes.vue -->
```

## Nesting

`btn-group` class will be automatically added to `<dropdown>` when you want dropdown menus mixed with a series of buttons.

```html
<btn-group>
  <btn>Left</btn>
  <btn>Middle</btn>
  <dropdown>
    <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
  <btn>Right</btn>
</btn-group>
<!-- btn-group-nesting.vue -->
```

## Vertical

Make a set of buttons appear vertically stacked rather than horizontally by adding `vertical`. 

**Note**: Split button dropdowns are not supported here.

```html
<btn-group vertical>
  <btn>Top</btn>
  <btn>Center</btn>
  <dropdown>
    <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
  <btn>Bottom</btn>
</btn-group>
<!-- btn-group-vertical.vue -->
```

## Justified

Make a group of buttons stretch at equal sizes to span the entire width of its parent by adding `justified`. Also works with button dropdowns within the button group.

**Note: Due to Bootstrap limitation, `justified` prop on `<btn>` is needed while it is render as `button`.**

```html
<btn-group justified>
  <btn href="javascript:;">Left</btn>
  <btn href="javascript:;">Middle</btn>
  <btn href="javascript:;">Right</btn>
</btn-group>
<br/>
<btn-group justified>
  <btn justified>Left</btn>
  <btn justified>Middle</btn>
  <dropdown>
    <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
</btn-group>
<!-- btn-group-justified.vue -->
```

# API Reference

## [BtnGroup.js](https://github.com/wxsms/uiv/tree/master/src/components/button/BtnGroup.js)

### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`size`           | String     |          |          | Optional button sizes. Supported: `lg`, `sm`, `xs`.
`vertical`       | Boolean    | false    |          | Apply vertical style.
`justified`      | Boolean    | false    |          | Apply justified style.

### Slots

Name      | Description
--------- | -----------------------
`default` | The button group body.

## [BtnToolbar.js](https://github.com/wxsms/uiv/tree/master/src/components/button/BtnToolbar.js)

This component has no props.
