<template>
  <section class="uiv">
    <btn type="primary" @click="open = true">Custom Button Text and Type</btn>
    <modal
      v-model="open"
      title="Are you sure?"
      ok-text="Yes, please"
      cancel-text="No way!"
      ok-type="danger"
      cancel-type="warning"
    >
      <p>Do you really want to destroy this item?</p>
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
