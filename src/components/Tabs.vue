<template>
  <section>
    <ul class="nav nav-tabs" :class="{'nav-justified':justified}">
      <template v-for="(tab,index) in groupedTabs">
        <dropdown v-if="tab.tabs" tag="li" :class="{'active':tab.active,'disabled':tab.disabled}">
          <a data-role="trigger" href="javascript:void(0)">
            <span>{{tab.group}}</span>
            <span class="caret"></span>
          </a>
          <ul slot="dropdown" class="dropdown-menu">
            <li v-for="subTab in tab.tabs">
              <a href="javascript:void(0)" @click="select(subTab)">
                {{subTab.title}}
              </a>
            </li>
          </ul>
        </dropdown>
        <li v-else :class="{'active':tab.active,'disabled':tab.disabled}">
          <a href="javascript:void(0);" @click="select(tab)">
            <span v-if="tab.htmlTitle" v-html="tab.title"></span>
            <span v-else v-text="tab.title"></span>
          </a>
        </li>
      </template>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  import Dropdown from './Dropdown.vue'

  export default {
    components: {
      Dropdown
    },
    props: {
      justified: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        tabs: [],
        groupedTabs: []
      }
    },
    mounted () {
      if (this.tabs && this.tabs.length > 0) {
        this.select(0)
      }
    },
    methods: {
      computeGroupedTabs () {
        let tabs = []
        let groupNameHash = {}
        this.tabs.forEach(tab => {
          if (tab.group) {
            if (groupNameHash.hasOwnProperty(tab.group)) {
              tabs[groupNameHash[tab.group]].tabs.push(tab)
            } else {
              tabs.push({
                tabs: [tab],
                group: tab.group
              })
              groupNameHash[tab.group] = tabs.length - 1
            }
            if (tab.active) {
              tabs[groupNameHash[tab.group]].active = true
            }
          } else {
            tabs.push(tab)
          }
        })
        this.groupedTabs = tabs
      },
      select (index) {
        let tab = index
        if (typeof index === 'number' && index >= 0 && index < this.tabs.length) {
          tab = this.tabs[index]
        } else {
          index = this.tabs.indexOf(tab)
        }
        if (!tab.disabled) {
          this.tabs.forEach(tab => {
            tab.active = false
          })
          tab.active = true
          this.computeGroupedTabs()
          this.$emit('after-active', index)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
