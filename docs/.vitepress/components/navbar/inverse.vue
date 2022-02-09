<template>
  <Navbar inverse>
    <template #brand>
      <a class="navbar-brand" href="#">Brand</a>
    </template>
    <template #collapse>
      <NavbarNav>
        <li class="active">
          <a role="button">Link <span class="sr-only">(current)</span></a>
        </li>
        <li><a role="button">Link</a></li>
      </NavbarNav>
    </template>
  </Navbar>
</template>

<script setup>
import { Navbar, NavbarNav } from 'uiv';
</script>
