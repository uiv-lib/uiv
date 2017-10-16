<template>
  <section class="header-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <h4>
            <router-link :to="backTo" v-if="backTo" class="btn btn-link">
              <i class="glyphicon glyphicon-menu-left"></i>
            </router-link>
            <span class="title-text">{{title}}</span>
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['title', 'backTo']
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/variables";

  .header-wrapper {
    height: @brand-height;
    display: flex;
    align-items: center;
    border-bottom: 1px solid darken(@gray, 10%);
    margin-bottom: 50px;
    position: relative;
    background: @header-bg;

    h1, h2, h3, h4, h5, h6 {
      margin: 0;
      color: @site-color;
      font-weight: normal;

      .title-text {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
