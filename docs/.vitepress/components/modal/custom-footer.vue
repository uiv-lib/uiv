<template>
  <section class="uiv">
    <btn type="primary" @click="open1 = true">Custom Footer</btn>
    <btn type="primary" @click="open2 = true">No Footer</btn>
    <modal v-model="open1" title="Modal Title">
      <p>This is a modal with custom footer.</p>
      <template #footer>
        <div>
          <btn @click="open1 = false">Cancel</btn>
          <btn type="warning">Warning Action</btn>
          <btn type="danger">Danger Action</btn>
        </div>
      </template>
    </modal>
    <modal v-model="open2" title="Modal Title" :footer="false">
      <p>This is a modal with no footer.</p>
    </modal>
  </section>
</template>
<script>
export default {
  data() {
    return {
      open1: false,
      open2: false,
    };
  },
};
</script>
