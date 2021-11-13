<template>
  <div class="uiv">
    <tabs @change="onChange">
      <tab title="Home">
        <p>Home tab.</p>
      </tab>
      <tab title="Profile">
        <p>Profile tab.</p>
      </tab>
      <tab>
        <template #title>
          <div><i class="glyphicon glyphicon-bell"></i> Alert!</div>
        </template>
        <p>This tab has HTML title and callback function!</p>
      </tab>
    </tabs>
  </div>
</template>
<script>
export default {
  methods: {
    onChange(index) {
      if (index === 2) {
        window.alert('You clicked on a tab that has callback function!')
      }
    },
  },
}
</script>
