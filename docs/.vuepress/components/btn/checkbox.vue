<template>
  <section class="uiv">
    <btn-group>
      <btn v-model="model" input-type="checkbox" input-value="1"
        >Checkbox 1</btn
      >
      <btn v-model="model" input-type="checkbox" input-value="2"
        >Checkbox 2</btn
      >
      <btn v-model="model" input-type="checkbox" input-value="3"
        >Checkbox 3</btn
      >
      <btn v-model="model" input-type="checkbox" input-value="4" disabled
        >Checkbox 4 (Disabled)</btn
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
      model: ['1'],
    }
  },
}
</script>
