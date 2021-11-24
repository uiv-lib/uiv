<template>
  <section class="uiv">
    <Popover v-model="show" title="Title" trigger="manual">
      <Btn>You Can't Trigger Popover Here...</Btn>
      <template #popover>
        <p>Popover content</p>
      </template>
    </Popover>
    <hr />
    <Btn type="primary" @click="show = !show">Toggle Popover</Btn>
  </section>
</template>

<script setup>
import { Popover, Btn } from 'uiv';
import { ref } from 'vue';

const show = ref(false);
</script>
