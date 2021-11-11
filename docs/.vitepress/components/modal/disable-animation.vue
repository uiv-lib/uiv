<template>
  <section class="uiv">
    <btn type="primary" @click="open = true">Disable Animation</btn>
    <modal v-model="open" title="Modal Title" :transition="0">
      <p>This is a modal that has no transition effect.</p>
    </modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    }
  },
}
</script>
