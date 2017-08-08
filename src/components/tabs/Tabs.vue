<template>
  <section>
    <ul class="nav nav-tabs" role="tablist" :class="{'nav-justified':justified}">
      <template v-for="(tab,index) in groupedTabs">
        <dropdown v-if="tab.tabs" role="presentation" tag="li"
                  :class="{'active':tab.active,'disabled':tab.disabled,'pull-right':tab.pullRight}">
          <a data-role="trigger" role="tab" href="javascript:void(0)">
            <span>{{tab.group}}</span>
            <span class="caret"></span>
          </a>
          <template slot="dropdown">
            <li v-for="subTab in tab.tabs" :class="{'active':subTab.active,'disabled':subTab.disabled}">
              <a href="javascript:void(0)" @click="select(tabs.indexOf(subTab))">
                {{subTab.title}}
              </a>
            </li>
          </template>
        </dropdown>
        <li v-else role="presentation"
            :class="{'active':tab.active,'disabled':tab.disabled,'pull-right':tab.pullRight}">
          <a role="tab" href="javascript:void(0);" @click="select(tabs.indexOf(tab))">
            <span v-if="tab.htmlTitle" v-html="tab.title"></span>
            <span v-else v-text="tab.title"></span>
          </a>
        </li>
      </template>
      <li class="pull-right" v-if="!justified && $slots['nav-right']">
        <slot name="nav-right"></slot>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  import Dropdown from '../dropdown/Dropdown.vue'

  export default {
    components: {
      Dropdown
    },
    props: {
      value: {
        type: Number
      },
      justified: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        tabs: [],
        activeIndex: 0, // Make v-model not required
        groupedTabs: []
      }
    },
    watch: {
      value (v) {
        this.activeIndex = v
        this.$selectCurrent()
      }
    },
    mounted () {
      if (typeof this.value !== 'undefined') {
        this.activeIndex = this.value
      }
      if (this.tabs.length) {
        this.$selectCurrent()
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
            if (tab.pullRight) {
              tabs[groupNameHash[tab.group]].pullRight = true
            }
          } else {
            tabs.push(tab)
          }
        })
        this.groupedTabs = tabs
      },
      $selectCurrent () {
        this.tabs.forEach(tab => {
          tab.active = false
        })
        let tab = this.tabs[this.activeIndex]
        tab.active = true
        this.computeGroupedTabs()
        this.$emit('change', this.activeIndex)
      },
      select (index) {
        if (!this.tabs[index].disabled) {
          if (typeof this.value !== 'undefined') {
            this.$emit('input', index)
          } else {
            this.activeIndex = index
            this.$selectCurrent()
          }
        }
      }
    }
  }
</script>
