<template>
  <section>
    <ul class="nav nav-tabs" :class="{'nav-justified':justified}">
      <li v-for="(tab,index) in tabs"
          :class="{'active':tab.active,'disabled':tab.disabled}"
          @click="select(index)">
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
      justified: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        tabs: []
      }
    },
    mounted () {
      if (this.tabs && this.tabs.length > 0) {
        this.select(0)
      }
    },
    watch: {
      active (i) {
        if (this.tabs.length > i && !this.tabs[i].active) {
          this.select(i)
        }
      }
    },
    methods: {
      hideAllTabs () {
        this.tabs.forEach(tab => {
          tab.active = false
        })
      },
      select (index) {
        if (index >= 0 && index < this.tabs.length) {
          let tab = this.tabs[index]
          if (!tab.disabled && !tab.active) {
            this.hideAllTabs()
            tab.active = true
            this.$emit('after-active', index)
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
