# Modal

> Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

## Example

Toggle a modal by clicking the button below. It will slide down and fade in from the top of the page.

```html
<template>
  <button type="button" class="btn btn-primary" @click="open1=true" id="btn-1">Launch Demo Modal</button>
  <span id="modal1-msg" style="margin-left: 10px">{{msg || 'A simple modal example with callback.'}}</span>
  <modal id="modal-demo-1" ref="modal1" v-model="open1" title="Modal 1" @hide="dismissCallback">
    <h4>Text in a modal</h4>
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    <h4>Popover in a modal</h4>
    <popover title="A Title" placement="right" append-to="#modal-demo-1 [role=dialog]">
      <p>
        This
        <a role="button" class="btn btn-default" data-role="trigger">button</a> should trigger a popover on click.
      </p>
      <div slot="popover">And here's some amazing content. It's very engaging. right?</div>
    </popover>
    <h4>Tooltips in a modal</h4>
    <p>
      <tooltip text="Tooltip" append-to="#modal-demo-1 [role=dialog]">
        <a role="button" class="tooltip-test">This link</a>
      </tooltip>
      <span>and</span>
      <tooltip text="Tooltip" append-to="#modal-demo-1 [role=dialog]">
        <a role="button" class="tooltip-test">that link</a>
      </tooltip>
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
</template>

<script>
  export default {
    data () {
      return {
        msg: '',
        open1: false
      }
    },
    methods: {
      dismissCallback (msg) {
        this.msg = `Modal dismiss with msg '${msg}'.`
      }
    }
  }
</script>
<!-- Live demo -->
```

## Optional Sizes

Modals have two optional sizes: `lg` and `sm`.

```html
<template>
  <button type="button" class="btn btn-primary" @click="open2=true" id="btn-2">Large Modal</button>
  <button type="button" class="btn btn-primary" @click="open3=true" id="btn-3">Small Modal</button>
  <modal v-model="open2" title="Modal Title" size="lg">
    <p>This is a large modal.</p>
  </modal>
  <modal v-model="open3" title="Modal Title" size="sm">
    <p>This is a small modal.</p>
  </modal>
</template>

<script>
  export default {
    data () {
      return {
        open2: false,
        open3: false
      }
    }
  }
</script>
<!-- Live demo -->
```

## Custom Header

* Use `title` slot to customize the modal title.
* Set `header` prop to `false` to hide the modal header.
* You can also use `header` slot to take full control of the modal header. Notice that this slot will override `title` slot since it is a completely replacement

```html
<template>
  <button type="button" class="btn btn-primary" @click="open4=true" id="btn-4">HTML Title</button>
  <button type="button" class="btn btn-primary" @click="open5=true" id="btn-5">No Header</button>
  <modal v-model="open4">
    <span slot="title"><i class="glyphicon glyphicon-heart"></i> Modal Title</span>
    <p>This is a modal with HTML title.</p>
  </modal>
  <modal v-model="open5" :header="false">
    <p>This is a modal with no header.</p>
  </modal>
</template>

<script>
  export default {
    data () {
      return {
        open4: false,
        open5: false
      }
    }
  }
</script>
<!-- Live demo -->
```

## Custom Footer

* Use `footer` slot to customize the modal footer.
* Set `footer` prop to `false` to hide the modal footer.

```html
<template>
  <button type="button" class="btn btn-primary" @click="open6=true" id="btn-6">Custom Footer</button>
  <button type="button" class="btn btn-primary" @click="open7=true" id="btn-7">No Footer</button>
  <modal v-model="open6" title="Modal Title">
    <p>This is a modal with custom footer.</p>
    <div slot="footer">
      <button type="button" class="btn btn-default" @click="open6=false">Cancel</button>
      <button type="button" class="btn btn-warning">Warning Action</button>
      <button type="button" class="btn btn-danger">Danger Action</button>
    </div>
  </modal>
  <modal v-model="open7" title="Modal Title" :footer="false">
    <p>This is a modal with no footer.</p>
  </modal>
</template>

<script>
  export default {
    data () {
      return {
        open6: false,
        open7: false
      }
    }
  }
</script>
<!-- Live demo -->
```

## Auto Focus

Auto focus on footer button with `data-action="auto-focus"` attribute after modal open. By default it is the OK button.

```html
<template>
  <button type="button" class="btn btn-primary" @click="open8=true" id="btn-8">Auto Focus</button>
  <modal v-model="open8" title="Modal Title" :auto-focus="true">
    <p>Check this out! The OK button is focused now.</p>
  </modal>
</template>

<script>
  export default {
    data () {
      return {
        open8: false
      }
    }
  }
</script>
<!-- Live demo -->
```

## Disable Backdrop

Set `backdrop` prop to `false` to disable the modal dismiss action on backdrop click.

```html
<template>
  <button type="button" class="btn btn-primary" @click="open9=true" id="btn-9">Disable Backdrop</button>
  <modal v-model="open9" title="Modal Title" :backdrop="false">
    <p>This is a modal that can not close by backdrop click.</p>
  </modal>
</template>

<script>
  export default {
    data () {
      return {
        open9: false
      }
    }
  }
</script>
<!-- Live demo -->
```

## Disable Animation

Set `transition-duration` to `0` to disable modal animations.

```html
<template>
  <button type="button" class="btn btn-primary" @click="open10=true" id="btn-10">Disable Animation</button>
  <modal v-model="open10" title="Modal Title" :transition-duration="0">
    <p>This is a modal that has no transition effect.</p>
  </modal>
</template>

<script>
  export default {
    data () {
      return {
        open10: false
      }
    }
  }
</script>
<!-- Live demo -->
```

# API Reference

## [Modal.vue](https://github.com/wxsms/uiv/tree/master/src/components/modal/Modal.vue)


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
      <td nowrap="nowrap"><code>v-model</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>Show / hide the modal</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>title</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>The modal title (will be override if title slot exist)</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>size</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>The alternative modal size. Support 'lg' / 'sm'</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>backdrop</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Dismiss the modal by backdrop click</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>footer</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Show modal footer</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>header</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Show modal header</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>cancel-text</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>Override the text of cancel button</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>ok-text</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>Override the text of ok button</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>transition-duration</code></td>
      <td>Number</td>
      <td>150</td>
      <td></td>
      <td>Transition time of the modal, set to 0 to disable animation</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>auto-focus</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Focus on the action button that has <code>data-action="auto-focus"</code>
        attribute after modal open, by default it is the OK button.
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>keyboard</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Close the modal after esc key pressed</td>
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
      <td nowrap="nowrap"><code>title</code></td>
      <td colspan="4">Replace as the modal title.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">Replace as the modal body.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>header</code></td>
      <td colspan="4">Replace as the modal header. Note: this slot will override <code>title</code>
        slot since it is a completely replacement of header.
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>footer</code></td>
      <td colspan="4">Replace as the modal footer.</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Events</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>show</code></td>
      <td></td>
      <td colspan="3">Fire after modal show</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>hide</code></td>
      <td><p>msg</p></td>
      <td colspan="3">Fire after modal dismiss with message (if exist)</td>
    </tr>
    </tbody>
  </table>
</div>


<!-- Live demo script
<script>
  export default {
    data () {
      return {
        msg: '',
        open1: false,
        open2: false,
        open3: false,
        open4: false,
        open5: false,
        open6: false,
        open7: false,
        open8: false,
        open9: false,
        open10: false
      }
    },
    methods: {
      dismissCallback (msg) {
        this.msg = `Modal dismiss with msg '${msg}'.`
      }
    }
  }
</script>
-->
