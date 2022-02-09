<template>
  <Tabs v-model="index" :before-change="onBeforeChange">
    <Tab title="Home">
      <div>
        <br />
        <form class="form-inline">
          <div class="form-group">
            <label for="exampleInputName">Name</label>
            <input
              id="exampleInputName"
              v-model="input"
              type="text"
              class="form-control"
              placeholder="Please fill this section"
            />
          </div>
        </form>
      </div>
    </Tab>
    <Tab title="Profile">
      <p>Profile tab.</p>
    </Tab>
    <Tab title="Others">
      <p>Others tab.</p>
    </Tab>
  </Tabs>
</template>

<script setup>
import { Tab, Tabs, Notification } from 'uiv';
import { ref } from 'vue';

const index = ref(0);
const input = ref('');

function onBeforeChange(indexFrom, indexTo, done) {
  if (indexFrom === 0 && input.value === '') {
    Notification.notify('Please fill your name first.');
    done(1);
  } else {
    done();
  }
}
</script>
