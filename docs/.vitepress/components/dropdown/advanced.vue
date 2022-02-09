<template>
  <Alert>You selected: {{ selected }}</Alert>
  <Dropdown
    ref="dropdown"
    v-model="show"
    :not-close-elements="ele"
    class="dropdown-form"
  >
    <Btn type="primary" class="dropdown-toggle"
      >Dropdown Form <span class="caret"></span
    ></Btn>
    <template #dropdown>
      <li class="checkbox">
        <label>
          <input v-model="selected" type="checkbox" value="Vue" /> Vue
        </label>
      </li>
      <li class="checkbox">
        <label>
          <input v-model="selected" type="checkbox" value="Bootstrap" />
          Bootstrap
        </label>
      </li>
      <li class="checkbox">
        <label>
          <input v-model="selected" type="checkbox" value="JavaScript" />
          JavaScript
        </label>
      </li>
      <li>
        <Btn block type="primary" @click="show = false">Apply</Btn>
      </li>
    </template>
  </Dropdown>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Alert, Dropdown, Btn } from 'uiv';

const show = ref(false);
const dropdown = ref(null);
const ele = ref([]);
const selected = ref([]);

onMounted(() => {
  ele.value.push(dropdown.value.$el);
});
</script>

<style>
.uiv .dropdown-form .dropdown-menu {
  padding: 10px;
}
</style>
