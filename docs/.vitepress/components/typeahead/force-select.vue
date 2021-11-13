<template>
  <section class="uiv">
    <label for="input-3">States of America:</label>
    <input
      id="input-3"
      class="form-control"
      type="text"
      placeholder="Type to search..."
    />
    <typeahead
      v-model="model"
      target="#input-3"
      force-select
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
