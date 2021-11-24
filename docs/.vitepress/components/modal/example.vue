<template>
  <section class="uiv">
    <Btn type="primary" @click="open = true">Launch Demo Modal</Btn>
    <Modal
      id="modal-demo"
      ref="modal"
      v-model="open"
      title="Modal 1"
      @hide="callback"
    >
      <h4>Text in a modal</h4>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <h4>Popover in a modal</h4>
      <p>
        This
        <btn
          v-popover:modal-demo="{
            title: 'Title',
            content: 'Some popover content...',
          }"
          >button</btn
        >
        should trigger a popover on click.
      </p>
      <h4>Tooltips in a modal</h4>
      <p>
        <a v-tooltip:modal-demo="'Tooltip'" role="button">This link</a>
        <span>and</span>
        <a v-tooltip:modal-demo="'Tooltip'" role="button">that link</a>
        <span>should have tooltips on hover.</span>
      </p>
      <hr />
      <h4>Overflowing text to show scroll behavior</h4>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
      </p>
      <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </p>
      <p>
        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
        ullamcorper nulla non metus auctor fringilla.
      </p>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
      </p>
      <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </p>
      <p>
        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
        ullamcorper nulla non metus auctor fringilla.
      </p>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
      </p>
      <p>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </p>
      <p>
        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
        ullamcorper nulla non metus auctor fringilla.
      </p>
    </Modal>
  </section>
</template>

<script setup>
import {
  Modal,
  Btn,
  Notification,
  popover as vPopover,
  tooltip as vTooltip,
} from 'uiv';
import { ref } from 'vue';

const open = ref(false);

function callback(msg) {
  Notification.notify(`Modal dismissed with msg '${msg}'.`);
}
</script>
