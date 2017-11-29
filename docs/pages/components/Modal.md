# Modal

> Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

## Example

Toggle a modal by clicking the button below. It will slide down and fade in from the top of the page.

A simple modal example with callback:

```html
<template>
  <section>
    <btn type="primary" @click="open=true">Launch Demo Modal</btn>
    <modal v-model="open" title="Modal 1" @hide="callback" ref="modal" id="modal-demo">
      <h4>Text in a modal</h4>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <h4>Popover in a modal</h4>
      <p>
        This
        <btn v-popover:modal-demo="{title:'Title',content:'Some popover content...'}">button</btn>
        should trigger a popover on click.
      </p>
      <h4>Tooltips in a modal</h4>
      <p>
        <a role="button" v-tooltip:modal-demo="'Tooltip'">This link</a>
        <span>and</span>
        <a role="button" v-tooltip:modal-demo="'Tooltip'">that link</a>
        <span>should have tooltips on hover.</span>
      </p>
      <hr>
      <h4>Overflowing text to show scroll behavior</h4>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    </modal>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        open: false
      }
    },
    methods: {
      callback (msg) {
        this.$notify(`Modal dismissed with msg '${msg}'.`)
      }
    }
  }
</script>
<!-- modal-example.vue -->
```

## Optional Sizes

Modals have two optional sizes: `lg` and `sm`.

```html
<template>
  <section>
    <btn type="primary" @click="open1=true">Large Modal</btn>
    <btn type="primary" @click="open2=true">Small Modal</btn>
    <modal v-model="open1" title="Modal Title" size="lg">
      <p>This is a large modal.</p>
    </modal>
    <modal v-model="open2" title="Modal Title" size="sm">
      <p>This is a small modal.</p>
    </modal>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        open1: false,
        open2: false
      }
    }
  }
</script>
<!-- modal-optional-sizes.vue -->
```

## Custom Header

* Use `title` slot to customize the modal title.
* Set `header` prop to `false` to hide the modal header.
* You can also use `header` slot to take full control of the modal header. Notice that this slot will override `title` slot since it is a completely replacement

```html
<template>
  <section>
    <btn type="primary" @click="open1=true">HTML Title</btn>
    <btn type="primary" @click="open2=true">No Header</btn>
    <modal v-model="open1">
      <span slot="title"><i class="glyphicon glyphicon-heart"></i> Modal Title</span>
      <p>This is a modal with HTML title.</p>
    </modal>
    <modal v-model="open2" :header="false">
      <p>This is a modal with no header.</p>
    </modal>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        open1: false,
        open2: false
      }
    }
  }
</script>
<!-- modal-custom-header.vue -->
```

## Custom Footer

* Use `footer` slot to customize the modal footer.
* Set `footer` prop to `false` to hide the modal footer.

```html
<template>
  <section>
    <btn type="primary" @click="open1=true">Custom Footer</btn>
    <btn type="primary" @click="open2=true">No Footer</btn>
    <modal v-model="open1" title="Modal Title">
      <p>This is a modal with custom footer.</p>
      <div slot="footer">
        <btn @click="open1=false">Cancel</btn>
        <btn type="warning">Warning Action</btn>
        <btn type="danger">Danger Action</btn>
      </div>
    </modal>
    <modal v-model="open2" title="Modal Title" :footer="false">
      <p>This is a modal with no footer.</p>
    </modal>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        open1: false,
        open2: false
      }
    }
  }
</script>
<!-- modal-custom-footer.vue -->
```

## Auto Focus

Auto focus on footer button with `data-action="auto-focus"` attribute after modal open. By default it is the OK button.

```html
<template>
  <section>
    <btn type="primary" @click="open=true">Auto Focus</btn>
    <modal v-model="open" title="Modal Title" auto-focus>
      <p>Check this out! The OK button is focused now.</p>
    </modal>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        open: false
      }
    }
  }
</script>
<!-- modal-auto-focus.vue -->
```

## Disable Backdrop

Set `backdrop` prop to `false` to disable the modal dismiss action on backdrop click.

```html
<template>
  <section>
    <btn type="primary" @click="open=true">Disable Backdrop</btn>
    <modal v-model="open" title="Modal Title" :backdrop="false">
      <p>This is a modal that can not close by backdrop click.</p>
    </modal>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        open: false
      }
    }
  }
</script>
<!-- modal-disable-backdrop.vue -->
```

## Disable Animation

Set `transition-duration` to `0` to disable modal animations.

```html
<template>
  <section>
    <btn type="primary" @click="open=true">Disable Animation</btn>
    <modal v-model="open" title="Modal Title" :transition-duration="0">
      <p>This is a modal that has no transition effect.</p>
    </modal>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        open: false
      }
    }
  }
</script>
<!-- modal-disable-animation.vue -->
```

# API Reference

## [Modal.vue](https://github.com/wxsms/uiv/blob/release/src/components/modal/Modal.vue)

### Props

Name                  | Type       | Default  | Required | Description
----------------      | ---------- | -------- | -------- | -----------------------
`v-model`             | Boolean    | false    | &#10004; | Show / hide the modal.
`title`               | String     |          |          | The modal title (will be override if title slot exist).
`size`                | String     |          |          | The alternative modal size. Support `lg` / `sm`.
`backdrop`            | Boolean    | true     |          | Dismiss the modal by backdrop click.
`footer`              | Boolean    | true     |          | Show modal footer.
`header`              | Boolean    | true     |          | Show modal header.
`cancel-text`         | String     |          |          | Override the text of cancel button.
`ok-text`             | String     |          |          | Override the text of ok button.
`transition-duration` | Number     | 150      |          | Transition time of the modal, set to 0 to disable animation.
`auto-focus`          | Boolean    | false    |          | Focus on the action button that has `data-action="auto-focus"` attribute after modal open, by default it is the OK button.
`keyboard`            | Boolean    | true     |          | Close the modal after `esc` key pressed.
`before-close`        | Function   |          |          | Return `false` in this function to interrupt the modal hiding process, otherwise return `true` to act as normal.

### Slots

Name      | Description
--------- | -----------------------
`title`   | Replace as the modal title.
`default` | Replace as the modal body.
`header`  | Replace as the modal header. Note: this slot will override `title` slot since it is a completely replacement of header.
`footer`  | Replace as the modal footer.

### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | Fire after modal show.
`hide`      | msg    | Fire after modal dismiss with message (if exist).
