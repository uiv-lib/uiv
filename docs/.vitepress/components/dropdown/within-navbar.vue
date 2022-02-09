<template>
  <Navbar>
    <template #brand>
      <a class="navbar-brand" role="button">Brand</a>
    </template>
    <template #collapse>
      <navbar-nav>
        <Dropdown tag="li">
          <a class="dropdown-toggle" role="button"
            >Dropdown 1<span class="caret"></span
          ></a>
          <template #dropdown>
            <li><a role="button">Action</a></li>
            <li><a role="button">Another action</a></li>
            <li><a role="button">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a role="button">Separated link</a></li>
          </template>
        </Dropdown>
        <Dropdown tag="li">
          <a class="dropdown-toggle" role="button"
            >Dropdown 2<span class="caret"></span
          ></a>
          <template #dropdown>
            <li><a role="button">Action</a></li>
            <li><a role="button">Another action</a></li>
            <li><a role="button">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a role="button">Separated link</a></li>
          </template>
        </Dropdown>
      </navbar-nav>
      <NavbarNav right>
        <Dropdown tag="li">
          <a class="dropdown-toggle" role="button"
            >Dropdown 3<span class="caret"></span
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
</template>

<script setup>
import { Navbar, NavbarNav, Dropdown, Btn } from 'uiv';
</script>
