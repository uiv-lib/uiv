<template>
  <section class="uiv">
    <Tabs v-model="index">
      <Tab v-for="tab in tabs" :key="tab" :title="tab">
        <p>Dynamic {{ tab }}</p>
        <btn @click="close">Close this tab</btn>
      </Tab>
      <template #nav-right>
        <Btn size="sm" @click="push">
          <i class="glyphicon glyphicon-plus"></i> Add
        </Btn>
      </template>
    </Tabs>
  </section>
</template>
<script setup>
import { Tab, Tabs, Btn } from 'uiv';
import { ref, nextTick } from 'vue';

const tabs = ref(['Tab 1']);
const count = ref(1);
const index = ref(0);

function push() {
  tabs.value.push(`Tab ${++count.value}`);
  // open the new tab after created
  nextTick(() => {
    index.value = tabs.value.length - 1;
  });
}

function close() {
  tabs.value.splice(index.value, 1);
  // select prev tab if the closed tab is the last one
  if (index.value > 0) {
    --index.value;
  }
}
</script>
