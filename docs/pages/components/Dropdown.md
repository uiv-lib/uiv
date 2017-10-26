# Dropdown

> Add dropdown menus to nearly anything, including the navbar, tabs, and pills.

## Examples

The element attached with `data-role="trigger"` will be the dropdown trigger, use `v-model` instead if you want manual control.

```html
<template>
  <section>
    <!-- This one is using data-role="trigger" -->
    <dropdown ref="dropdown" :dropup="dropup" :menu-right="menuRight" style="display: inline-block">
      <button data-role="trigger" class="btn btn-primary dropdown-toggle" type="button">
        <span>Dropdown</span>
        <span class="caret"></span>
      </button>
      <template slot="dropdown">
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </dropdown>
    <!-- This one is using v-model -->
    <dropdown class="btn-group" v-model="open" :dropup="dropup" :menu-right="menuRight" style="display: inline-block">
      <button type="button" class="btn btn-info">Split Button</button>
      <button type="button" class="btn btn-info dropdown-toggle" @click="open = !open">
        <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <template slot="dropdown">
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </dropdown>
    <hr/>
    <h4>Settings</h4>
    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-xs-12">
          <label class="checkbox-inline">
            <input v-model="dropup" type="checkbox"> Dropup
          </label>
          <label class="checkbox-inline">
            <input v-model="menuRight" type="checkbox"> Menu On Right
          </label>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        dropup: false,
        menuRight: false,
        open: false
      }
    }
  }
</script>
<!-- dropdown-examples.vue -->
```

## Append To Body

Use this option to avoid influence from the parent node by appending dropdown list to `<body>`.

```html
<dropdown :append-to-body="true" style="display: inline-block">
  <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
    <span>This Dropdown Will Append To Body</span>
    <span class="caret"></span>
  </button>
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
            <a class="dropdown-toggle" role="button" data-role="trigger">Dropdown 1<span class="caret"></span></a>
            <template slot="dropdown">
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </dropdown>
          <dropdown tag="li">
            <a class="dropdown-toggle" role="button" data-role="trigger">Dropdown 2<span class="caret"></span></a>
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
            <a class="dropdown-toggle" role="button" data-role="trigger">Dropdown 3<span class="caret"></span></a>
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
    <a class="dropdown-toggle" role="button" data-role="trigger">Dropdown<span class="caret"></span></a>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
  <dropdown tag="li">
    <a class="dropdown-toggle" role="button" data-role="trigger">Dropdown<span class="caret"></span></a>
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
`v-model`            | Boolean    |          |          | Show / hide the dropdown body.
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
