<template>
  <section class="page-footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <p>Designed and built by <a href="https://github.com/wxsms">@wxsm</a></p>
          <p>Code under <a href="https://github.com/wxsms/uiv/blob/master/LICENSE">MIT License</a></p>
          <p>Document under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    props: ['title'],
    data () {
      return {
        year: new Date().getUTCFullYear()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/variables";

  .page-footer {
    flex-basis: @footer-height;
    display: flex;
    align-items: center;
    background: @footer-bg;
    border-top: 1px solid darken(@gray, 10%);
    color: #888;

    a {
      color: #333;

      &:hover, &:active, &:focus {
        color: #333;
        text-decoration: none;
      }
    }
  }
</style>
