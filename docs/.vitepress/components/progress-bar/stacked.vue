<template>
  <div class="uiv">
    <progress-bar>
      <progress-bar-stack v-model="progress35" type="success" />
      <progress-bar-stack v-model="progress20" type="warning" striped />
      <progress-bar-stack v-model="progress10" type="danger" />
    </progress-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress20: 20,
      progress35: 35,
      progress10: 10,
    }
  },
}
</script>
