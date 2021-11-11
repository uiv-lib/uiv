<template>
  <div class="uiv">
    <multi-select v-model="selected" :options="options" filterable />
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      options: [
        { value: 1, label: 'Option1' },
        { value: 2, label: 'Option2' },
        { value: 3, label: 'Option3' },
        { value: 4, label: 'Option4' },
        { value: 5, label: 'Option5' },
      ],
    }
  },
}
</script>
