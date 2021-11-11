<template>
  <section class="uiv">
    <btn-group>
      <btn v-model="model" input-type="radio" input-value="1">Radio 1</btn>
      <btn v-model="model" input-type="radio" input-value="2">Radio 2</btn>
      <btn v-model="model" input-type="radio" input-value="3">Radio 3</btn>
      <btn v-model="model" input-type="radio" input-value="4" disabled
        >Radio 4 (Disabled)</btn
      >
    </btn-group>
    <hr />
    <alert>Selected: {{ model }}</alert>
  </section>
</template>
<script>
export default {
  data() {
    return {
      model: '1',
    }
  },
}
</script>
