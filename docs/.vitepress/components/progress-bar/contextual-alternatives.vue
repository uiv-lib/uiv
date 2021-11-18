<template>
  <div class="uiv">
    <progress-bar v-model="progress40" type="success" />
    <progress-bar v-model="progress20" type="info" />
    <progress-bar v-model="progress60" type="warning" />
    <progress-bar v-model="progress80" type="danger" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress20: 20,
      progress40: 40,
      progress60: 60,
      progress80: 80,
    };
  },
};
</script>
