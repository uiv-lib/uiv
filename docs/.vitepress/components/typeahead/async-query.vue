<template>
  <section class="uiv">
    <label for="input-4">Users of Github:</label>
    <input
      id="input-4"
      class="form-control"
      type="text"
      placeholder="Type to search..."
      autocomplete="off"
    />
    <Typeahead
      v-model="model"
      target="#input-4"
      async-src="https://api.github.com/search/users?q="
      async-key="items"
      item-key="login"
    />
    <br />
    <Alert v-show="model">You selected {{ model }}</Alert>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Alert, Typeahead } from 'uiv';

const model = ref('');
</script>
