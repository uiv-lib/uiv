<template>
  <section class="uiv">
    <alert>You selected: {{ selected }}</alert>
    <dropdown
      ref="dropdown"
      v-model="show"
      :not-close-elements="ele"
      class="dropdown-form"
    >
      <btn type="primary" class="dropdown-toggle"
        >Dropdown Form <span class="caret"></span
      ></btn>
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
          <btn block type="primary" @click="show = false">Apply</btn>
        </li>
      </template>
    </dropdown>
  </section>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    const dropdown = ref(null);
    const ele = ref([]);
    const selected = ref([]);

    onMounted(() => {
      ele.value.push(dropdown.value.$el);
    });

    return {
      ele,
      dropdown,
      show,
      selected,
    };
  },
};
</script>
<style>
.uiv .dropdown-form .dropdown-menu {
  padding: 10px;
}
</style>
