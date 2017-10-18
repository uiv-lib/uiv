<template>
  <div class="container-fluid markdown-wrapper">
    <div class="row">
      <div class="col-xs-12">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" rel="stylesheet/less">
  .markdown-wrapper {

    h1, h2, h3, h4, h5, h6 {
      position: relative;

      .header-anchor {
        font-size: 80%;
        display: none;
        text-decoration: none !important;
      }

      &:hover {
        .header-anchor {
          display: inline;
        }
      }
    }

    // Add `page-header` style
    h1, h2 {
      padding-bottom: 9px;
      margin: 40px 0 20px;
      border-bottom: 1px solid #eee;
    }

    .markdown-live-example {
      margin-right: 0;
      margin-left: 0;
      background-color: #fff;
      border: #ddd 1px solid;
      border-radius: 4px 4px 0 0;
      box-shadow: none;
      padding: 45px 15px 15px;
      position: relative;

      &:after {
        position: absolute;
        top: 15px;
        left: 15px;
        font-size: 12px;
        font-weight: 700;
        color: #959595;
        text-transform: uppercase;
        letter-spacing: 1px;
        content: "Example";
      }

      + pre {
        border-radius: 0 0 4px 4px;
        border-top: none;
      }
    }
  }
</style>
