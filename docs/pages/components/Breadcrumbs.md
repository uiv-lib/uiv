# Breadcrumbs

> Indicate the current page's location within a navigational hierarchy.

## Example

Use `items` array to create a breadcrumbs nav. `active` state of last element is automatically set if it is undefined.

```html
<template>
  <breadcrumbs :items="items"/>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {text: 'Home', href: '#'},
          {text: 'Library', href: '#'},
          {text: 'Data', href: '#'}
        ]
      }
    }
  }
</script>
<!-- breadcrumbs-example.vue -->
```


## Breadcrumb Item

You can also use `<breadcrumb-item>` in breadcrumbs directly. This is useful while full control of item text is need (e.g. HTML tags).

Note that `active` state will not automatically set if using this mode.

```html
<breadcrumbs>
  <breadcrumb-item href="#"><b>Home</b></breadcrumb-item>
  <breadcrumb-item href="#">Library</breadcrumb-item>
  <breadcrumb-item :active="true">Data</breadcrumb-item>
</breadcrumbs>
<!-- breadcrumbs-item.vue -->
```

## Router Link

Parse `to` (String or Object) instead of `href` will create a `router-link` for the breadcrumb item, which you can use with [Vue-Router](https://router.vuejs.org/).

```html
<template>
  <breadcrumbs :items="items"/>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {text: 'Home', to: '/', exact: true},
          {text: 'Breadcrumbs', to: '/breadcrumbs'}
        ]
      }
    }
  }
</script>
<!-- breadcrumbs-router-link.vue -->
```

# API Reference

## [Breadcrumbs.vue](https://github.com/wxsms/uiv/tree/master/src/components/breadcrumbs/Breadcrumbs.vue)

<div class="table-responsive">
  <table class="table table-bordered">
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
      <td nowrap="nowrap"><code>items</code></td>
      <td>Array</td>
      <td></td>
      <td></td>
      <td>Breadcrumb items to create. Props defined in each item object is the same with BreadcrumbItem.vue, except <code>text</code> will be replace as the breadcrumb item body.</td>
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
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">The breadcrumbs body.</td>
    </tr>
    </tbody>
  </table>
</div>

## [BreadcrumbItem.vue](https://github.com/wxsms/uiv/tree/master/src/components/breadcrumbs/BreadcrumbItem.vue)

<div class="table-responsive">
  <table class="table table-bordered">
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
      <td nowrap="nowrap"><code>acive</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Set item to active state.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>href</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>An native link will be created if this prop present.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>target</code></td>
      <td>String</td>
      <td>_self</td>
      <td></td>
      <td>Native link prop.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>to</code></td>
      <td>String or Object</td>
      <td></td>
      <td></td>
      <td>An Vue-Router link will be created if this prop present.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>replace</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Vue-Router link prop.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>append</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Vue-Router link prop.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>exact</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Vue-Router link prop.</td>
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
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">The breadcrumb item body.</td>
    </tr>
    </tbody>
  </table>
</div>
