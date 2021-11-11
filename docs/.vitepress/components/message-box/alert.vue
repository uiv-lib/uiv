<template>
  <div class="uiv">
    <btn type="primary" @click="alert">Click to open an alert modal</btn>
  </div>
</template>
<script>
export default {
  methods: {
    alert() {
      this.$alert(
        {
          title: 'Title',
          content: 'This is an alert message.',
        },
        (msg) => {
          // callback after modal dismissed
          this.$notify(`You selected ${msg}.`)
        }
      )
    },
  },
}
</script>
