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
      <template slot="dropdown">
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
export default {
  data() {
    return {
      show: false,
      ele: [],
      selected: [],
    }
  },
  mounted() {
    this.ele.push(this.$refs.dropdown.$el)
  },
}
</script>
<style scope>
.dropdown-form .dropdown-menu {
  padding: 10px;
}
</style>
