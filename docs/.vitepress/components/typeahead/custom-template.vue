<template>
  <label for="input-5">Users of Github:</label>
  <input
    id="input-5"
    class="form-control"
    type="text"
    placeholder="Type to search..."
    autocomplete="off"
  />
  <Typeahead
    v-model="model"
    target="#input-5"
    :async-function="queryFunction"
    item-key="login"
  >
    <template #item="{ items, activeIndex, select, highlight }">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        :class="{ active: activeIndex === index }"
      >
        <a role="button" @click="select(item)">
          <img
            style="width: 22px; height: 22px; margin-right: 5px"
            :src="item.avatar_url + '&s=40'"
            alt="avatar"
          />
          <span v-html="highlight(item)"></span>
        </a>
      </li>
    </template>
  </Typeahead>
  <br />
  <Alert v-show="model">You selected {{ model }}</Alert>
</template>

<script setup>
import { ref } from 'vue';
import { Alert, Typeahead } from 'uiv';
import axios from 'axios'; // https://github.com/axios/axios

const model = ref('');

function queryFunction(query, done) {
  axios
    .get('https://api.github.com/search/users?q=' + query)
    .then((res) => {
      done(res.data.items);
    })
    .catch((err) => {
      // any error handler
    });
}
</script>
