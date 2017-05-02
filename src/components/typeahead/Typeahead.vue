<template>
  <div>
    <slot></slot>
    <dropdown ref="dropdown"
              v-model="openDropdown"
              :append-to-body="appendToBody"
              :not-close-elements="elements"
              :position-element="inputEl">
      <template slot="dropdown">
        <slot name="item" :items="items" :active-index="activeIndex" :select="selectItem" :highlight="highlight">
          <li v-for="(item,index) in items" :class="{active:activeIndex===index}">
            <a href="javascript:void(0)" @click="selectItem(item)">
              <span v-html="highlight(item)"></span>
            </a>
          </li>
        </slot>
      </template>
    </dropdown>
  </div>
</template>

<script>
  import httpUtils from './../../utils/httpUtils'
  import domUtils from './../../utils/domUtils'
  import Dropdown from './../dropdown/Dropdown.vue'

  export default {
    components: {Dropdown},
    props: {
      value: {},
      data: {
        type: Array
      },
      itemKey: {
        type: String
      },
      appendToBody: {
        type: Boolean,
        'default': false
      },
      ignoreCase: {
        type: Boolean,
        'default': true
      },
      matchStart: {
        type: Boolean,
        'default': false
      },
      forceSelect: {
        type: Boolean,
        'default': false
      },
      limit: {
        type: Number,
        'default': 10
      },
      asyncSrc: {
        type: String
      },
      asyncKey: {
        type: String
      },
      debounce: {
        type: Number,
        'default': 200
      },
      openOnFocus: {
        type: Boolean,
        'default': true
      }
    },
    data () {
      return {
        inputEl: null,
        items: [],
        activeIndex: 0,
        timeoutID: 0,
        elements: [],
        openDropdown: false,
        dropdownMenuEl: null
      }
    },
    computed: {
      regexOptions () {
        let options = ''
        if (this.ignoreCase) {
          options += 'i'
        }
        if (!this.matchStart) {
          options += 'g'
        }
        return options
      }
    },
    mounted () {
      domUtils.ensureElementMatchesFunction()
      this.inputEl = this.$el.querySelector('[data-role="input"]')
      if (this.inputEl) {
        this.elements.push(this.inputEl)
        domUtils.on(this.inputEl, domUtils.events.FOCUS, this.inputFocused)
        domUtils.on(this.inputEl, domUtils.events.BLUR, this.inputBlured)
        domUtils.on(this.inputEl, domUtils.events.INPUT, this.inputChanged)
        domUtils.on(this.inputEl, domUtils.events.KEY_DOWN, this.inputKeyPressed)
      }
      this.dropdownMenuEl = this.$refs.dropdown.$el.querySelector('.dropdown-menu')
    },
    beforeDestroy () {
      if (this.inputEl) {
        domUtils.off(this.inputEl, domUtils.events.FOCUS, this.inputFocused)
        domUtils.off(this.inputEl, domUtils.events.BLUR, this.inputBlured)
        domUtils.off(this.inputEl, domUtils.events.INPUT, this.inputChanged)
        domUtils.off(this.inputEl, domUtils.events.KEY_DOWN, this.inputKeyPressed)
      }
    },
    methods: {
      prepareItems (data) {
        this.items = []
        this.activeIndex = 0
        for (let i = 0, l = data.length; i < l; i++) {
          let item = data[i]
          let key = this.itemKey ? item[this.itemKey] : item
          key = key.toString()
          let index = -1
          if (this.ignoreCase) {
            index = key.toLowerCase().indexOf(this.inputEl.value.toLowerCase())
          } else {
            index = key.indexOf(this.inputEl.value)
          }
          if (this.matchStart ? index === 0 : index >= 0) {
            this.items.push(item)
          }
          if (this.items.length >= this.limit) {
            break
          }
        }
      },
      fetchItems (value, debounce) {
        clearTimeout(this.timeoutID)
        if (value === '') {
          this.openDropdown = false
        } else if (this.data) {
          this.prepareItems(this.data)
          this.openDropdown = !!this.items.length
        } else if (this.asyncSrc) {
          this.timeoutID = setTimeout(() => {
            httpUtils.get(this.asyncSrc + value)
              .then(data => {
                if (this.inputEl.matches(':focus')) {
                  this.prepareItems(this.asyncKey ? data[this.asyncKey] : data)
                  this.openDropdown = !!this.items.length
                }
              })
          }, debounce)
        }
      },
      inputChanged () {
        let value = this.inputEl.value
        this.fetchItems(value, this.debounce)
        this.$emit('input', this.forceSelect ? null : value)
      },
      inputFocused () {
        if (this.openOnFocus) {
          let value = this.inputEl.value
          this.fetchItems(value, 0)
        }
      },
      inputBlured () {
        if (!this.dropdownMenuEl.matches(':hover')) {
          this.openDropdown = false
        }
      },
      inputKeyPressed (event) {
        if (this.openDropdown) {
          switch (event.keyCode) {
            case 13:
              this.selectItem(this.items[this.activeIndex])
              break
            case 38:
              this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : 0
              break
            case 40:
              let maxIndex = this.items.length - 1
              this.activeIndex = this.activeIndex < maxIndex ? this.activeIndex + 1 : maxIndex
              break
          }
        }
      },
      selectItem (item) {
        this.inputEl.value = this.itemKey ? item[this.itemKey] : item
        this.$emit('input', item)
        this.openDropdown = false
      },
      highlight (item) {
        let value = this.itemKey ? item[this.itemKey] : item
        return value.replace(new RegExp(`${this.inputEl.value}`, this.regexOptions), '<b>$&</b>')
      }
    }
  }
</script>
