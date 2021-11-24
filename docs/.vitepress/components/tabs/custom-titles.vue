<template>
  <div class="uiv">
    <Tabs>
      <Tab>
        <template #title>
          <div><i class="glyphicon glyphicon-user"></i> Profile</div>
        </template>
        <p>This tab has a <code>title</code> slot.</p>
      </Tab>
      <Tab title="Title">
        <p>This tab has a normal title.</p>
      </Tab>
    </Tabs>
  </div>
</template>

<script setup>
import { Tab, Tabs } from 'uiv';
</script>
