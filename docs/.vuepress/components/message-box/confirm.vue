<template>
  <div class="uiv">
    <btn type="primary" @click="confirm">Click to open a confirm modal</btn>
  </div>
</template>
<script>
export default {
  methods: {
    confirm() {
      this.$confirm({
        title: 'Confirm',
        content: 'This item will be permanently deleted. Continue?',
      })
        .then(() => {
          this.$notify({
            type: 'success',
            content: 'Delete completed.',
          })
        })
        .catch(() => {
          this.$notify('Delete canceled.')
        })
    },
  },
}
</script>
