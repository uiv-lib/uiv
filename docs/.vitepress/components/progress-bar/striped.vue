<template>
  <div class="uiv">
    <progress-bar v-model="progress40" type="success" striped />
    <progress-bar v-model="progress20" type="info" striped />
    <progress-bar v-model="progress60" type="warning" striped />
    <progress-bar v-model="progress80" type="danger" striped />
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
    }
  },
}
</script>
