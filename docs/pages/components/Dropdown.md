# Dropdown

> Add dropdown menus to nearly anything, including the navbar, tabs, and pills.

## Examples

Order to decide the dropdown trigger:

1. The element attached with `data-role="trigger"` inside the default slot (if exist).
1. The element has `dropdown-toggle` class inside the default slot (if exist).
2. The first element inside the default slot.

Use `v-model` to indicate the dropdown status.

```html
<dropdown ref="dropdown">
  <btn type="primary" class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<dropdown>
  <btn type="info">Split Button</btn>
  <btn type="info" class="dropdown-toggle"><span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown-examples.vue -->
```

## Alignment

By default, a dropdown menu is automatically positioned 100% from the top and along the left side of its parent. Add `menu-right` to a dropdown component to right align the dropdown menu.

```html
<dropdown menu-right>
  <btn class="dropdown-toggle">Menu-Right <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown-menu-right.vue -->
```

## Dropup

Dropdown menus can be changed to expand upwards (instead of downwards) by adding `dropup` to the dropdown component.

```html
<dropdown dropup>
  <btn class="dropdown-toggle">Dropup <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown-dropup.vue -->
```

## Append to body

Use this option to avoid influence from the parent node by appending dropdown list to `<body>`.

```html
<!-- dropdown with append-to-body -->
<dropdown append-to-body>
  <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown with append-to-body + menu-right -->
<dropdown append-to-body menu-right>
  <btn class="dropdown-toggle">Menu-Right <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown with append-to-body + dropup -->
<dropdown append-to-body dropup>
  <btn class="dropdown-toggle">Dropup <span class="caret"></span></btn>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<!-- dropdown-append-to-body.vue -->
```

## Within navbar

```html
<navbar>
  <a slot="brand" class="navbar-brand" role="button">Brand</a>
  <template slot="collapse">
    <navbar-nav>
      <dropdown tag="li">
        <a class="dropdown-toggle" role="button">Dropdown 1<span class="caret"></span></a>
        <template slot="dropdown">
          <li><a role="button">Action</a></li>
          <li><a role="button">Another action</a></li>
          <li><a role="button">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a role="button">Separated link</a></li>
        </template>
      </dropdown>
      <dropdown tag="li">
        <a class="dropdown-toggle" role="button">Dropdown 2<span class="caret"></span></a>
        <template slot="dropdown">
          <li><a role="button">Action</a></li>
          <li><a role="button">Another action</a></li>
          <li><a role="button">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a role="button">Separated link</a></li>
        </template>
      </dropdown>
    </navbar-nav>
    <navbar-nav right>
      <dropdown tag="li">
        <a class="dropdown-toggle" role="button">Dropdown 3<span class="caret"></span></a>
        <template slot="dropdown">
          <li><a role="button">Action</a></li>
          <li><a role="button">Another action</a></li>
          <li><a role="button">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a role="button">Separated link</a></li>
        </template>
      </dropdown>
    </navbar-nav>
  </template>
</navbar>
<!-- dropdown-within-navbar.vue -->
```

## Within pills

```html
<ul class="nav nav-pills" role="tablist">
  <li role="presentation" class="active"><a href="javascript:void(0)">Regular link</a></li>
  <dropdown tag="li">
    <a class="dropdown-toggle" role="button">Dropdown <span class="caret"></span></a>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
  <dropdown tag="li">
    <a class="dropdown-toggle" role="button">Dropdown <span class="caret"></span></a>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
</ul>
<!-- dropdown-within-pills.vue -->
```

## Advanced

You can place anything you wish inside a dropdown, for example, a simple form with checkboxes:

Note: use `not-close-elements` to prevent dropdown close on menu body click if needed.

```html
<template>
  <section>
    <alert>You selected: {{selected}}</alert>
    <dropdown ref="dropdown" :not-close-elements="ele" v-model="show" class="dropdown-form">
      <btn type="primary" class="dropdown-toggle">Dropdown Form <span class="caret"></span></btn>
      <template slot="dropdown">
        <li class="checkbox">
          <label>
            <input type="checkbox" value="Vue" v-model="selected"> Vue
          </label>
        </li>
        <li class="checkbox">
          <label>
            <input type="checkbox" value="Bootstrap" v-model="selected"> Bootstrap
          </label>
        </li>
        <li class="checkbox">
          <label>
            <input type="checkbox" value="JavaScript" v-model="selected"> JavaScript
          </label>
        </li>
        <li>
          <btn block type="primary" @click="show=false">Apply</btn>
        </li>
      </template>
    </dropdown>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        ele: [],
        selected: []
      }
    },
    mounted () {
      this.ele.push(this.$refs.dropdown.$el)
    }
  }
</script>
<style>
  .dropdown-form .dropdown-menu {
    padding: 10px
  }
</style>
<!-- dropdown-advanced.vue -->
```


# API Reference

## [Dropdown](https://github.com/wxsms/uiv/blob/release/src/components/dropdown/Dropdown.vue)

### Props

Name                 | Type       | Default  | Required | Description
----------------     | ---------- | -------- | -------- | -----------------------
`v-model`            | Boolean    |          |          | Indicate the dropdown status (show / hide).
`tag`                | String     | div      |          | The HTML tag that render the dropdown component.
`append-to-body`     | Boolean    | false    |          | Append the dropdown slot to body.
`dropup`             | Boolean    | false    |          | Use dropup style.
`menu-right`         | Boolean    | false    |          | Use dropdown-menu-right style.
`disabled`           | Boolean    | false    |          | Disable the dropdown.
`not-close-elements` | Array      |          |          | Pass an array of element which the dropdown will not close on click.
`position-element`   | Element    | this.$el |          | Pass an HTML element which the dropdown will be positioned by (in append-to-body mode).

### Slots

Name      | Description
--------- | -----------------------
`dropdown` | Replace as the dropdown body.
`default` | Replace as the rest of the component (e.g. trigger stuffs).
