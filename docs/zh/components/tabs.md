# Tabs 标签页

> Add quick, dynamic tab functionality to transition through panes of local content, even via dropdown menus. **Nested tabs are not supported**.

## Example

<br/>

<tabs-example/>

<<< @/.vitepress/components/tabs/example.vue

## Disable tabs

Add `disabled` to `<tab>` to disable it.

<tabs-disabled/>

<<< @/.vitepress/components/tabs/disabled.vue

## Pull right

Add `pull-right` to `<tab>` to pull it right. A grouped tab will be pulled to right if one of its sub-tabs has this prop set to `true`.

<tabs-pull-right/>

<<< @/.vitepress/components/tabs/pull-right.vue

## Justified style

Add `justified` to `<tabs>` to apply justified style.

<tabs-justified/>

<<< @/.vitepress/components/tabs/justified.vue

## Pills style

Add `pills` to `<tabs>` to apply pills style.

Pills are also vertically stackable by adding `stacked`, but if you want the nav and content parts to have layout such as 2 column, you may need some custom CSS apply to them.

<tabs-pills/>

<<< @/.vitepress/components/tabs/pills.vue

## Custom titles

With `title` slot you can place any content inside nav tabs.

<tabs-custom-titles/>

<<< @/.vitepress/components/tabs/custom-titles.vue

## With callbacks

<br/>

<tabs-callbacks/>

<<< @/.vitepress/components/tabs/callbacks.vue

## With `nav-right` slot

<br/>

<tabs-nav-right-slot/>

<<< @/.vitepress/components/tabs/nav-right-slot.vue

## Dynamic tabs

An example that generate closable tabs using `v-for`:

<tabs-dynamic/>

<<< @/.vitepress/components/tabs/dynamic.vue

## Validate before change

In case you need to validate something inside a tab before it being switch, a sample implementation using `before-change` event:

<tabs-before-change/>

<<< @/.vitepress/components/tabs/before-change.vue

## API Reference

### [Tabs](https://github.com/uiv-lib/uiv/blob/1.x/src/components/tabs/Tabs.vue)

#### Props

Name                  | Type       | Default  | Required | Description
----------------      | ---------- | -------- | -------- | -----------------------
`v-model`             | Number     |          |          | The current tab index, use this to manual change tab index.
`justified`           | Boolean    | false    |          | Use justified style.
`pills`               | Boolean    | false    |          | Use pills style.
`stacked`             | Boolean    | false    |          | Use stacked style, note that this have to work with `pills`.
`transition`          | Number     | 150      |          | The tabs show / hide transition time in ms. Use 0 to disable transitions.
`custom-nav-class`    |            |          |          | Apply custom classes to the tab nav, could be Object or String.
`custom-content-class`|            |          |          | Apply custom classes to the tab content, could be Object or String.

#### Slots

Name        | Description
---------   | -----------------------
`default`   | The tabs content.
`nav-right` | The snip at right side of tab nav. Note: it won't display if using justified style.

#### Events

Name            | Params                   | Description
--------------- | -----------              | ---------------
`change`        | index                    | Trigger after active tab changed, with the active index.
`before-change` | indexFrom, indexTo, done | Trigger before active tab change. Calling `done()` will allow the change. Calling `done(err)`, where `err` is any value, will prevent it. Note that this callback will only trigger on tab clicking.
`changed`       | index                    | Trigger after tab changed and transition finished, with the active index.

### [Tab](https://github.com/uiv-lib/uiv/blob/1.x/src/components/tabs/Tab.vue)

#### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`title`          | String     |          |          | The tab title.
`tab-classes`    | Object     | {}       |          | Object where keys represent class and value is interpreted as a boolean to indicate whether the class should be shown
`disabled`       | Boolean    | false    |          | Disable the tab.
`group`          | String     |          |          | Tabs nav with same group will in a dropdown list.
`pull-right`     | Boolean    | false    |          | Add `pull-right` class to the tab nav. A grouped tab will be pull to right if one of its sub-tabs has this prop set to `true`.
`hidden`         | Boolean    | false    |          | Hide the tab, use this prop because `v-show` doesn't work on Tab component.

#### Slots

Name        | Description
---------   | -----------------------
`title`     | Title slot. This will override `title` or `html-title` prop if exist.
