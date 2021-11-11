<template>
  <form class="form-inline uiv">
    <dropdown class="form-group">
      <div class="input-group">
        <input v-model="date" class="form-control" type="text" />
        <div class="input-group-btn">
          <btn class="dropdown-toggle"
            ><i class="glyphicon glyphicon-calendar"></i
          ></btn>
        </div>
      </div>
      <template slot="dropdown">
        <li>
          <date-picker v-model="date" />
        </li>
      </template>
    </dropdown>
  </form>
</template>
<script>
export default {
  data() {
    return {
      date: null,
    }
  },
}
</script>
