<template>
  <Tabs>
    <Tab title="Home">
      <p>Home tab.</p>
    </Tab>
    <Tab title="Profile">
      <p>Profile tab.</p>
    </Tab>
    <template #nav-right>
      <form>
        <select class="form-control" style="display: inline-block; width: auto">
          <option>option1</option>
          <option>option2</option>
          <option>option3</option>
          <option>option4</option>
        </select>
        <Btn type="success">Button</Btn>
      </form>
    </template>
  </Tabs>
</template>

<script setup>
import { Tab, Tabs, Btn } from 'uiv';
</script>
