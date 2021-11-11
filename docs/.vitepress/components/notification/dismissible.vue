<template>
  <div class="uiv">
    <btn type="primary" @click="notify"
      >Notification Without Dismiss Button</btn
    >
  </div>
</template>
<script>
export default {
  methods: {
    notify() {
      this.$notify({
        title: 'Title',
        content: 'This is a notification without dismiss btn.',
        dismissible: false,
      })
    },
  },
}
</script>
