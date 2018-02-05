<template>
  <dropdown ref="dropdown" :not-close-elements="els" :disabled="disabled">
    <div class="form-control dropdown-toggle" :disabled="disabled">
      <span :class="selectTextClasses">{{selectedText}}</span>
      <span class="caret"></span>
    </div>
    <template slot="dropdown">
      <li
        v-for="item in options"
        :class="itemClasses(item)"
        @click="toggle(item)">
        <a role="button" v-if="isItemSelected(item)">
          <b :class="selectedClass">{{item.label}}</b>
          <span v-if="selectedIcon" :class="selectedIconClasses"></span>
        </a>
        <a role="button" v-else>
          <span>{{item.label}}</span>
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
      collapseSelected: {
        type: Boolean,
        default: false
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
        els: []
      }
    },
    computed: {
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
        const optionsByValue = this.options.map(v => v.value)
        return this.value.map(v => {
          const index = optionsByValue.indexOf(v)
          return index >= 0 ? this.options[index].label : v
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
      itemClasses (item) {
        return {
          disabled: item.disabled
        }
      },
      isItemSelected (item) {
        return this.value.indexOf(item.value) >= 0
      },
      toggle (item) {
        if (item.disabled) {
          return
        }
        const value = item.value
        const index = this.value.indexOf(value)
        if (index >= 0) {
          this.value.splice(index, 1)
        } else {
          this.value.push(value)
        }
      }
    }
  }
</script>
