<template>
  <div class="uiv">
    <Dropdown ref="dropdown">
      <Btn type="primary" class="dropdown-toggle"
        >Dropdown <span class="caret"></span
      ></Btn>
      <template #dropdown>
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </Dropdown>
    <Dropdown>
      <Btn type="info">Split Button</Btn>
      <Btn type="info" class="dropdown-toggle"><span class="caret"></span></Btn>
      <template #dropdown>
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </Dropdown>
  </div>
</template>

<script setup>
import { Dropdown, Btn } from 'uiv';
</script>
