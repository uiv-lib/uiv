<template>
  <section class="uiv">
    <tooltip
      v-model="show"
      text="Static tooltip content goes here"
      trigger="manual"
    >
      <btn>You Can't Trigger Tooltip Here...</btn>
    </tooltip>
    <hr />
    <btn type="primary" @click="show = !show">Toggle Tooltip</btn>
  </section>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    }
  },
}
</script>
