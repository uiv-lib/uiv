<template>
  <div class="uiv">
    <!-- dropdown with append-to-body -->
    <Dropdown append-to-body>
      <Btn class="dropdown-toggle">Dropdown <span class="caret"></span></Btn>
      <template #dropdown>
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </Dropdown>
    <!-- dropdown with append-to-body + menu-right -->
    <Dropdown append-to-body menu-right>
      <Btn class="dropdown-toggle">Menu-Right <span class="caret"></span></Btn>
      <template #dropdown>
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </Dropdown>
    <!-- dropdown with append-to-body + dropup -->
    <Dropdown append-to-body dropup>
      <Btn class="dropdown-toggle">Dropup <span class="caret"></span></Btn>
      <template #dropdown>
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </Dropdown>
    <!-- dropdown-append-to-body.vue -->
  </div>
</template>

<script setup>
import { Dropdown, Btn } from 'uiv';
</script>
