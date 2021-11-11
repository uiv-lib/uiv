<template>
  <section class="uiv">
    <btn type="primary" @click="notify('top-right')">Top Right (Default)</btn>
    <btn type="primary" @click="notify('bottom-right')">Bottom Right</btn>
    <btn type="primary" @click="notify('bottom-left')">Bottom Left</btn>
    <btn type="primary" @click="notify('top-left')">Top Left</btn>
  </section>
</template>
<script>
export default {
  methods: {
    notify(placement) {
      this.$notify({
        placement, // equal to `placement: placement` in ES6
        title: 'Title',
        content: `This is a notify msg at ${placement}.`,
      })
    },
  },
}
</script>
