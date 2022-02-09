<template>
  <div id="affix-example">
    <Affix :offset="50">
      <Alert>I'm using affix.</Alert>
    </Affix>
  </div>
</template>

<script setup>
import { Affix, Alert } from 'uiv';
</script>

<style>
#affix-example .affix {
  z-index: 999;
}
</style>
