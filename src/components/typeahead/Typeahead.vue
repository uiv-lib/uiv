<template>
  <dropdown ref="dropdown"
            v-model="open"
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
</template>

<script>
  import httpUtils from './../../utils/httpUtils'
  import domUtils from './../../utils/domUtils'
  import Dropdown from './../dropdown/Dropdown.vue'

  export default {
    components: {Dropdown},
    props: {
      value: {
        required: true
      },
      data: {
        type: Array
      },
      itemKey: {
        type: String
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      ignoreCase: {
        type: Boolean,
        default: true
      },
      matchStart: {
        type: Boolean,
        default: false
      },
      forceSelect: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 10
      },
      asyncSrc: {
        type: String
      },
      asyncKey: {
        type: String
      },
      debounce: {
        type: Number,
        default: 200
      },
      openOnFocus: {
        type: Boolean,
        default: true
      },
      openOnEmpty: {
        type: Boolean,
        default: false
      },
      target: {
        required: true
      }
    },
    data () {
      return {
        inputEl: null,
        items: [],
        activeIndex: 0,
        timeoutID: 0,
        elements: [],
        open: false,
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
      this.$nextTick(() => {
        this.initInputElByTarget(this.target)
        this.initListeners()
        this.dropdownMenuEl = this.$refs.dropdown.$el.querySelector('.dropdown-menu')
      })
    },
    beforeDestroy () {
      this.removeListeners()
    },
    watch: {
      target (el) {
        this.removeListeners()
        this.initInputElByTarget(el)
        this.initListeners()
      },
      value (newValue, oldValue) {
        if (typeof newValue === 'string') {
          // direct
          this.inputEl.value = newValue
        } else if (newValue) {
          // is object
          this.inputEl.value = this.itemKey ? newValue[this.itemKey] : newValue
        } else {
          // is null or undefined or something else not valid
          this.inputEl.value = ''
        }
      }
    },
    methods: {
      initInputElByTarget (target) {
        if (!target) {
          return
        }
        if (typeof target === 'string') { // is selector
          this.inputEl = document.querySelector(target)
        } else if (domUtils.isElement(target)) { // is element
          this.inputEl = target
        } else if (domUtils.isElement(target.$el)) { // is component
          this.inputEl = target.$el
        }
      },
      initListeners () {
        if (this.inputEl) {
          this.elements = [this.inputEl]
          domUtils.on(this.inputEl, domUtils.events.FOCUS, this.inputFocused)
          domUtils.on(this.inputEl, domUtils.events.BLUR, this.inputBlured)
          domUtils.on(this.inputEl, domUtils.events.INPUT, this.inputChanged)
          domUtils.on(this.inputEl, domUtils.events.KEY_DOWN, this.inputKeyPressed)
        }
      },
      removeListeners () {
        this.elements = []
        if (this.inputEl) {
          domUtils.off(this.inputEl, domUtils.events.FOCUS, this.inputFocused)
          domUtils.off(this.inputEl, domUtils.events.BLUR, this.inputBlured)
          domUtils.off(this.inputEl, domUtils.events.INPUT, this.inputChanged)
          domUtils.off(this.inputEl, domUtils.events.KEY_DOWN, this.inputKeyPressed)
        }
      },
      prepareItems (data, disableFilters = false) {
        if (disableFilters) {
          this.items = data.slice(0, this.limit)
          return
        }
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
        if (value === '' && !this.openOnEmpty) {
          this.open = false
        } else if (this.data) {
          this.prepareItems(this.data)
          this.open = !!this.items.length
        } else if (this.asyncSrc) {
          this.timeoutID = setTimeout(() => {
            this.$emit('loading')
            httpUtils.get(this.asyncSrc + value)
              .then(data => {
                if (this.inputEl.matches(':focus')) {
                  this.prepareItems(this.asyncKey ? data[this.asyncKey] : data, true)
                  this.open = !!this.items.length
                }
                this.$emit('loaded')
              })
              .catch(err => {
                console.error(err)
                this.$emit('loaded-error')
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
          this.open = false
        }
      },
      inputKeyPressed (event) {
        if (this.open) {
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
        this.$emit('input', item)
        this.open = false
      },
      highlight (item) {
        let value = this.itemKey ? item[this.itemKey] : item
        let inputValue = this.inputEl.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
        return value.replace(new RegExp(`${inputValue}`, this.regexOptions), '<b>$&</b>')
      }
    }
  }
</script>
