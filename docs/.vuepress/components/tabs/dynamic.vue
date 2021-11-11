<template>
  <section class="uiv">
    <tabs v-model="index">
      <tab v-for="tab in tabs" :key="tab" :title="tab">
        <p>Dynamic {{ tab }}</p>
        <btn @click="close">Close this tab</btn>
      </tab>
      <template #nav-right>
        <btn size="sm" @click="push">
          <i class="glyphicon glyphicon-plus"></i> Add
        </btn>
      </template>
    </tabs>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tabs: ['Tab 1'],
      count: 1,
      index: 0,
    }
  },
  methods: {
    push() {
      this.tabs.push(`Tab ${++this.count}`)
      // open the new tab after created
      this.$nextTick(() => {
        this.index = this.tabs.length - 1
      })
    },
    close() {
      this.tabs.splice(this.index, 1)
      // select prev tab if the closed tab is the last one
      if (this.index === this.tabs.length && this.index > 0) {
        --this.index
      }
    },
  },
}
</script>
