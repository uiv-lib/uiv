<template>
  <div class="uiv">
    <progress-bar v-model="progress" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress: 66,
    };
  },
};
</script>
