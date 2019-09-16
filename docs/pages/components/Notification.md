# Notification

> Displays a global notification message at a corner of the page.

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4714899946256166"
     data-ad-slot="4603582855"></ins>

## Example

Click on the button below to show a notification. By default, it is dismissible with a close button, and will dismiss automatically after 5000ms (both are configurable).

```html
<template>
  <section>
    <btn @click="notify" type="primary">Simplest Notification</btn>
    <btn @click="notify2" type="primary">No Auto-dismiss Notification</btn>
  </section>
</template>
<script>
  export default {
    methods: {
      // example with callback
      // pass a String as the notification content
      notify () {
        this.$notify('This is a simple notify msg.', () => {
          // callback after dismissed
          console.log('dismissed')
        })
      },
      // example with Promise and options
      notify2 () {
        this.$notify({
          title: 'Title',
          content: 'This notification will not dismiss automatically.',
          duration: 0
        }).then(() => {
          // resolve after dismissed
          console.log('dismissed')
        })
      }
    }
  }
</script>
<!-- notification-example.vue -->
```

## Types

There're 4 optional types of notification: `info` / `success` / `warning` / `danger` (also alias as `error`). Except `type` option, you can also use registered shortcut methods (0.33.0+, see examples below).

Notification with specific type will has a default icon on the left, you can also change or remove the icon by `icon` option.


```html
<template>
  <section>
    <btn @click="info" type="info">Info</btn>
    <btn @click="success" type="success">Success</btn>
    <btn @click="warning" type="warning">Warning</btn>
    <btn @click="danger" type="danger">Danger</btn>
  </section>
</template>
<script>
  export default {
    methods: {
      info () {
        this.$notify({
          type: 'info',
          title: 'Heads up!',
          content: 'This alert needs your attention, but it\'s not super important.'
        })
      },
      success () {
        this.$notify({
          type: 'success',
          title: 'Well done!',
          content: 'You successfully read this important alert message.'
        })
      },
      warning () {
        // simple warning with content only
        this.$notify.warning('Better check yourself, you\'re not looking too good.')
      },
      danger () {
        // error msg with title and content (other options available too)
        // `error` is an alias of `danger` (both of them works)
        this.$notify.error({
          title: 'Oh snap!',
          content: 'Change a few things up and try submitting again.'
        })
      }
    }
  }
</script>
<!-- notification-types.vue -->
```

## Placements

Notifications can be placed on any corner on a page.

The `position` prop defines which corner a notification will slide in. It can be `top-right` (default), `top-left`, `bottom-right` or `bottom-left`.

```html
<template>
  <section>
    <btn @click="notify('top-right')" type="primary">Top Right (Default)</btn>
    <btn @click="notify('bottom-right')" type="primary">Bottom Right</btn>
    <btn @click="notify('bottom-left')" type="primary">Bottom Left</btn>
    <btn @click="notify('top-left')" type="primary">Top Left</btn>
  </section>
</template>
<script>
  export default {
    methods: {
      notify (placement) {
        this.$notify({
          placement, // equal to `placement: placement` in ES6
          title: 'Title',
          content: `This is a notify msg at ${placement}.`
        })
      }
    }
  }
</script>
<!-- notification-placements.vue -->
```

## Dismissible

By default a notification is dismissible with a close button, you can hide it by setting `dismissible` to `false`.

```html
<template>
  <btn @click="notify" type="primary">Notification Without Dismiss Button</btn>
</template>
<script>
  export default {
    methods: {
      notify () {
        this.$notify({
          title: 'Title',
          content: 'This is a notification without dismiss btn.',
          dismissible: false
        })
      }
    }
  }
</script>
<!-- notification-without-dismiss-btn.vue -->
```

## With modals

By default, notifications will be covered by modal backdrops, you can fix this by adding below CSS into your project:

```css
body > .alert {
  z-index: 2000;
}
```

where `2000` can be any value that bigger than the modal z-index.

## Global method

`$notify(options, callback)` global method for `Vue.prototype` will be added **if uiv is installed**.

Note that the dismissed callback is optional.

The method will return a `Promise` object that resolve while the notification is dismissed (if supported by browser or with es6 promise polyfill).

## Import individually

If you prefer importing `Notification` individually:

```javascript
import { Notification } from 'uiv'
```

The corresponding method is `Notification.notify`, with same parameters as above.

# API Reference

## [Notification](https://github.com/wxsms/uiv/blob/master/src/services/notification/Notification.vue)

These props are used as `options` in the methods above.

### Props

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

### Methods

You can call a method by `$notify` or `Notification`, for example `this.$notify.dismissAll()`.

Name                                                | Params           | Description
--------------------------------------------------- | ----------       | -----------------------
`dismissAll`                                        |                  | Dismiss all notifications.
`info` / `success` / `warning` / `danger` (`error`) | String or Object | Display a corresponding notification.

