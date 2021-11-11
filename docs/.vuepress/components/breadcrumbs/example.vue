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
        { text: 'Home', href: '#' },
        { text: 'Library', href: '#' },
        { text: 'Data', href: '#' },
      ],
    }
  },
}
</script>
