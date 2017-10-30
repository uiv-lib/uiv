<template>
  <section>
    <ul class="nav nav-tabs" role="tablist" :class="{'nav-justified': justified}">
      <template v-for="(tab, index) in groupedTabs">
        <dropdown v-if="tab.tabs" role="presentation" tag="li"
                  :class="{active: tab.active, disabled: tab.disabled, 'pull-right': tab.pullRight}">
          <a class="dropdown-toggle" role="tab" href="javascript:void(0)">{{tab.group}} <span class="caret"></span></a>
          <template slot="dropdown">
            <li v-for="subTab in tab.tabs" :class="{active: subTab.active, disabled: subTab.disabled}">
              <a href="javascript:void(0)" @click="select(tabs.indexOf(subTab))">{{subTab.title}}</a>
            </li>
          </template>
        </dropdown>
        <li v-else role="presentation"
            :class="{active: tab.active, disabled: tab.disabled, 'pull-right': tab.pullRight}">
          <a v-if="tab.htmlTitle" v-html="tab.title" role="tab" href="javascript:void(0);"
             @click="select(tabs.indexOf(tab))"></a>
          <a v-else role="tab" href="javascript:void(0);" @click="select(tabs.indexOf(tab))">{{tab.title}}</a>
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
        default: false
      },
      transitionDuration: {
        type: Number,
        default: 150
      }
    },
    data () {
      return {
        tabs: [],
        activeIndex: 0 // Make v-model not required
      }
    },
    watch: {
      value (v) {
        this.activeIndex = v
        this.selectCurrent()
      }
    },
    mounted () {
      if (typeof this.value === 'number') {
        this.activeIndex = this.value
      }
      if (this.tabs.length) {
        this.tabs.forEach((tab, i) => {
          tab.transition = this.transitionDuration
          if (i === this.activeIndex) {
            tab.show()
          }
        })
        this.selectCurrent()
      }
    },
    computed: {
      groupedTabs () {
        let tabs = []
        let hash = {}
        this.tabs.forEach(tab => {
          if (tab.group) {
            if (hash.hasOwnProperty(tab.group)) {
              tabs[hash[tab.group]].tabs.push(tab)
            } else {
              tabs.push({
                tabs: [tab],
                group: tab.group
              })
              hash[tab.group] = tabs.length - 1
            }
            if (tab.active) {
              tabs[hash[tab.group]].active = true
            }
            if (tab.pullRight) {
              tabs[hash[tab.group]].pullRight = true
            }
          } else {
            tabs.push(tab)
          }
        })
        return tabs
      }
    },
    methods: {
      selectCurrent () {
        this.tabs.forEach((tab, index) => {
          tab.active = index === this.activeIndex
        })
        this.$emit('change', this.activeIndex)
      },
      select (index) {
        if (!this.tabs[index].disabled) {
          if (typeof this.value === 'number') {
            this.$emit('input', index)
          } else {
            this.activeIndex = index
            this.selectCurrent()
          }
        }
      }
    }
  }
</script>
