<template>
  <BtnGroup vertical>
    <Btn>Top</Btn>
    <Btn>Center</Btn>
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
    <Btn>Bottom</Btn>
  </BtnGroup>
</template>

<script setup>
import { Btn, BtnGroup, Dropdown } from 'uiv';
</script>
