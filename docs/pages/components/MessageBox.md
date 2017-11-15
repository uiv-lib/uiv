# Message Box

> A set of modal boxes simulating system message box, mainly for alerting information, confirm operations and prompting messages.

By design MessageBox provides simulations of browsers' `alert`, `confirm` and `prompt`. Use Modal instead if needed more complicated contents.

**Note**: 

* Prototype methods such as `$alert` required lib to be installed firstly.
* Each of these methods will return a `Promise` object while the box is closed (if supported by browser or with es6 promise polyfill), you can also use callbacks.

## Alert

Displays an alert modal with the optional specified content and an OK (auto-focused) button. By default it can not be closed on backdrop click.

An alert example using callback:

```html
<template>
  <btn @click="alert">Click to open an alert modal</btn>
</template>
<script>
  export default {
    methods: {
      alert () {
        this.$alert({
          title: 'Title',
          content: 'This is an alert message.'
        }, () => {
          // callback after modal dismissed
          console.log('ok')
        })
      }
    }
  }
</script>
<!-- message-box-alert.vue -->
```

## Confirm

Displays a modal dialog with an optional message and two buttons, OK (auto-focused) and Cancel.

A confirm example using `Promise`:

```html
<template>
  <btn @click="confirm">Click to open a confirm modal</btn>
</template>
<script>
  export default {
    methods: {
      confirm () {
        this.$confirm({
          title: 'Confirm',
          content: 'This item will be permanently deleted. Continue?'
        })
          .then(() => {
            // confirm
            console.log('ok')
          })
          .catch(() => {
            // cancel
            console.log('cancel')
          })
      }
    }
  }
</script>
<!-- message-box-confirm.vue -->
```

## Prompt

Displays a dialog with an optional message prompting the user to input some text.

```html
<template>
  <btn @click="confirm">Click to open a prompt modal</btn>
</template>
<script>
  export default {
    methods: {
      confirm () {
        this.$prompt({
          title: 'Welcome',
          content: 'Please input your email:',
          // A simple input validator
          // returns the err msg (not valid) or null (valid)
          validator (value) {
            return /\S+@\S+\.\S+/.test(value) ? null : 'Email address is not valid!'
          }
        })
          .then((value) => {
            // confirm with user input as value
            console.log(value)
          })
          .catch(() => {
            // cancel
            console.log('cancel')
          })
      }
    }
  }
</script>
<!-- message-box-prompt.vue -->
```
