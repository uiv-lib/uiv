<template>
  <section>
    <ul :class="navClasses" role="tablist">
      <template v-for="(tab, index) in groupedTabs">
        <dropdown v-if="tab.tabs" role="presentation" tag="li" :class="getTabClasses(tab)" v-show="!tab.hidden">
          <a class="dropdown-toggle" role="tab" href="#" @click.prevent>{{tab.group}} <span class="caret"></span></a>
          <template slot="dropdown">
            <li v-for="subTab in tab.tabs" :class="getTabClasses(subTab,true)" v-show="!subTab.hidden">
              <a href="#" @click.prevent="select(tabs.indexOf(subTab))">{{subTab.title}}</a>
            </li>
          </template>
        </dropdown>
        <li v-else role="presentation" :class="getTabClasses(tab)" v-show="!tab.hidden">
          <a role="tab" href="#" @click.prevent="select(tabs.indexOf(tab))" v-if="tab.$slots.title">
            <portal-target :name="tab._uid.toString()"/>
          </a>
          <a role="tab" href="#" @click.prevent="select(tabs.indexOf(tab))" v-else-if="tab.htmlTitle"
             v-html="tab.title"></a>
          <a role="tab" href="#" @click.prevent="select(tabs.indexOf(tab))" v-else-if="tab.title"
             v-text="tab.title"></a>
        </li>
      </template>
      <li class="pull-right" v-if="!justified && $slots['nav-right']">
        <slot name="nav-right"/>
      </li>
    </ul>
    <div :class="contentClasses">
      <slot/>
    </div>
  </section>
</template>

<script>
  import Dropdown from '../dropdown/Dropdown.js'
  import { PortalTarget } from 'portal-vue'
  import { isNumber, isFunction, isExist, isString, assign } from '../../utils/objectUtils'

  const BEFORE_CHANGE_EVENT = 'before-change'

  export default {
    components: { Dropdown, PortalTarget },
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
      stacked: Boolean,
      customNavClass: null,
      customContentClass: null
    },
    data () {
      return {
        tabs: [],
        activeIndex: 0 // Make v-model not required
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
      }
    },
    computed: {
      navClasses () {
        const tabClasses = {
          'nav': true,
          'nav-justified': this.justified,
          'nav-tabs': !this.pills,
          'nav-pills': this.pills,
          'nav-stacked': this.stacked && this.pills
        }
        const customNavClass = this.customNavClass
        if (isExist(customNavClass)) {
          if (isString(customNavClass)) {
            return assign({}, tabClasses, {
              [customNavClass]: true
            })
          } else {
            return assign({}, tabClasses, customNavClass)
          }
        } else {
          return tabClasses
        }
      },
      contentClasses () {
        const contentClasses = {
          'tab-content': true
        }
        const customContentClass = this.customContentClass
        if (isExist(customContentClass)) {
          if (isString(customContentClass)) {
            return assign({}, contentClasses, {
              [customContentClass]: true
            })
          } else {
            return assign({}, contentClasses, customContentClass)
          }
        } else {
          return contentClasses
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
        tabs = tabs.map(tab => {
          if (Array.isArray(tab.tabs)) {
            tab.hidden = tab.tabs.filter(v => v.hidden).length === tab.tabs.length
          }
          return tab
        })
        return tabs
      }
    },
    methods: {
      getTabClasses (tab, isSubTab = false) {
        let defaultClasses = {
          active: tab.active,
          disabled: tab.disabled,
          'pull-right': tab.pullRight && !isSubTab
        }

        // return with new classes added to tab
        return assign(defaultClasses, tab['tabClasses'])
      },
      selectCurrent () {
        let found = false
        this.tabs.forEach((tab, index) => {
          if (index === this.activeIndex) {
            found = !tab.active
            tab.active = true
          } else {
            tab.active = false
          }
        })
        if (found) {
          this.$emit('change', this.activeIndex)
        }
      },
      selectValidate (index) {
        if (isFunction(this.$listeners[BEFORE_CHANGE_EVENT])) {
          this.$emit(BEFORE_CHANGE_EVENT, this.activeIndex, index, (result) => {
            if (!isExist(result)) {
              this.$select(index)
            }
          })
        } else {
          this.$select(index)
        }
      },
      select (index) {
        if (!this.tabs[index].disabled && index !== this.activeIndex) {
          this.selectValidate(index)
        }
      },
      $select (index) {
        if (isNumber(this.value)) {
          this.$emit('input', index)
        } else {
          this.activeIndex = index
          this.selectCurrent()
        }
      }
    }
  }
</script>
