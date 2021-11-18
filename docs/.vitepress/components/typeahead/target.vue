<template>
  <section class="uiv">
    <label>States of America:</label>
    <input
      ref="input"
      class="form-control"
      type="text"
      placeholder="Type to search..."
    />
    <typeahead
      v-model="model"
      :target="target"
      :data="states"
      item-key="name"
    />
    <br />
    <alert v-show="model">You selected {{ model }}</alert>
  </section>
</template>
<script>
import states from './states.json';

export default {
  data() {
    return {
      model: '',
      target: null,
      states: states.data,
    };
  },
  mounted() {
    this.target = this.$refs.input;
  },
};
</script>
