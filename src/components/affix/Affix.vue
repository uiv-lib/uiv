<template>
  <div class="hidden-print">
    <div :class="classes" :style="styles" v-scroll="onScroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import scroll from './../../directives/scroll'

  export default {
    directives: {
      scroll
    },
    props: {
      offset: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        affixed: false
      }
    },
    computed: {
      classes () {
        return {
          affix: this.affixed
        }
      },
      styles () {
        return {
          marginTop: this.offset > 0 ? this.offset + 'px' : null
        }
      }
    },
    methods: {
      // from https://github.com/ant-design/ant-design/blob/master/components/affix/index.jsx#L20
      onScroll () {
        // if is hidden don't calculate anything
        if (!(this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length)) { return }
        // get window scroll and element position to detect if have to be normal or affixed
        let scroll = {}
        let element = {}
        const rect = this.$el.getBoundingClientRect()
        const body = document.body
        for (let type of ['Top', 'Left']) {
          let t = type.toLowerCase()
          scroll[t] = window['page' + (type === 'Top' ? 'Y' : 'X') + 'Offset']
          element[t] = scroll[t] + rect[t] - (this.$el['client' + type] || body['client' + type] || 0)
        }
        let fix = scroll.top > element.top - this.offset
        if (this.affixed !== fix) {
          this.affixed = fix
          if (this.affixed) {
            this.$emit('affix')
            this.$nextTick(() => {
              this.$emit('affixed')
            })
          }
        }
      }
    }
  }
</script>
