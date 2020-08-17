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
      data-role="trigger"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keydown.prevent.stop.down="goNextOption"
      @keydown.prevent.stop.up="goPrevOption"
      @keydown.prevent.stop.enter="selectOption">
      <div class="pull-right" style="display: inline-block;vertical-align: middle">
        <span>&nbsp;</span>
        <span class="caret"></span>
      </div>
      <div
        :class="selectTextClasses"
        style="overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;"
        v-text="selectedText"
      ></div>
    </div>
    <template slot="dropdown">
      <li v-if="filterable" style="padding: 4px 8px">
        <input
          aria-label="Filter..."
          ref="filterInput"
          class="form-control input-sm"
          type="text"
          :placeholder="filterPlaceholder || t('uiv.multiSelect.filterPlaceholder')"
          v-model="filterInput"
          @keyup="searchClicked"
          @keydown.prevent.stop.down="goNextOption"
          @keydown.prevent.stop.up="goPrevOption"
          @keydown.prevent.stop.enter="selectOption"
        />
      </li>
      <template v-for="item in groupedOptions">
        <li v-if="item.$group" class="dropdown-header" v-text="item.$group"></li>
        <template v-for="_item in item.options">
          <li
            @keydown.prevent.stop.down="goNextOption"
            @keydown.prevent.stop.up="goPrevOption"
            @keydown.prevent.stop.enter="selectOption"
            :class="itemClasses(_item)"
            @click.stop="toggle(_item)"
            @mouseenter="currentActive=-1"
            style="outline: 0">
            <a role="button" v-if="customOptionsVisible" style="outline: 0">
              <slot name="custom-option"
                    :item="_item">
              </slot>
              <span v-if="selectedIcon && isItemSelected(_item)" :class="selectedIconClasses"></span>
            </a>
            <a role="button" v-else-if="isItemSelected(_item)" style="outline: 0">
              <b>{{_item[labelKey]}}</b>
              <span v-if="selectedIcon" :class="selectedIconClasses"></span>
            </a>
            <a role="button" v-else style="outline: 0">
              <span>{{_item[labelKey]}}</span>
            </a>
          </li>
        </template>
      </template>
    </template>
  </dropdown>
</template>

<script>
  import Local from '../../mixins/localeMixin'
  import Dropdown from '../dropdown/Dropdown.vue'
  import {onlyUnique} from '../../utils/arrayUtils'

  export default {
    mixins: [Local],
    components: {Dropdown},
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
      placeholder: String,
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
      filterAutoFocus: {
        type: Boolean,
        default: true
      },
      filterFunction: Function,
      filterPlaceholder: String,
      selectedIcon: {
        type: String,
        default: 'glyphicon glyphicon-ok'
      },
      itemSelectedClass: String,
      fireEvent: {
        type: Boolean,
        default: false
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
      groupedOptions () {
        return this.filteredOptions
          .map(v => v.group)
          .filter(onlyUnique)
          .map(v => ({
            options: this.filteredOptions.filter(option => option.group === v),
            $group: v
          }))
      },
      flatternGroupedOptions () {
        if (this.groupedOptions && this.groupedOptions.length) {
          let result = []
          this.groupedOptions.forEach(v => {
            result = result.concat(v.options)
          })
          return result
        } else {
          return []
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
          return this.placeholder || this.t('uiv.multiSelect.placeholder')
        }
      },
      customOptionsVisible () {
        return !!this.$slots['custom-option'] || !!this.$scopedSlots['custom-option']
      }
    },
    watch: {
      showDropdown (v) {
        // clear filter input when dropdown toggles
        this.filterInput = ''
        this.currentActive = -1
        this.$emit('visible-change', v)
        if (v && this.filterable && this.filterAutoFocus) {
          this.$nextTick(() => {
            this.$refs.filterInput.focus()
          })
        }
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
        this.currentActive > 0 ? this.currentActive-- : this.currentActive = this.flatternGroupedOptions.length - 1
      },
      goNextOption () {
        if (!this.showDropdown) {
          return
        }
        this.currentActive < this.flatternGroupedOptions.length - 1 ? this.currentActive++ : this.currentActive = 0
      },
      selectOption () {
        const index = this.currentActive
        const options = this.flatternGroupedOptions
        if (!this.showDropdown) {
          this.showDropdown = true
        } else if (index >= 0 && index < options.length) {
          this.toggle(options[index])
        }
      },
      itemClasses (item) {
        const result = {
          disabled: item.disabled,
          active: this.currentActive === this.flatternGroupedOptions.indexOf(item)
        }
        if (this.itemSelectedClass) {
          result[this.itemSelectedClass] = this.isItemSelected(item)
        }
        return result
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
        if (this.limit === 1) {
          const newValue = index >= 0 ? [] : [value]
          this.$emit('input', newValue)
          this.$emit('change', newValue)
        } else {
          if (index >= 0) {
            const newVal = this.value.slice()
            newVal.splice(index, 1)
            this.$emit('input', newVal)
            this.$emit('change', newVal)
          } else if (this.limit === 0 || this.value.length < this.limit) {
            const newVal = this.value.slice()
            newVal.push(value)
            this.$emit('input', newVal)
            this.$emit('change', newVal)
          } else {
            this.$emit('limit-exceed')
          }
        }
      },
      searchClicked (event) {
        if (!this.fireEvent) {
          return
        }
        if (event.key === 'Enter') {
          this.$emit('search', this.filterInput)
        }
      }
    }
  }
</script>
