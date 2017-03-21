<template>
  <nav aria-label="Page navigation">
    <ul class="pagination" :class="pageSize">
      <li :class="{'disabled':sliceStart==1||currentPage==1}" v-if="boundaryLinks" @click="sliceStart-=1">
        <span>
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      <li :class="{'disabled':currentPage==1}" v-if="directionLinks" @click="currentPage-=1">
        <span>
          <span aria-hidden="true">&lsaquo;</span>
        </span>
      </li>
      <li v-if="sliceStart>0"><span>...</span></li>
      <li v-for="item in sliceArray" :key="item" @click="onPageChange(item+1)" class="pagination-page" :class="{'active': currentPage==item+1}">
        <a href="javascript:;">{{item+1}}</a>
      </li>
      <li v-if="sliceStart!=parseInt(totalPage/maxSize)"  @click="sliceStart+=1"><span>...</span></li>
      <li :class="{'disabled':currentPage==totalPage-1}" v-if="directionLinks" @click="currentPage+=1">
        <span>
          <span aria-hidden="true">&rsaquo;</span>
        </span>
      </li>
      <li :class="{'disabled':sliceStart==parseInt(totalPage/maxSize)||currentPage==totalPage-1}" v-if="boundaryLinks" @click="sliceStart += 1">
        <span>
          <span aria-hidden="true">&raquo;</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
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
        value: {},
        currentPage: 1,
        sliceStart: 0
      }
    },
    watch: {
      value (value) {
        try {
          console.log(value)
          this.currentPage = value
        } catch (e) {
          // Silent
        }
      }
    },
    computed: {
      pageSize () {
        return `pagination-${this.size}`
      },
      pageArray () {
        var newArray = []
        for (let i = 0; i < this.totalPage; i++) {
          newArray.push(i)
        }
        return newArray
      },
      sliceStart () {
        return (this.currentPage % this.maxSize) * this.maxSize
      },
      sliceArray () {
        let afterSlice = this.pageArray.slice()
        return afterSlice.slice(this.sliceStart * this.maxSize, this.sliceStart * this.maxSize + this.maxSize)
      }
    },
    methods: {
      onPageChange (page) {
        this.currentPage = page
        console.log(page)
        this.$emit('input', this.currentPage)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
