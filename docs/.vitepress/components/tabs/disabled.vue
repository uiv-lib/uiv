<template>
  <Tabs>
    <Tab title="Home">
      <p>Home tab.</p>
    </Tab>
    <Tab title="Profile" disabled>
      <p>Profile tab.</p>
    </Tab>
    <Tab title="@vue" group="Dropdown">
      <p>@vue tab.</p>
    </Tab>
    <Tab title="@bootstrap" group="Dropdown" disabled>
      <p>@bootstrap tab.</p>
    </Tab>
  </Tabs>
</template>

<script setup>
import { Tab, Tabs } from 'uiv';
</script>
