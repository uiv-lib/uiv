<template>
  <div class="uiv">
    <ul class="nav nav-pills" role="tablist">
      <li role="presentation" class="active">
        <a href="javascript:void(0)">Regular link</a>
      </li>
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
    </ul>
  </div>
</template>

<script setup>
import { Dropdown } from 'uiv';
</script>
