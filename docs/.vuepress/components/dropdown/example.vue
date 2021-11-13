<template>
  <div class="uiv">
    <dropdown ref="dropdown">
      <btn type="primary" class="dropdown-toggle"
        >Dropdown <span class="caret"></span
      ></btn>
      <template slot="dropdown">
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </dropdown>
    <dropdown>
      <btn type="info">Split Button</btn>
      <btn type="info" class="dropdown-toggle"><span class="caret"></span></btn>
      <template slot="dropdown">
        <li><a role="button">Action</a></li>
        <li><a role="button">Another action</a></li>
        <li><a role="button">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button">Separated link</a></li>
      </template>
    </dropdown>
  </div>
</template>
