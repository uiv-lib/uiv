<template>
  <div class="uiv">
    <BtnGroup justified>
      <Btn href="javascript:;">Left</Btn>
      <Btn href="javascript:;">Middle</Btn>
      <Btn href="javascript:;">Right</Btn>
    </BtnGroup>
    <br />
    <BtnGroup justified>
      <Btn justified>Left</Btn>
      <Btn justified>Middle</Btn>
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
    </BtnGroup>
  </div>
</template>

<script setup>
import { Btn, BtnGroup, Dropdown } from 'uiv';
</script>
