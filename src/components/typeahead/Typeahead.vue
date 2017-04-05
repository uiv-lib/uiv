<template>
  <div>
    <slot></slot>
    <dropdown ref="dropdown" :append-to-body="appendToBody">
      <button data-role="trigger" type="button" class="hidden"></button>
      <ul slot="dropdown" class="dropdown-menu">
        <li v-for="(item,index) in items" :class="{active:activeIndex===index}">
          <a href="javascript:void(0)" @click="selectItem(item)">
            <slot name="item" :item="item">
              <span v-html="highlight(item)"></span>
            </slot>
          </a>
        </li>
      </ul>
    </dropdown>
  </div>
</template>

<script>
  import utils from './../../utils/httpUtils'
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
        timeoutID: 0
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
      this.inputEl = this.$el.querySelector('[data-role="input"]')
      if (this.inputEl) {
        this.inputEl.addEventListener('focus', this.inputFocused)
        this.inputEl.addEventListener('input', this.inputChanged)
        this.inputEl.addEventListener('keydown', this.inputKeyPressed)
      }
    },
    beforeDestroy () {
      if (this.inputEl) {
        this.inputEl.removeEventListener('focus', this.inputFocused)
        this.inputEl.removeEventListener('input', this.inputChanged)
        this.inputEl.removeEventListener('keydown', this.inputKeyPressed)
      }
    },
    methods: {
      prepareItems (data) {
        this.items = []
        this.activeIndex = 0
        for (let i = 0, l = data.length; i < l; i++) {
          let item = data[i]
          let key = this.itemKey ? item[this.itemKey] : item
          let index = -1
          if (this.ignoreCase) {
            index = key.toLowerCase().indexOf(this.inputEl.value.toLowerCase())
          } else {
            index = key.indexOf(this.inputEl.value)
          }
          if ((this.matchStart && index === 0) || (!this.matchStart && index >= 0)) {
            this.items.push(item)
          }
          if (this.items.length >= this.limit) {
            break
          }
        }
      },
      fetchItems (value, debounce) {
        clearTimeout(this.timeoutID)
        if (value) {
          this.timeoutID = setTimeout(() => {
            if (this.data) {
              this.prepareItems(this.data)
              this.$refs.dropdown.toggle(!!this.items.length)
            } else if (this.asyncSrc) {
              utils.get(this.asyncSrc + value)
                .then(data => {
                  this.prepareItems(this.asyncKey ? data[this.asyncKey] : data)
                  this.$refs.dropdown.toggle(!!this.items.length)
                })
            }
          }, debounce)
        } else {
          this.$refs.dropdown.toggle(false)
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
          this.fetchItems(value, this.debounce) // If set to 0 on sync case dropdown won't open
        }
      },
      inputKeyPressed (event) {
        if (this.$refs.dropdown.show) {
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
        this.$refs.dropdown.toggle(false)
      },
      highlight (item) {
        let value = this.itemKey ? item[this.itemKey] : item
        return value.replace(new RegExp(`${this.inputEl.value}`, this.regexOptions), '<b>$&</b>')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
