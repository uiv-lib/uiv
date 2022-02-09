<template>
  <Btn id="btn" type="primary">Popover</Btn>
  <Popover title="Title" target="#btn">
    <template #popover>
      <h1>Hello world!</h1>
    </template>
  </Popover>
</template>

<script setup>
import { Popover, Btn } from 'uiv';
</script>
