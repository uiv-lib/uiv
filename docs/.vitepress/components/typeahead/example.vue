<template>
  <section class="uiv">
    <Btn type="primary" @click="model = states[0]">Set to Alabama</Btn>
    <Btn @click="model = null">Clear</Btn>
    <hr />
    <label for="input">States of America:</label>
    <input
      id="input"
      class="form-control"
      type="text"
      placeholder="Type to search..."
      autocomplete="off"
    />
    <Typeahead v-model="model" target="#input" :data="states" item-key="name" />
    <br />
    <Alert v-show="model">You selected {{ model }}</Alert>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Alert, Typeahead, Btn } from 'uiv';
import { data as states } from './states.json';

const model = ref('');
</script>
