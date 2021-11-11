<template>
  <div class="uiv">
    <btn-group justified>
      <btn href="javascript:;">Left</btn>
      <btn href="javascript:;">Middle</btn>
      <btn href="javascript:;">Right</btn>
    </btn-group>
    <br />
    <btn-group justified>
      <btn justified>Left</btn>
      <btn justified>Middle</btn>
      <dropdown>
        <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
        <template slot="dropdown">
          <li><a role="button">Action</a></li>
          <li><a role="button">Another action</a></li>
          <li><a role="button">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a role="button">Separated link</a></li>
        </template>
      </dropdown>
    </btn-group>
  </div>
</template>
