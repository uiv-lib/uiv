<template>
  <dropdown
    ref="dropdown"
    v-model="showDropdown"
    :not-close-elements="els"
    :append-to-body="appendToBody"
    :disabled="disabled"
    :style="containerStyles"
    @keydown.esc="showDropdown = false"
  >
    <div
      class="form-control dropdown-toggle clearfix"
      :class="selectClasses"
      :disabled="disabled ? true : undefined"
      tabindex="0"
      data-role="trigger"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keydown.prevent.stop.down="goNextOption"
      @keydown.prevent.stop.up="goPrevOption"
      @keydown.prevent.stop.enter="selectOption"
    >
      <div
        class="pull-right"
        style="display: inline-block; vertical-align: middle"
      >
        <span>&nbsp;</span>
        <span class="caret"></span>
      </div>
      <div
        :class="selectTextClasses"
        style="overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap"
        v-text="selectedText"
      ></div>
    </div>
    <template #dropdown>
      <li v-if="filterable" style="padding: 4px 8px">
        <input
          ref="filterInput"
          v-model="filterInput"
          aria-label="Filter..."
          class="form-control input-sm"
          type="text"
          :placeholder="
            filterPlaceholder || t('uiv.multiSelect.filterPlaceholder')
          "
          @keyup.enter="searchClicked"
          @keydown.prevent.stop.down="goNextOption"
          @keydown.prevent.stop.up="goPrevOption"
          @keydown.prevent.stop.enter="selectOption"
        />
      </li>
      <template v-for="(item, i) in groupedOptions">
        <li
          v-if="item.$group"
          :key="i"
          class="dropdown-header"
          v-text="item.$group"
        ></li>
        <template v-for="(_item, j) in item.options" :key="`${i}_${j}`">
          <li
            :class="itemClasses(_item)"
            style="outline: 0"
            @keydown.prevent.stop.down="goNextOption"
            @keydown.prevent.stop.up="goPrevOption"
            @keydown.prevent.stop.enter="selectOption"
            @click.stop="toggle(_item, $event)"
            @mouseenter="currentActive = -1"
          >
            <a v-if="customOptionsVisible" role="button" style="outline: 0">
              <slot name="option" :item="_item" />
              <span
                v-if="selectedIcon && isItemSelected(_item)"
                :class="selectedIconClasses"
              ></span>
            </a>
            <a
              v-else-if="isItemSelected(_item)"
              role="button"
              style="outline: 0"
            >
              <b>{{ _item[labelKey] }}</b>
              <span v-if="selectedIcon" :class="selectedIconClasses"></span>
            </a>
            <a v-else role="button" style="outline: 0">
              <span>{{ _item[labelKey] }}</span>
            </a>
          </li>
        </template>
      </template>
    </template>
  </dropdown>
</template>

<script>
import Local from '../../mixins/locale.mixin'
import Dropdown from '../dropdown/Dropdown.js'
import { onlyUnique } from '../../utils/array.utils'

