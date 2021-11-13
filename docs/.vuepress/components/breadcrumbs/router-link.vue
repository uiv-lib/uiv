<template>
  <div class="uiv">
    <breadcrumbs :items="items" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { text: 'Home', to: '/', exact: true },
        { text: 'Breadcrumbs', to: '/breadcrumbs' },
      ],
    }
  },
}
</script>
