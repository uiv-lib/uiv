<template>
  <div class="uiv">
    <btn id="btn" type="primary">Popover</btn>
    <popover title="Title" target="#btn">
      <template #popover>
        <h1>Hello world!</h1>
      </template>
    </popover>
  </div>
</template>
