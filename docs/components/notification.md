# Notification

> Displays a global notification message at a corner of the page.

## Example

Click on the button below to show a notification. By default, it is dismissible with a close button, and will dismiss automatically after 5000ms (both are configurable).

<notification-example/>

<<< @/.vitepress/components/notification/example.vue

## Types

There're 4 optional types of notification: `info` / `success` / `warning` / `danger` (also alias as `error`). Except `type` option, you can also use registered shortcut methods (see examples below).

Notification with specific type will has a default icon on the left, you can also change or remove the icon by `icon` option.


<notification-types/>

<<< @/.vitepress/components/notification/types.vue

## Placements

Notifications can be placed on any corner on a page.

The `position` prop defines which corner a notification will slide in. It can be `top-right` (default), `top-left`, `bottom-right` or `bottom-left`.

<notification-placements/>

<<< @/.vitepress/components/notification/placements.vue

## Dismissible

By default a notification is dismissible with a close button, you can hide it by setting `dismissible` to `false`.

<notification-dismissible/>

<<< @/.vitepress/components/notification/dismissible.vue

## With modals

By default, notifications will be covered by modal backdrops, you can fix this by adding below CSS into your project:

```css
body > .alert {
  z-index: 2000;
}
```

where `2000` can be any value that bigger than the modal z-index.

## Global method

`$notify(options, callback)` global method for `app.config.globalProperties` will be added **if uiv is installed**.

Note that the dismissed callback is optional.

The method will return a `Promise` object that resolve while the notification is dismissed (if supported by browser or with es6 promise polyfill).

## Import individually

If you prefer importing `Notification` individually:

```javascript
import { Notification } from 'uiv'
```

or:

```javascript
import Notification from 'uiv/dist/Notification'
```

The corresponding method is `Notification.notify`, with same parameters as above.

## API Reference

### [Notification](https://github.com/uiv-lib/uiv/blob/1.x/src/services/notification/Notification.vue)

These props are used as `options` in the methods above.

#### Props

Name           | Type       | Default   | Required | Description
----------     | ---------- | --------  | -------- | -----------------------
`title`        | String     |           |          | The notification title.
`content`      | String     |           |          | The notification content.
`html`         | Boolean    | `false`   |          | Allow HTML in content.
`type`         | String     |           |          | Support: `info` / `success` / `warning` / `danger`.
`duration`     | Number     | 5000      |          | Dismiss after milliseconds, use 0 to prevent self-closing.
`dismissible`  | Boolean    | true      |          | Show dismiss button.
`placement`    | String     | top-right |          | Support: `top-right` / `top-left` / `bottom-right` / `bottom-left`.
`icon`         | String     |           |          | Custom icon class, use an empty string to disable icon.
`customClass`  |            |           |          | Custom classes to alert, anything that can work with `v-bind:class` or `:class`.
`offset`       | Number     | 15        |          | The space in px between notifications.
`offsetX`      | Number     | 15        |          | The horizontal offset in px while displaying notification.
`offsetY`      | Number     | 15        |          | The vertical offset in px while displaying notification.

#### Methods

You can call a method by `$notify` or `Notification`, for example `this.$notify.dismissAll()`.

Name                                                | Params           | Description
--------------------------------------------------- | ----------       | -----------------------
`dismissAll`                                        |                  | Dismiss all notifications.
`info` / `success` / `warning` / `danger` (`error`) | String or Object | Display a corresponding notification.

