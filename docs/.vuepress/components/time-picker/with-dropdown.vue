<template>
  <form class="form-inline uiv">
    <dropdown class="form-group">
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          :value="`${time.getHours()}:${time.getMinutes()}`"
          readonly="readonly"
        />
        <div class="input-group-btn">
          <btn class="dropdown-toggle"
            ><i class="glyphicon glyphicon-time"></i
          ></btn>
        </div>
      </div>
      <template slot="dropdown">
        <li style="padding: 10px">
          <time-picker v-model="time" :show-meridian="false" />
        </li>
      </template>
    </dropdown>
  </form>
</template>
<script>
export default {
  data() {
    return {
      time: new Date(),
    }
  },
}
</script>
