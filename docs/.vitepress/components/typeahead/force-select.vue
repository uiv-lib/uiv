<template>
  <section class="uiv">
    <label for="input-3">States of America:</label>
    <input
      id="input-3"
      class="form-control"
      type="text"
      placeholder="Type to search..."
    />
    <Typeahead
      v-model="model"
      target="#input-3"
      force-select
      :data="states"
      item-key="name"
    />
    <br />
    <Alert v-show="model">You selected {{ model }}</Alert>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Alert, Typeahead } from 'uiv';
import { data as states } from './states.json';

const model = ref('');
</script>
