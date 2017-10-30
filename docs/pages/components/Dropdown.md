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
  <button class="btn btn-primary dropdown-toggle" type="button">Dropdown <span class="caret"></span></button>
  <template slot="dropdown">
    <li><a role="button">Action</a></li>
    <li><a role="button">Another action</a></li>
    <li><a role="button">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a role="button">Separated link</a></li>
  </template>
</dropdown>
<dropdown class="btn-group">
  <button type="button" class="btn btn-info">Split Button</button>
  <button type="button" class="btn btn-info dropdown-toggle"><span class="caret"></span></button>
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
  <button class="btn btn-default dropdown-toggle" type="button">Menu-Right <span class="caret"></span></button>
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
  <button class="btn btn-default dropdown-toggle" type="button">Dropup <span class="caret"></span></button>
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

## Append To Body

Use this option to avoid influence from the parent node by appending dropdown list to `<body>`.

```html
<!-- dropdown with append-to-body -->
<dropdown append-to-body>
  <button class="btn btn-default dropdown-toggle" type="button">Dropdown <span class="caret"></span></button>
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
  <button class="btn btn-default dropdown-toggle" type="button">Menu-Right <span class="caret"></span></button>
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
  <button class="btn btn-default dropdown-toggle" type="button">Dropup <span class="caret"></span></button>
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

## Within Navbar

```html
<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" @click="showNavbar=!showNavbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" role="button">Brand</a>
      </div>
      <collapse class="navbar-collapse" v-model="showNavbar">
        <ul class="nav navbar-nav">
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
        </ul>
        <ul class="nav navbar-nav navbar-right">
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
        </ul>
      </collapse>
    </div>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        showNavbar: false
      }
    }
  }
</script>
<!-- dropdown-within-navbar.vue -->
```

## Within Pills

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

# API Reference

## [Dropdown.vue](https://github.com/wxsms/uiv/tree/master/src/components/dropdown/Dropdown.vue)

### Props

Name                 | Type       | Default  | Required | Description
----------------     | ---------- | -------- | -------- | -----------------------
`v-model`            | Boolean    |          |          | Indicate the dropdown status (show / hide).
`tag`                | String     | div      |          | The HTML tag that render the dropdown component.
`append-to-body`     | Boolean    | false    |          | Append the dropdown slot to body.
`dropup`             | Boolean    | false    |          | Use dropup style.
`menu-right`         | Boolean    | false    |          | Use dropdown-menu-right style.
`not-close-elements` | Array      |          |          | Pass an array of element which the dropdown will not close on click.
`position-element`   | Element    | this.$el |          | Pass an HTML element which the dropdown will be positioned by (in append-to-body mode).

### Slots

Name      | Description
--------- | -----------------------
`dropdown` | Replace as the dropdown body.
`default` | Replace as the rest of the component (e.g. trigger stuffs).
