<template>
  <div class="uiv">
    <Navbar>
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
        <NavbarForm left>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search" />
          </div>
          <Btn>Submit</Btn>
        </NavbarForm>
        <NavbarNav right>
          <li><a role="button">Link</a></li>
          <Dropdown tag="li">
            <a class="dropdown-toggle" role="button"
              >Dropdown <span class="caret"></span
            ></a>
            <template #dropdown>
              <li><a role="button">Action</a></li>
              <li><a role="button">Another action</a></li>
              <li><a role="button">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a role="button">Separated link</a></li>
            </template>
          </Dropdown>
        </NavbarNav>
      </template>
    </Navbar>
  </div>
</template>

<script setup>
import { Navbar, NavbarNav, Dropdown, NavbarForm, Btn } from 'uiv';
</script>
