<template>
  <Navbar>
    <template #brand>
      <a class="navbar-brand" href="#">Brand</a>
    </template>
    <Btn class="navbar-btn">Sign in</Btn>
  </Navbar>
</template>

<script setup>
import { Navbar, Btn } from 'uiv';
</script>
