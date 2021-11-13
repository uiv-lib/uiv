<template>
  <section>
    <ul :class="navClasses" role="tablist">
      <template v-for="(tab, i) in groupedTabs" :key="i">
        <dropdown
          v-if="tab.tabs"
          v-show="!tab.hidden"
          role="presentation"
          tag="li"
          :class="getTabClasses(tab)"
        >
          <a class="dropdown-toggle" role="tab" href="#" @click.prevent
            >{{ tab.group }} <span class="caret"></span
          ></a>
          <template #dropdown>
            <li
              v-for="(subTab, j) in tab.tabs"
              v-show="!subTab.hidden"
              :key="`${i}_${j}`"
              :class="getTabClasses(subTab, true)"
            >
              <a href="#" @click.prevent="select(tabs.indexOf(subTab))">{{
                subTab.title
              }}</a>
            </li>
          </template>
        </dropdown>
        <li
          v-else
          v-show="!tab.hidden"
          role="presentation"
          :class="getTabClasses(tab)"
        >
          <a
            v-if="tab.$slots.title"
            :id="tab.uid"
            role="tab"
            href="#"
            @click.prevent="select(tabs.indexOf(tab))"
          />
          <a
            v-else
            role="tab"
            href="#"
            @click.prevent="select(tabs.indexOf(tab))"
            v-text="tab.title"
          ></a>
        </li>
      </template>
      <li v-if="!justified && $slots['nav-right']" class="pull-right">
        <slot name="nav-right" />
      </li>
    </ul>
    <div :class="contentClasses">
      <slot />
    </div>
  </section>
</template>

<script>
import Dropdown from '../dropdown/Dropdown.vue'
import {
  isNumber,
  isFunction,
  isExist,
  isString,
  assign,
  hasOwnProperty,
} from '../../utils/object.utils'

export default {
  components: { Dropdown },
  props: {
    modelValue: {
      type: Number,
      validator: (v) => v >= 0,
      default: undefined,
    },
    transition: {
      type: Number,
      default: 150,
    },
    justified: Boolean,
    pills: Boolean,
    stacked: Boolean,
    customNavClass: { type: null, default: undefined },
    customContentClass: { type: null, default: undefined },
    beforeChange: { type: Function, default: undefined },
  },
  emits: ['update:modelValue', 'change', 'changed'],
  data() {
    return {
      tabs: [],
      activeIndex: 0, // Make v-model not required
    }
  },
  computed: {
    navClasses() {
      const tabClasses = {
        nav: true,
        'nav-justified': this.justified,
        'nav-tabs': !this.pills,
        'nav-pills': this.pills,
        'nav-stacked': this.stacked && this.pills,
      }
      const customNavClass = this.customNavClass
      if (isExist(customNavClass)) {
        if (isString(customNavClass)) {
          return assign({}, tabClasses, {
            [customNavClass]: true,
          })
        } else {
          return assign({}, tabClasses, customNavClass)
        }
      } else {
        return tabClasses
      }
    },
    contentClasses() {
      const contentClasses = {
        'tab-content': true,
      }
      const customContentClass = this.customContentClass
      if (isExist(customContentClass)) {
        if (isString(customContentClass)) {
          return assign({}, contentClasses, {
            [customContentClass]: true,
          })
        } else {
          return assign({}, contentClasses, customContentClass)
        }
      } else {
        return contentClasses
      }
    },
    groupedTabs() {
      let tabs = []
      const hash = {}
      this.tabs.forEach((tab) => {
        if (tab.group) {
          if (hasOwnProperty(hash, tab.group)) {
            tabs[hash[tab.group]].tabs.push(tab)
          } else {
            tabs.push({
              tabs: [tab],
              group: tab.group,
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
      tabs = tabs.map((tab) => {
        if (Array.isArray(tab.tabs)) {
          tab.hidden =
            tab.tabs.filter((v) => v.hidden).length === tab.tabs.length
        }
        return tab
      })
      return tabs
    },
  },
  watch: {
    modelValue(value) {
      if (isNumber(value)) {
        this.activeIndex = value
        this.selectCurrent()
      }
    },
    tabs(tabs) {
      tabs.forEach((tab, index) => {
        tab.transition = this.transition
        if (index === this.activeIndex) {
          tab.show()
        }
      })
      this.selectCurrent()
    },
  },
  mounted() {
    this.selectCurrent()
  },
  methods: {
    getTabClasses(tab, isSubTab = false) {
      const defaultClasses = {
        active: tab.active,
        disabled: tab.disabled,
        'pull-right': tab.pullRight && !isSubTab,
      }

      // return with new classes added to tab
      return assign(defaultClasses, tab.tabClasses)
    },
    selectCurrent() {
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
    selectValidate(index) {
      if (isFunction(this.beforeChange)) {
        this.beforeChange(this.activeIndex, index, (result) => {
          if (!isExist(result)) {
            this.$select(index)
          }
        })
      } else {
        this.$select(index)
      }
    },
    select(index) {
      if (!this.tabs[index].disabled && index !== this.activeIndex) {
        this.selectValidate(index)
      }
    },
    $select(index) {
      if (isNumber(this.modelValue)) {
        this.$emit('update:modelValue', index)
      } else {
        this.activeIndex = index
        this.selectCurrent()
      }
    },
  },
}
</script>
