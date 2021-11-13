<template>
  <section class="uiv">
    <btn type="primary" @click="open1 = true">HTML Title</btn>
    <btn type="primary" @click="open2 = true">No Header</btn>
    <modal v-model="open1">
      <span slot="title"
        ><i class="glyphicon glyphicon-heart"></i> Modal Title</span
      >
      <p>This is a modal with HTML title.</p>
    </modal>
    <modal v-model="open2" :header="false">
      <p>This is a modal with no header.</p>
    </modal>
  </section>
</template>
<script>
export default {
  data() {
    return {
      open1: false,
      open2: false,
    }
  },
}
</script>