export default {
  components: { Dropdown },
  mixins: [Local],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    limit: {
      type: Number,
      default: 0,
    },
    size: String,
    placeholder: String,
    split: {
      type: String,
      default: ', ',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    collapseSelected: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    filterAutoFocus: {
      type: Boolean,
      default: true,
    },
    filterFunction: Function,
    filterPlaceholder: String,
    selectedIcon: {
      type: String,
      default: 'glyphicon glyphicon-ok',
    },
    itemSelectedClass: String,
  },
  emits: ['focus', 'blur', 'visible-change', 'update:modelValue', 'change'],
  data() {
    return {
      showDropdown: false,
      els: [],
      filterInput: '',
      currentActive: -1,
    }
  },
  computed: {
    containerStyles() {
      return {
        width: this.block ? '100%' : '',
      }
    },
    filteredOptions() {
      if (this.filterable && this.filterInput) {
        if (this.filterFunction) {
          return this.filterFunction(this.filterInput)
        } else {
          const filterInput = this.filterInput.toLowerCase()
          return this.options.filter(
            (v) =>
              v[this.valueKey].toString().toLowerCase().indexOf(filterInput) >=
                0 ||
              v[this.labelKey].toString().toLowerCase().indexOf(filterInput) >=
                0
          )
        }
      } else {
        return this.options
      }
    },
    groupedOptions() {
      return this.filteredOptions
        .map((v) => v.group)
        .filter(onlyUnique)
        .map((v) => ({
          options: this.filteredOptions.filter((option) => option.group === v),
          $group: v,
        }))
    },
    flattenGroupedOptions() {
      return [].concat(...this.groupedOptions.map((v) => v.options))
    },
    selectClasses() {
      return {
        [`input-${this.size}`]: this.size,
      }
    },
    selectedIconClasses() {
      return {
        [this.selectedIcon]: true,
        'pull-right': true,
      }
    },
    selectTextClasses() {
      return {
        'text-muted': this.modelValue.length === 0,
      }
    },
    labelValue() {
      const optionsByValue = this.options.map((v) => v[this.valueKey])
      return this.modelValue.map((v) => {
        const index = optionsByValue.indexOf(v)
        return index >= 0 ? this.options[index][this.labelKey] : v
      })
    },
    selectedText() {
      if (this.modelValue.length) {
        const labelValue = this.labelValue
        if (this.collapseSelected) {
          let str = labelValue[0]
          str +=
            labelValue.length > 1
              ? `${this.split}+${labelValue.length - 1}`
              : ''
          return str
        } else {
          return labelValue.join(this.split)
        }
      } else {
        return this.placeholder || this.t('uiv.multiSelect.placeholder')
      }
    },
    customOptionsVisible() {
      return !!this.$slots.option || !!this.$slots.option
    },
  },
  watch: {
    showDropdown(v) {
      // clear filter input when dropdown toggles
      this.filterInput = ''
      this.currentActive = -1
      this.$emit('visible-change', v)
      if (v && this.filterable && this.filterAutoFocus) {
        this.$nextTick(() => {
          this.$refs.filterInput.focus()
        })
      }
    },
  },
  mounted() {
    this.els = [this.$el]
  },
  methods: {
    goPrevOption() {
      if (!this.showDropdown) {
        return
      }
      this.currentActive > 0
        ? this.currentActive--
        : (this.currentActive = this.flattenGroupedOptions.length - 1)
    },
    goNextOption() {
      if (!this.showDropdown) {
        return
      }
      this.currentActive < this.flattenGroupedOptions.length - 1
        ? this.currentActive++
        : (this.currentActive = 0)
    },
    selectOption() {
      const index = this.currentActive
      const options = this.flattenGroupedOptions
      if (!this.showDropdown) {
        this.showDropdown = true
      } else if (index >= 0 && index < options.length) {
        this.toggle(options[index])
      }
    },
    itemClasses(item) {
      const result = {
        disabled: item.disabled,
        active: this.currentActive === this.flattenGroupedOptions.indexOf(item),
      }
      if (this.itemSelectedClass) {
        result[this.itemSelectedClass] = this.isItemSelected(item)
      }
      return result
    },
    isItemSelected(item) {
      return this.modelValue.indexOf(item[this.valueKey]) >= 0
    },
    toggle(item) {
      if (item.disabled) {
        return
      }
      const value = item[this.valueKey]
      const index = this.modelValue.indexOf(value)
      if (this.limit === 1) {
        const newValue = index >= 0 ? [] : [value]
        this.$emit('update:modelValue', newValue)
        this.$emit('change', newValue)
      } else {
        if (index >= 0) {
          const newVal = this.modelValue.slice()
          newVal.splice(index, 1)
          this.$emit('update:modelValue', newVal)
          this.$emit('change', newVal)
        } else if (this.limit === 0 || this.modelValue.length < this.limit) {
          const newVal = this.modelValue.slice()
          newVal.push(value)
          this.$emit('update:modelValue', newVal)
          this.$emit('change', newVal)
        } else {
          this.$emit('limit-exceed')
        }
      }
    },
    searchClicked() {
      this.$emit('search', this.filterInput)
    },
  },
}
</script>
