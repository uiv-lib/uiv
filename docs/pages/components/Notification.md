# Notification

> Displays a global notification message at a corner of the page.

## Example

```html
<template>
  <btn @click="notify" type="primary">Click to notify</btn>
</template>
<script>
  export default {
    methods: {
      notify () {
        this.$notify({
          title: 'Title',
          content: 'This is a notify message.'
        }, () => {
          // callback after dismissed
          console.log('ok')
        })
      }
    }
  }
</script>
<!-- notification-example.vue -->
```

## Types

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
        this.$notify({
          type: 'warning',
          title: 'Warning!',
          content: 'Better check yourself, you\'re not looking too good.'
        })
      },
      danger () {
        this.$notify({
          type: 'danger',
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

```html
<template>
  <section>
    <btn @click="notify('top-right')">Top Right (Default)</btn>
    <btn @click="notify('bottom-right')">Bottom Right</btn>
    <btn @click="notify('bottom-left')">Bottom Left</btn>
    <btn @click="notify('top-left')">Top Left</btn>
  </section>
</template>
<script>
  export default {
    methods: {
      notify (placement) {
        this.$notify({
          placement,
          title: 'Title',
          content: 'This is a notify message.'
        })
      }
    }
  }
</script>
<!-- notification-placements.vue -->
```
