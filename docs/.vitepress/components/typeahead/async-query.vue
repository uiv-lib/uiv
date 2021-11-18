<template>
  <section class="uiv">
    <label for="input-4">Users of Github:</label>
    <input
      id="input-4"
      class="form-control"
      type="text"
      placeholder="Type to search..."
    />
    <typeahead
      v-model="model"
      target="#input-4"
      async-src="https://api.github.com/search/users?q="
      async-key="items"
      item-key="login"
    />
    <br />
    <alert v-show="model">You selected {{ model }}</alert>
  </section>
</template>
<script>
export default {
  data() {
    return {
      model: '',
    };
  },
};
</script>
