<template>
  <div class="uiv">
    <progress-bar v-model="progress" striped active />
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress: 40,
    }
  },
}
</script>
