<template>
  <section class="uiv">
    <label for="input-2">States of America:</label>
    <input
      id="input-2"
      class="form-control"
      type="text"
      placeholder="Type to search..."
    />
    <typeahead
      v-model="model"
      target="#input-2"
      match-start
      :data="states"
      item-key="name"
    />
    <br />
    <alert v-show="model">You selected {{ model }}</alert>
  </section>
</template>
<script>
import states from './states.json'

export default {
  data() {
    return {
      model: '',
      states: states.data,
    }
  },
}
</script>
