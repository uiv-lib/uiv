<template>
  <div class="uiv">
    <Tabs @change="onChange">
      <Tab title="Home">
        <p>Home tab.</p>
      </Tab>
      <Tab title="Profile">
        <p>Profile tab.</p>
      </Tab>
      <Tab>
        <template #title>
          <div><i class="glyphicon glyphicon-bell"></i> Alert!</div>
        </template>
        <p>This tab has HTML title and callback function!</p>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { Tab, Tabs, Notification } from 'uiv';

function onChange(index) {
  if (index === 2) {
    Notification.notify('You clicked on a tab that has callback function!');
  }
}
</script>
