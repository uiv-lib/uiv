<template>
  <section>
    <ul class="nav nav-tabs">
      <li v-for="(tab,index) in tabs"
          :class="{'active':tab.active,'disabled':tab.disabled}"
          @click="activeTab(tab)">
        <a href="javascript:void(0);">
          <span v-if="tab.htmlTitle" v-html="tab.title"></span>
          <span v-else v-text="tab.title"></span>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      active: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        tabs: []
      }
    },
    mounted () {
      this.activeTab(this.tabs[this.tabs.length > this.active ? this.active : 0])
    },
    watch: {
      active (i) {
        if (this.tabs.length > i && !this.tabs[i].active) {
          this.activeTab(this.tabs[i])
        }
      }
    },
    methods: {
      hideAllTabs () {
        this.tabs.forEach(tab => {
          tab.active = false
        })
      },
      activeTab (tab) {
        if (!tab.disabled && !tab.active) {
          this.hideAllTabs()
          tab.active = true
          if (typeof tab.afterActive === 'function') {
            tab.afterActive()
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
