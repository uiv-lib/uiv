<template>
  <nav aria-label="Page navigation">
    <ul class="pagination" :class="pageSize">
      <li :class="{disabled: value <= 1}" v-if="boundaryLinks">
        <a href="javascript:void(0)" role="button" aria-label="First" @click="onPageChange(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class="{disabled: value <= 1}" v-if="directionLinks">
        <a href="javascript:void(0)" role="button" aria-label="Previous" @click="onPageChange(value - 1)">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li v-if="sliceStart > 0">
        <a href="javascript:void(0)" role="button" aria-label="Previous group" @click="toPage(1)">
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li v-for="item in sliceArray" :key="item" :class="{active: value === item + 1}">
        <a href="javascript:void(0)" role="button" @click="onPageChange(item + 1)">{{item + 1}}</a>
      </li>
      <li v-if="sliceStart < totalPage - maxSize">
        <a href="javascript:void(0)" role="button" aria-label="Next group" @click="toPage(0)">
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li :class="{disabled: value >= totalPage}" v-if="directionLinks">
        <a href="javascript:void(0)" role="button" aria-label="Next" @click="onPageChange(value + 1)">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li :class="{disabled: value >= totalPage}" v-if="boundaryLinks">
        <a href="javascript:void(0)" role="button" aria-label="Last" @click="onPageChange(totalPage)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        required: true
      },
      boundaryLinks: {
        type: Boolean,
        default: false
      },
      directionLinks: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: ''
      },
      totalPage: {
        type: Number,
        required: true
      },
      maxSize: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        sliceStart: 0
      }
    },
    computed: {
      pageSize () {
        return this.size ? `pagination-${this.size}` : null
      },
      pageArray () {
        let arr = []
        for (let i = 0; i < this.totalPage; i++) {
          arr.push(i)
        }
        return arr
      },
      sliceArray () {
        return this.pageArray.slice(this.sliceStart, this.sliceStart + this.maxSize)
      }
    },
    methods: {
      calculateSliceStart () {
        if (this.value > this.sliceStart + this.maxSize) {
          if (this.value > this.totalPage - this.maxSize) {
            this.sliceStart = this.totalPage - this.maxSize
          } else {
            this.sliceStart = this.value - 1
          }
        } else if (this.value < this.sliceStart + 1) {
          if (this.value - this.maxSize > 0) {
            this.sliceStart = this.value - this.maxSize
          } else {
            this.sliceStart = 0
          }
        }
      },
      onPageChange (page) {
        if (page > 0 && page <= this.totalPage) {
          this.$emit('input', page)
          this.$emit('change', page)
        }
      },
      toPage (pre) {
        let start = pre ? this.sliceStart - this.maxSize : this.sliceStart + this.maxSize
        if (start < 0) {
          this.sliceStart = 0
        } else if (start > this.totalPage - this.maxSize) {
          this.sliceStart = this.totalPage - this.maxSize
        } else {
          this.sliceStart = start
        }
      }
    },
    created () {
      this.$watch(vm => [vm.value, vm.maxSize, vm.totalPage].join(), this.calculateSliceStart, {
        immediate: true
      })
    }
  }
</script>
