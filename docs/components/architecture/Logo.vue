<template>
  <div class="logo" :style="logoStyles">
    <img class="vue-logo" :style="vStyles" src="../../assets/img/v-logo.png">
    <img class="bootstrap-logo" :style="bStyles" src="../../assets/img/b-logo.png">
  </div>
</template>

<script>
  export default {
    props: {
      scale: {
        type: Number,
        default: 1
      }
    },
    computed: {
      logoStyles () {
        return {
          height: 100 * this.scale + 'px',
          width: 210 * this.scale + 'px'
        }
      },
      vStyles () {
        return {
          height: 100 * this.scale + 'px'
        }
      },
      bStyles () {
        return {
          height: 60 * this.scale + 'px',
          top: 20 * this.scale + 'px'
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .logo {
    position: relative;
    height: 100px;
    width: 210px;
    margin: 0 auto;

    .vue-logo {
      position: absolute;
      height: 100px;
      top: 0;
      left: 20%;
    }

    .bootstrap-logo {
      position: absolute;
      height: 60px;
      top: 20px;
      left: 50%;
      opacity: .8;
    }
  }
</style>
