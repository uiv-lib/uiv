<template>
  <nav aria-label="Page navigation">
    <ul class="pagination" :class="pageSize">
      <li :class="{'disabled':sliceStart==1||currentPage==1}" v-if="boundaryLinks" @click="sliceStart=sliceStart-1">
        <span>
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      <li :class="{'disabled':currentPage==1}" v-if="directionLinks" @click="currentPage=currentPage-1">
        <span>
          <span aria-hidden="true">&lsaquo;</span>
        </span>
      </li>
      <li v-if="sliceStart>0"><span>...</span></li>
      <li v-for="item in sliceArray" :key="item" @click="currentPage=item+1" class="pagination-page" :class="{'active': currentPage==item+1}">
        <a href="javascript:;">{{item+1}}</a>
      </li>
      <li v-if="sliceStart!=parseInt(totalPage/maxSize)"  @click="sliceStart=sliceStart+1"><span>...</span></li>
      <li :class="{'disabled':currentPage==totalPage-1}" v-if="directionLinks" @click="currentPage=currentPage+1">
        <span>
          <span aria-hidden="true">&rsaquo;</span>
        </span>
      </li>
      <li :class="{'disabled':sliceStart==parseInt(totalPage/maxSize)||currentPage==totalPage-1}" v-if="boundaryLinks" @click="sliceStart=sliceStart+1">
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
        currentPage: 1,
        sliceStart: 0
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
        return (this.currentpage % this.maxSize) * this.maxSize
      },
      sliceArray () {
        let afterSlice = this.pageArray.slice()
        return afterSlice.slice(this.sliceStart * this.maxSize, this.sliceStart * this.maxSize + this.maxSize)
      }
    },
    methods: {
      onPageChange (page) {
        this.currentpage = page
        console.log(page)
//        this.$emit('input', this.currentpage)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
