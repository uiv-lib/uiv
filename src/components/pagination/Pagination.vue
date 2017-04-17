<template>
  <nav aria-label="Page navigation">
    <ul class="pagination" :class="pageSize">
      <li :class="{'disabled':value<=1}" v-if="boundaryLinks" @click="onPageChange(1)" data-action="first">
        <a role="button">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li :class="{'disabled':value<=1}" v-if="directionLinks" @click="onPageChange(value-1)" data-action="prev-page">
        <a role="button">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li v-if="sliceStart>0" @click="toPage(1)" data-action="prev-group">
        <a role="button">...</a>
      </li>
      <li v-for="item in sliceArray" :key="item" @click="onPageChange(item+1)" class="pagination-page"
          :class="{'active': value==item+1}">
        <a role="button">{{item + 1}}</a>
      </li>
      <li v-if="sliceStart<totalPage-maxSize" @click="toPage(0)" data-action="next-group">
        <a role="button">...</a>
      </li>
      <li :class="{'disabled':value>=totalPage}" v-if="directionLinks" @click="onPageChange(value+1)"
          data-action="next-page">
        <a role="button">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li :class="{'disabled':value>=totalPage}" v-if="boundaryLinks" @click="onPageChange(totalPage)"
          data-action="last">
        <a role="button">
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
        type: Number
      },
      boundaryLinks: {
        type: Boolean,
        'default': false
      },
      directionLinks: {
        type: Boolean,
        'default': true
      },
      size: {
        type: String,
        'default': ''
      },
      totalPage: {
        type: Number
      },
      maxSize: {
        type: Number,
        'default': 5
      }
    },
    data () {
      return {
        sliceStart: 0
      }
    },
    watch: {
      value (value) {
        if (value > this.sliceStart + this.maxSize) {
          if (value > this.totalPage - this.maxSize) {
            this.sliceStart = this.totalPage - this.maxSize
          } else {
            this.sliceStart = value - 1
          }
        } else if (value < this.sliceStart + 1) {
          if (value - this.maxSize > 0) {
            this.sliceStart = value - this.maxSize
          } else {
            this.sliceStart = 0
          }
        }
      }
    },
    computed: {
      pageSize () {
        return this.size ? `pagination-${this.size}` : ``
      },
      pageArray () {
        let newArray = []
        for (let i = 0; i < this.totalPage; i++) {
          newArray.push(i)
        }
        return newArray
      },
      sliceArray () {
        let afterSlice = this.pageArray.slice()
        return afterSlice.slice(this.sliceStart, this.sliceStart + this.maxSize)
      }
    },
    methods: {
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
    }
  }
</script>
