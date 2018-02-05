# MultiSelect

## Example

```html
<template>
  <section>
    <alert>Selected: {{selected}}</alert>
    <multi-select v-model="selected" :options="options" collapse-selected/>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3', disabled: true},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5', disabled: true}
        ]
      }
    }
  }
</script>
<!-- multi-select-example.vue -->
```
