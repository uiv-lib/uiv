<template>
  <section class="uiv">
    <label>States of America:</label>
    <input
      ref="input"
      class="form-control"
      type="text"
      placeholder="Type to search..."
      autocomplete="off"
    />
    <Typeahead v-model="model" :target="input" :data="states" item-key="name" />
    <br />
    <Alert v-show="model">You selected {{ model }}</Alert>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Alert, Typeahead } from 'uiv';
import { data as states } from './states.json';

const input = ref(null);
const model = ref('');
</script>
