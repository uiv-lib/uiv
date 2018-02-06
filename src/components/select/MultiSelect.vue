<template>
  <dropdown
    v-model="showDropdown"
    ref="dropdown"
    :not-close-elements="els"
    :append-to-body="appendToBody"
    :disabled="disabled"
    :style="containerStyles"
    @keydown.native.esc="showDropdown=false">
    <div
      class="form-control dropdown-toggle clearfix"
      :class="selectClasses"
      :disabled="disabled"
      tabindex="0"
      @click="showDropdown=true"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keydown.prevent.down="goNextOption"
      @keydown.prevent.up="goPrevOption"
      @keydown.prevent.enter="selectOption">
      <div :class="selectTextClasses" style="display: inline-block;vertical-align: middle;">{{selectedText}}</div>
      <div class="pull-right" style="display: inline-block;vertical-align: middle">
        <span>&nbsp;</span>
        <span class="caret"></span>
      </div>
    </div>
    <template slot="dropdown">
      <li v-if="filterable" style="padding: 4px 8px">
        <input
          class="form-control input-sm"
          type="text"
          :placeholder="filterPlaceholder"
          v-model="filterInput"
          @keydown.prevent.down="goNextOption"
          @keydown.prevent.up="goPrevOption"
          @keydown.prevent.enter="selectOption"
        />
      </li>
      <li
        v-for="(item,index) in filteredOptions"
        :class="itemClasses(item,index)"
        @click="toggle(item)"
        @mouseenter="currentActive=-1">
        <a role="button" v-if="isItemSelected(item)">
          <b>{{item[labelKey]}}</b>
          <span v-if="selectedIcon" :class="selectedIconClasses"></span>
        </a>
        <a role="button" v-else>
          <span>{{item[labelKey]}}</span>
        </a>
      </li>
    </template>
  </dropdown>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      labelKey: {
        type: String,
        default: 'label'
      },
      valueKey: {
        type: String,
        default: 'value'
      },
      limit: {
        type: Number,
        default: 0
      },
      size: String,
      placeholder: {
        type: String,
        default: 'Select...'
      },
      split: {
        type: String,
        default: ', '
      },
      disabled: {
        type: Boolean,
        default: false
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      },
      collapseSelected: {
        type: Boolean,
        default: false
      },
      filterable: {
        type: Boolean,
        default: false
      },
      filterFunction: Function,
      filterPlaceholder: {
        type: String,
        default: 'Search...'
      },
      selectedIcon: {
        type: String,
        default: 'glyphicon glyphicon-ok'
      }
    },
    data () {
      return {
        showDropdown: false,
        els: [],
        filterInput: '',
        currentActive: -1
      }
    },
    computed: {
      containerStyles () {
        return {
          width: this.block ? '100%' : ''
        }
      },
      filteredOptions () {
        if (this.filterable && this.filterInput) {
          if (this.filterFunction) {
            return this.filterFunction(this.filterInput)
          } else {
            const filterInput = this.filterInput.toLowerCase()
            return this.options.filter(v => (
              v[this.valueKey].toString().toLowerCase().indexOf(filterInput) >= 0 ||
              v[this.labelKey].toString().toLowerCase().indexOf(filterInput) >= 0
            ))
          }
        } else {
          return this.options
        }
      },
      selectClasses () {
        return {
          [`input-${this.size}`]: this.size
        }
      },
      selectedIconClasses () {
        return {
          [this.selectedIcon]: true,
          'pull-right': true
        }
      },
      selectTextClasses () {
        return {
          'text-muted': this.value.length === 0
        }
      },
      labelValue () {
        const optionsByValue = this.options.map(v => v[this.valueKey])
        return this.value.map(v => {
          const index = optionsByValue.indexOf(v)
          return index >= 0 ? this.options[index][this.labelKey] : v
        })
      },
      selectedText () {
        if (this.value.length) {
          const labelValue = this.labelValue
          if (this.collapseSelected) {
            let str = labelValue[0]
            str += labelValue.length > 1 ? `${this.split}+${labelValue.length - 1}` : ''
            return str
          } else {
            return labelValue.join(this.split)
          }
        } else {
          return this.placeholder
        }
      }
    },
    watch: {
      showDropdown (v) {
        // clear filter input when dropdown toggles
        this.filterInput = ''
        this.currentActive = -1
        this.$emit('visible-change', v)
      }
    },
    mounted () {
      this.els = [this.$el]
    },
    methods: {
      goPrevOption () {
        if (!this.showDropdown) {
          return
        }
        this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.options.length - 1
      },
      goNextOption () {
        if (!this.showDropdown) {
          return
        }
        this.currentActive < this.options.length - 1 ? this.currentActive++ : this.currentActive = 0
      },
      selectOption () {
        const index = this.currentActive
        const options = this.filteredOptions
        if (!this.showDropdown) {
          this.showDropdown = true
        } else if (index >= 0 && index < options.length) {
          this.toggle(options[index])
        }
      },
      itemClasses (item, index) {
        return {
          disabled: item.disabled,
          active: this.currentActive === index
        }
      },
      isItemSelected (item) {
        return this.value.indexOf(item[this.valueKey]) >= 0
      },
      toggle (item) {
        if (item.disabled) {
          return
        }
        const value = item[this.valueKey]
        const index = this.value.indexOf(value)
        if (index >= 0) {
          this.value.splice(index, 1)
          this.$emit('change', this.value)
        } else if (this.limit === 0 || this.value.length < this.limit) {
          this.value.push(value)
          this.$emit('change', this.value)
        } else {
          this.$emit('limit-exceed')
        }
      }
    }
  }
</script>
