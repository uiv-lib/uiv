# Breadcrumbs 面包屑导航

> Indicate the current page's location within a navigational hierarchy.

## Example

Use `items` array to create a breadcrumbs nav. `active` state of last element is automatically set if it is undefined.

<breadcrumbs-example/>

<<< @/docs/.vuepress/components/breadcrumbs/example.vue

## Breadcrumb item

You can also use `<breadcrumb-item>` in breadcrumbs directly. This is useful while full control of item text is need (e.g. HTML tags).

::: tip
The `active` state will not be automatically set if using this mode.
:::

<breadcrumbs-breadcrumbs-item/>

<<< @/docs/.vuepress/components/breadcrumbs/breadcrumbs-item.vue

## Router link

Parse `to` (String or Object) instead of `href` will create a `router-link` for the breadcrumb item, which you can use with [Vue-Router](https://router.vuejs.org/).

<breadcrumbs-router-link/>

<<< @/docs/.vuepress/components/breadcrumbs/router-link.vue

## API Reference

### [Breadcrumbs](https://github.com/uiv-lib/uiv/blob/1.x/src/components/breadcrumbs/Breadcrumbs.js)

#### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`items`          | Array      |          |          | Breadcrumb items to create. Props defined in each item object is the same with BreadcrumbItem.vue, except `text` will be replace as the breadcrumb item body.

#### Slots

Name      | Description
--------- | -----------------------
`default` | The breadcrumbs body.

### [BreadcrumbItem](https://github.com/uiv-lib/uiv/blob/1.x/src/components/breadcrumbs/BreadcrumbItem.js)

#### Props

Name             | Type             | Default  | Required | Description
---------------- | ----------       | -------- | -------- | -----------------------
`active`          | Boolean          | false    |          | Set item to active state.
`href`           | String           |          |          | An native link will be created if this prop present.
`target`         | String           |          |          | Native link prop.
`to`             | String or Object |          |          | An Vue-Router link will be created if this prop present.
`replace`        | Boolean          | false    |          | Vue-Router link prop.
`append`         | Boolean          | false    |          | Vue-Router link prop.
`exact`          | Boolean          | false    |          | Vue-Router link prop.

#### Slots

Name      | Description
--------- | -----------------------
`default` | The breadcrumb item body.
