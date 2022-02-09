<template>
  <Dropdown menu-right>
    <Btn class="dropdown-toggle">Menu-Right <span class="caret"></span></Btn>
    <template #dropdown>
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </Dropdown>
</template>

<script setup>
import { Dropdown, Btn } from 'uiv';
</script>
