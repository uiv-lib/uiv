<template>
  <Navbar>
    <template #brand>
      <a class="navbar-brand" href="#">Brand</a>
    </template>
    <template #collapse>
      <NavbarText right
        >Signed in as <a href="#" class="navbar-link">wxsm</a></NavbarText
      >
    </template>
  </Navbar>
</template>

<script setup>
import { Navbar, NavbarText } from 'uiv';
</script>
