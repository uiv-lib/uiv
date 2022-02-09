<template>
  <BtnGroup>
    <Btn>Left</Btn>
    <Btn>Middle</Btn>
    <Dropdown>
      <Btn class="dropdown-toggle">Dropdown <span class="caret"></span></Btn>
      <template #dropdown>
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </Dropdown>
    <Btn>Right</Btn>
  </BtnGroup>
</template>

<script setup>
import { Btn, BtnGroup, Dropdown } from 'uiv';
</script>
