<template>
  <nav aria-label="Page navigation" :class="navClasses">
    <ul class="pagination" :class="classes">
      <li :class="{disabled: value <= 1}" v-if="boundaryLinks">
        <a href="#" role="button" aria-label="First" @click.prevent="onPageChange(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class="{disabled: value <= 1}" v-if="directionLinks">
        <a href="#" role="button" aria-label="Previous" @click.prevent="onPageChange(value - 1)">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li v-if="sliceStart > 0">
        <a href="#" role="button" aria-label="Previous group" @click.prevent="toPage(1)">
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li v-for="item in sliceArray" :key="item" :class="{active: value === item + 1}">
        <a href="#" role="button" @click.prevent="onPageChange(item + 1)">{{item + 1}}</a>
      </li>
      <li v-if="sliceStart < totalPage - maxSize">
        <a href="#" role="button" aria-label="Next group" @click.prevent="toPage(0)">
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li :class="{disabled: value >= totalPage}" v-if="directionLinks">
        <a href="#" role="button" aria-label="Next" @click.prevent="onPageChange(value + 1)">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li :class="{disabled: value >= totalPage}" v-if="boundaryLinks">
        <a href="#" role="button" aria-label="Last" @click.prevent="onPageChange(totalPage)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {range} from '../../utils/arrayUtils'

  export default {
    props: {
      value: {
        type: Number,
        required: true,
        validator: v => v >= 1
      },
      boundaryLinks: {
        type: Boolean,
        default: false
      },
      directionLinks: {
        type: Boolean,
        default: true
      },
      size: String,
      align: String,
      totalPage: {
        type: Number,
        required: true,
        validator: v => v >= 0
      },
      maxSize: {
        type: Number,
        default: 5,
        validator: v => v >= 0
      }
    },
    data () {
      return {
        sliceStart: 0
      }
    },
    computed: {
      navClasses () {
        return {
          [`text-${this.align}`]: Boolean(this.align)
        }
      },
      classes () {
        return {
          [`pagination-${this.size}`]: Boolean(this.size)
        }
      },
      sliceArray () {
        return range(this.totalPage).slice(this.sliceStart, this.sliceStart + this.maxSize)
      }
    },
    methods: {
      calculateSliceStart () {
        const currentPage = this.value
        const chunkSize = this.maxSize
        const currentChunkStart = this.sliceStart
        const currentChunkEnd = currentChunkStart + chunkSize
        if (currentPage > currentChunkEnd) {
          const lastChunkStart = this.totalPage - chunkSize
          if (currentPage > lastChunkStart) {
            this.sliceStart = lastChunkStart
          } else {
            this.sliceStart = currentPage - 1
          }
        } else if (currentPage < currentChunkStart + 1) {
          if (currentPage > chunkSize) {
            this.sliceStart = currentPage - chunkSize
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
        const chunkSize = this.maxSize
        const currentChunkStart = this.sliceStart
        const lastChunkStart = this.totalPage - chunkSize
        const start = pre ? currentChunkStart - chunkSize : currentChunkStart + chunkSize
        if (start < 0) {
          this.sliceStart = 0
        } else if (start > lastChunkStart) {
          this.sliceStart = lastChunkStart
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
