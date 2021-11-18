<template>
  <div class="uiv">
    <h4>Default Label</h4>
    <progress-bar v-model="progress" label />
    <h4>Custom Label</h4>
    <progress-bar
      v-model="progress"
      label
      label-text="Loading......Please wait."
    />
    <h4>Minimum Width</h4>
    <progress-bar v-model="progress1" min-width label />
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress1: 1,
      progress: 66,
    };
  },
};
</script>
