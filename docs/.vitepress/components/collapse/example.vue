<template>
  <div class="uiv">
    <div>
      <btn type="primary" @click="show = !show">Click me!</btn>
    </div>
    <br />
    <collapse v-model="show">
      <div class="well" style="margin-bottom: 0">Hi there.</div>
    </collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
