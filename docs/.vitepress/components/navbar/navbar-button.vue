<template>
  <div class="uiv">
    <Navbar>
      <template #brand>
        <a class="navbar-brand" href="#">Brand</a>
      </template>
      <Btn class="navbar-btn">Sign in</Btn>
    </Navbar>
  </div>
</template>

<script setup>
import { Navbar, Btn } from 'uiv';
</script>
