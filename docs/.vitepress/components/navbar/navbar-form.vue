<template>
  <Navbar>
    <template #brand>
      <a class="navbar-brand" href="#">Brand</a>
    </template>
    <NavbarForm left>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search" />
      </div>
      <Btn>Submit</Btn>
    </NavbarForm>
  </Navbar>
</template>

<script setup>
import { Navbar, NavbarForm, Btn } from 'uiv';
</script>
