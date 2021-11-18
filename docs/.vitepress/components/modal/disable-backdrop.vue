<template>
  <section class="uiv">
    <btn type="primary" @click="open = true">Disable Backdrop</btn>
    <modal v-model="open" title="Modal Title" :backdrop="false">
      <p>This is a modal that can not close by backdrop click.</p>
    </modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
};
</script>
