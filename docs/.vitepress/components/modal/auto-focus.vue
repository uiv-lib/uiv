<template>
  <section class="uiv">
    <btn type="primary" @click="open = true">Auto Focus</btn>
    <modal v-model="open" title="Modal Title" auto-focus>
      <p>Check this out! The OK button is focused now.</p>
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
