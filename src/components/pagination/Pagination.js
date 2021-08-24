import { range } from '../../utils/array.utils'

export default {
  props: {
    value: {
      type: Number,
      required: true,
      validator: (v) => v >= 1,
    },
    boundaryLinks: {
      type: Boolean,
      default: false,
    },
    directionLinks: {
      type: Boolean,
      default: true,
    },
    size: String,
    align: String,
    totalPage: {
      type: Number,
      required: true,
      validator: (v) => v >= 0,
    },
    maxSize: {
      type: Number,
      default: 5,
      validator: (v) => v >= 0,
    },
    disabled: Boolean,
  },
  data() {
    return {
      sliceStart: 0,
    }
  },
  computed: {
    navClasses() {
      return {
        [`text-${this.align}`]: Boolean(this.align),
      }
    },
    classes() {
      return {
        [`pagination-${this.size}`]: Boolean(this.size),
      }
    },
    sliceArray() {
      return range(this.totalPage).slice(
        this.sliceStart,
        this.sliceStart + this.maxSize
      )
    },
  },
  methods: {
    calculateSliceStart() {
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
    onPageChange(page) {
      if (
        !this.disabled &&
        page > 0 &&
        page <= this.totalPage &&
        page !== this.value
      ) {
        this.$emit('input', page)
        this.$emit('change', page)
      }
    },
    toPage(pre) {
      if (this.disabled) {
        return
      }
      const chunkSize = this.maxSize
      const currentChunkStart = this.sliceStart
      const lastChunkStart = this.totalPage - chunkSize
      const start = pre
        ? currentChunkStart - chunkSize
        : currentChunkStart + chunkSize
      if (start < 0) {
        this.sliceStart = 0
      } else if (start > lastChunkStart) {
        this.sliceStart = lastChunkStart
      } else {
        this.sliceStart = start
      }
    },
  },
  created() {
    this.$watch(
      (vm) => [vm.value, vm.maxSize, vm.totalPage].join(),
      this.calculateSliceStart,
      {
        immediate: true,
      }
    )
  },
}
