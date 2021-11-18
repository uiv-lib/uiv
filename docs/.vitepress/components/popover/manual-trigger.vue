<template>
  <section class="uiv">
    <popover v-model="show" title="Title" trigger="manual">
      <btn>You Can't Trigger Popover Here...</btn>
      <template #popover>
        <p>Popover content</p>
      </template>
    </popover>
    <hr />
    <btn type="primary" @click="show = !show">Toggle Popover</btn>
  </section>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
