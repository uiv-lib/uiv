# Dropdown

> Add dropdown menus to nearly anything, including the navbar, tabs, and pills.

## Examples

The element attached with `data-role="trigger"` will be the dropdown trigger, use `v-model` instead if you want manual control.

```html
<template>
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
  <dropdown class="btn-group" v-model="open1" :dropup="dropup" :menu-right="menuRight" style="display: inline-block">
    <button type="button" class="btn btn-info">Split Button</button>
    <button type="button" class="btn btn-info dropdown-toggle" @click="open1 = !open1">
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
</template>

<script>
  export default {
    data () {
      return {
        dropup: false,
        menuRight: false,
        open1: false
      }
    }
  }
</script>
<!-- Live demo -->
```

### Append To Body

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

<!-- Live demo -->
```

# API Reference

## [Dropdown.vue](https://github.com/wxsms/uiv/tree/master/src/components/dropdown/Dropdown.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Note</span></td>
    </tr>
    <tr>
      <td colspan="5">The element attached with <code>data-role="trigger"</code>
        will be the dropdown trigger, use <code>v-model</code> instead if you want manual control.
      </td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>v-model</code></td>
      <td>Boolean</td>
      <td></td>
      <td></td>
      <td>Show / hide the dropdown.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>tag</code></td>
      <td>String</td>
      <td>div</td>
      <td></td>
      <td>The HTML tag that render the dropdown component.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>append-to-body</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Append the dropdown slot to body.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>dropup</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Use dropup style.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>menu-right</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Use dropdown-menu-right style.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>not-close-elements</code></td>
      <td>Array</td>
      <td></td>
      <td></td>
      <td>Pass an array of element which the dropdown will not close on click.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>position-element</code></td>
      <td></td>
      <td>this.$el</td>
      <td></td>
      <td>Pass an HTML element which the dropdown will be positioned by (in append-to-body mode).
      </td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Slots</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th colspan="4">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>dropdown</code></td>
      <td colspan="4">Replace as the dropdown body</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">Replace as the rest of the component (e.g. trigger stuffs)</td>
    </tr>
    </tbody>
  </table>
</div>


<!-- Live demo script
<script>
  export default {
    data () {
      return {
        dropup: false,
        menuRight: false,
        open1: false,
        open: false
      }
    }
  }
</script>
-->
