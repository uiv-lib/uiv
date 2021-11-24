<template>
  <form class="form-inline uiv">
    <Dropdown class="form-group">
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          :value="`${time.getHours()}:${time.getMinutes()}`"
          readonly="readonly"
        />
        <div class="input-group-btn">
          <Btn class="dropdown-toggle"
            ><i class="glyphicon glyphicon-time"></i
          ></Btn>
        </div>
      </div>
      <template #dropdown>
        <li style="padding: 10px">
          <TimePicker v-model="time" :show-meridian="false" />
        </li>
      </template>
    </Dropdown>
  </form>
</template>

<script setup>
import { TimePicker, Dropdown, Btn } from 'uiv';
import { ref } from 'vue';

const time = ref(new Date());
</script>
