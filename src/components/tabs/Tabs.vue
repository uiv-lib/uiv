<template>
  <section>
    <ul :class="navClasses" role="tablist">
      <template v-for="(tab, index) in groupedTabs">
        <dropdown v-if="tab.tabs" role="presentation" tag="li" :class="getTabClasses(tab)">
          <a class="dropdown-toggle" role="tab" href="#" @click.prevent>{{tab.group}} <span class="caret"></span></a>
          <template slot="dropdown">
            <li v-for="subTab in tab.tabs" :class="getTabClasses(subTab,true)">
              <a href="#" @click.prevent="select(tabs.indexOf(subTab))">{{subTab.title}}</a>
            </li>
          </template>
        </dropdown>
        <li v-else role="presentation" :class="getTabClasses(tab)">
          <a role="tab" href="#" @click.prevent="select(tabs.indexOf(tab))">
            <span v-if="tab.htmlTitle" v-html="tab.title"></span>
            <template v-else>{{tab.title}}</template>
          </a>
        </li>
      </template>
      <li class="pull-right" v-if="!justified && $slots['nav-right']">
        <slot name="nav-right"/>
      </li>
    </ul>
    <div class="tab-content">
      <slot/>
    </div>
  </section>
</template>

<script>
  import Dropdown from '../dropdown/Dropdown.vue'
  import {isNumber} from '../../utils/objectUtils'

  export default {
    components: {Dropdown},
    props: {
      value: {
        type: Number,
        validator: v => v >= 0
      },
      transitionDuration: {
        type: Number,
        default: 150
      },
      justified: Boolean,
      pills: Boolean,
      stacked: Boolean
    },
    data () {
      return {
        tabs: [],
        activeIndex: 0, // Make v-model not required
        prevIndex: 0
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (value) {
          if (isNumber(value)) {
            this.activeIndex = value
            this.selectCurrent()
          }
        }
      },
      tabs (tabs) {
        tabs.forEach((tab, index) => {
          tab.transition = this.transitionDuration
          if (index === this.activeIndex) {
            tab.show()
          }
        })
        this.selectCurrent()
      },
      activeIndex (newIndex, oldIndex) {
        this.prevIndex = oldIndex
      }
    },
    computed: {
      navClasses () {
        return {
          nav: true,
          'nav-justified': this.justified,
          'nav-tabs': !this.pills,
          'nav-pills': this.pills,
          'nav-stacked': this.stacked && this.pills
        }
      },
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
      getTabClasses (tab, isSubTab = false) {
        return {
          active: tab.active,
          disabled: tab.disabled,
          'pull-right': tab.pullRight && !isSubTab
        }
      },
      selectCurrent () {
        let found = false
        this.tabs.forEach((tab, index) => {
          if (index === this.activeIndex) {
            found = !tab.active
          } else {
            tab.active = false
          }
        })
        if (found) {
          const self = this
          if (typeof this.$listeners['before-change'] === 'function') {
            this.beforeChange(this.activeIndex).then((result) => {
              if (result) {
                self.$emit('change', this.activeIndex)
              } else {
                self.activeIndex = self.prevIndex
              }
              self.tabs[self.activeIndex].active = true
            })
          } else {
            this.tabs[this.activeIndex].active = true
            this.$emit('change', this.activeIndex)
          }
        }
      },
      select (index) {
        if (!this.tabs[index].disabled) {
          if (isNumber(this.value)) {
            this.$emit('input', index)
          } else {
            this.activeIndex = index
            this.selectCurrent()
          }
        }
      },
      beforeChange (index) {
        const self = this
        let allowed = true
        let callbackPromise = new Promise((resolve, reject) => {
          self.$emit(
            'before-change',
            {
              allow: (result) => {
                if (typeof result === typeof true) {
                  allowed = allowed && result
                }
                resolve(allowed)
              },
              index: index
            }
          )
        })
        let timeoutPromise = new Promise((resolve, reject) => {
          let timeout = setTimeout(() => {
            clearTimeout(timeout)
            resolve(allowed)
          }, 500)
        })
        return Promise.race([callbackPromise, timeoutPromise])
      }
    }
  }
</script>
