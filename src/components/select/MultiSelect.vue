<template>
  <dropdown
    ref="dropdown"
    :not-close-elements="els"
    :disabled="disabled"
    :style="containerStyles"
    @keydown.native.esc="closeDropdown">
    <div
      class="form-control dropdown-toggle clearfix"
      :class="selectClasses"
      :disabled="disabled"
      tabindex="0"
      @keydown.enter="showDropdown">
      <div
        :class="selectTextClasses"
        style="display: inline-block;vertical-align: middle;">
        {{selectedText}}
      </div>
      <div class="pull-right" style="display: inline-block;vertical-align: middle">
        <span>&nbsp;</span>
        <span class="caret"></span>
      </div>
    </div>
    <template slot="dropdown">
      <li v-if="filterable" style="padding: 4px 8px">
        <input class="form-control input-sm" :placeholder="filterPlaceholder" v-model="filterInput"/>
      </li>
      <li
        v-for="item in filteredOptions"
        :class="itemClasses(item)"
        @click="toggle(item)">
        <a role="button" v-if="isItemSelected(item)">
          <b :class="selectedClass">{{item[labelKey]}}</b>
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
      },
      selectedClass: {
        type: String,
        default: 'text-primary'
      }
    },
    data () {
      return {
        els: [],
        filterInput: ''
      }
    },
    computed: {
      containerStyles () {
        return {
          width: this.block ? '100%' : ''
        }
      },
      filteredOptions () {
        if (this.filterable) {
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
          [this.selectedClass]: true,
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
    mounted () {
      this.els = [this.$el]
    },
    methods: {
      showDropdown () {
        this.$refs.dropdown.toggle(true)
      },
      closeDropdown () {
        this.$refs.dropdown.toggle(false)
      },
      itemClasses (item) {
        return {
          disabled: item.disabled
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
        } else if (this.limit === 0 || this.value.length < this.limit) {
          this.value.push(value)
        }
      }
    }
  }
</script>
