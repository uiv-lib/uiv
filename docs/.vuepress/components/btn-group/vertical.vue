<template>
  <div class="uiv">
    <btn-group vertical>
      <btn>Top</btn>
      <btn>Center</btn>
      <dropdown>
        <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
        <template #dropdown>
          <li><a role="button">Action</a></li>
          <li><a role="button">Another action</a></li>
          <li><a role="button">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a role="button">Separated link</a></li>
        </template>
      </dropdown>
      <btn>Bottom</btn>
    </btn-group>
  </div>
</template>
