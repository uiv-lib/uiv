<template>
  <div class="uiv">
    <Navbar>
      <template #brand>
        <a class="navbar-brand" href="#">Brand</a>
      </template>
      <NavbarText>Signed in as wxsm</NavbarText>
    </Navbar>
  </div>
</template>

<script setup>
import { Navbar, NavbarText } from 'uiv';
</script>
