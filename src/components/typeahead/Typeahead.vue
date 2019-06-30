<template>
  <dropdown ref="dropdown"
            v-model="open"
            tag="section"
            :append-to-body="appendToBody"
            :not-close-elements="elements"
            :position-element="inputEl">
    <template slot="dropdown">
      <slot name="item" :items="items" :active-index="activeIndex" :select="selectItem" :highlight="highlight">
        <li v-for="(item,index) in items" :class="{active:activeIndex===index}">
          <a href="#" @click.prevent="selectItem(item)">
            <span v-html="highlight(item)"></span>
          </a>
        </li>
      </slot>
      <slot name="empty" v-if="!items || items.length === 0"/>
    </template>
  </dropdown>
</template>

<script>
  import {getRequest} from '../../utils/httpUtils'
  import {isString} from '../../utils/objectUtils'
  import {
    isElement,
    on,
    off,
    ensureElementMatchesFunction,
    EVENTS
  } from '../../utils/domUtils'
  import Dropdown from './../dropdown/Dropdown.vue'

  export default {
    components: {Dropdown},
    props: {
      value: {
        required: true
      },
      data: Array,
      itemKey: String,
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
      forceClear: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 10
      },
      asyncSrc: String,
      asyncKey: String,
      asyncFunction: Function,
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
      },
      preselect: {
        type: Boolean,
        default: true
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
      ensureElementMatchesFunction()
      this.$nextTick(() => {
        this.initInputElByTarget(this.target)
        this.initListeners()
        this.dropdownMenuEl = this.$refs.dropdown.$el.querySelector('.dropdown-menu')
        // set input text if v-model not empty
        if (this.value) {
          this.setInputTextByValue(this.value)
        }
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
      value (value) {
        this.setInputTextByValue(value)
      }
    },
    methods: {
      setInputTextByValue (value) {
        if (isString(value)) {
          // direct
          this.inputEl.value = value
        } else if (value) {
          // is object
          this.inputEl.value = this.itemKey ? value[this.itemKey] : value
        } else if (value === null) {
          // is null or undefined or something else not valid
          this.inputEl.value = ''
        }
      },
      hasEmptySlot () {
        return !!this.$slots['empty'] || !!this.$scopedSlots['empty']
      },
      initInputElByTarget (target) {
        if (!target) {
          return
        }
        if (isString(target)) { // is selector
          this.inputEl = document.querySelector(target)
        } else if (isElement(target)) { // is element
          this.inputEl = target
        } else if (isElement(target.$el)) { // is component
          this.inputEl = target.$el
        }
      },
      initListeners () {
        if (this.inputEl) {
          this.elements = [this.inputEl]
          on(this.inputEl, EVENTS.FOCUS, this.inputFocused)
          on(this.inputEl, EVENTS.BLUR, this.inputBlured)
          on(this.inputEl, EVENTS.INPUT, this.inputChanged)
          on(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed)
        }
      },
      removeListeners () {
        this.elements = []
        if (this.inputEl) {
          off(this.inputEl, EVENTS.FOCUS, this.inputFocused)
          off(this.inputEl, EVENTS.BLUR, this.inputBlured)
          off(this.inputEl, EVENTS.INPUT, this.inputChanged)
          off(this.inputEl, EVENTS.KEY_DOWN, this.inputKeyPressed)
        }
      },
      prepareItems (data, disableFilters = false) {
        if (disableFilters) {
          this.items = data.slice(0, this.limit)
          return
        }
        this.items = []
        this.activeIndex = this.preselect ? 0 : -1
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
          this.open = this.hasEmptySlot() || Boolean(this.items.length)
        } else if (this.asyncSrc) {
          this.timeoutID = setTimeout(() => {
            this.$emit('loading')
            getRequest(this.asyncSrc + encodeURIComponent(value))
              .then(data => {
                if (this.inputEl.matches(':focus')) {
                  this.prepareItems(this.asyncKey ? data[this.asyncKey] : data, true)
                  this.open = this.hasEmptySlot() || Boolean(this.items.length)
                }
                this.$emit('loaded')
              })
              .catch(err => {
                console.error(err)
                this.$emit('loaded-error')
              })
          }, debounce)
        } else if (this.asyncFunction) {
          const cb = (data) => {
            if (this.inputEl.matches(':focus')) {
              this.prepareItems(data, true)
              this.open = this.hasEmptySlot() || Boolean(this.items.length)
            }
            this.$emit('loaded')
          }
          this.timeoutID = setTimeout(() => {
            this.$emit('loading')
            this.asyncFunction(value, cb)
          }, debounce)
        }
      },
      inputChanged () {
        let value = this.inputEl.value
        this.fetchItems(value, this.debounce)
        this.$emit('input', this.forceSelect ? undefined : value)
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
        if (this.inputEl && this.forceClear) {
          this.$nextTick(() => {
            if (typeof this.value === 'undefined') {
              this.inputEl.value = ''
            }
          })
        }
      },
      inputKeyPressed (event) {
        event.stopPropagation()
        if (this.open) {
          switch (event.keyCode) {
            case 13:
              if (this.activeIndex >= 0) {
                this.selectItem(this.items[this.activeIndex])
              } else {
                this.open = false
              }
              event.preventDefault()
              break
            case 27:
              this.open = false
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
