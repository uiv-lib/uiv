<template>
  <section class="uiv">
    <btn type="info" @click="info">Info</btn>
    <btn type="success" @click="success">Success</btn>
    <btn type="warning" @click="warning">Warning</btn>
    <btn type="danger" @click="danger">Danger</btn>
  </section>
</template>
<script>
export default {
  methods: {
    info() {
      this.$notify({
        type: 'info',
        title: 'Heads up!',
        content:
          "This alert needs your attention, but it's not super important.",
      })
    },
    success() {
      this.$notify({
        type: 'success',
        title: 'Well done!',
        content: 'You successfully read this important alert message.',
      })
    },
    warning() {
      // simple warning with content only
      this.$notify.warning(
        "Better check yourself, you're not looking too good."
      )
    },
    danger() {
      // error msg with title and content (other options available too)
      // `error` is an alias of `danger` (both of them works)
      this.$notify.error({
        title: 'Oh snap!',
        content: 'Change a few things up and try submitting again.',
      })
    },
  },
}
</script>
