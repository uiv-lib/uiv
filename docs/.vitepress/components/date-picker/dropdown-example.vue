<template>
  <form class="form-inline uiv">
    <Dropdown class="form-group">
      <div class="input-group">
        <input v-model="date" class="form-control" type="text" />
        <div class="input-group-btn">
          <Btn class="dropdown-toggle"
            ><i class="glyphicon glyphicon-calendar"></i
          ></Btn>
        </div>
      </div>
      <template #dropdown>
        <li>
          <DatePicker v-model="date" />
        </li>
      </template>
    </Dropdown>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { DatePicker, Dropdown, Btn } from 'uiv';

const date = ref(null);
</script>
