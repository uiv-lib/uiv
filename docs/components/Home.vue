<template>
  <section>
    <div class="jumbotron">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12">
            <h1>uiv</h1>
            <br/>
            <p>
              <a href="https://travis-ci.org/wxsms/uiv">
                <img src="https://travis-ci.org/wxsms/uiv.svg?branch=master" alt="Build Status">
              </a>
              <a href="https://coveralls.io/github/wxsms/uiv?branch=master">
                <img src="https://coveralls.io/repos/github/wxsms/uiv/badge.svg?branch=master" alt="Coverage Status">
              </a>
              <a href="https://www.npmjs.com/package/uiv">
                <img src="https://img.shields.io/npm/dm/uiv.svg" alt="NPM Downloads">
              </a>
              <a href="https://www.npmjs.com/package/uiv">
                <img src="https://img.shields.io/npm/v/uiv.svg" alt="NPM Version">
              </a>
              <a href="https://github.com/wxsms/uiv">
                <img src="https://img.shields.io/github/license/wxsms/uiv.svg" alt="License">
              </a>
            </p>
            <br/>
            <h3><b>Bootstrap 3</b> Components implemented by <b>Vue 2</b>.</h3>
            <br/>
            <div>
              <a href="https://github.com/wxsms/uiv" class="btn btn-default btn-lg">Code On Github</a>
              <router-link to="/getting-started" class="btn btn-default btn-lg">Getting Started</router-link>
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <div class="caption">
              <h3>Light Weight</h3>
              <p><i class="glyphicon glyphicon-leaf icon-thumbnail"></i></p>
              <p>~ 14KB Gziped</p>
              <p>Dependencies only</p>
              <p>Vue & Bootstrap CSS</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <div class="caption">
              <h3>Compatible</h3>
              <p><i class="glyphicon glyphicon-check icon-thumbnail"></i></p>
              <p>Tested with</p>
              <p>Modern Browsers</p>
              <p>And IE 9+</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <div class="caption">
              <h3>Open Source</h3>
              <p><i class="glyphicon glyphicon-grain icon-thumbnail"></i></p>
              <p>MIT License</p>
              <p>Easy and Free</p>
              <p>Welcome to contribute!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    components: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../assets/css/variables";

  section {
    background: @home-bg-gradient-to;
    background: -webkit-linear-gradient(to bottom, @home-bg-gradient-from, @home-bg-gradient-to);
    background: linear-gradient(to bottom, @home-bg-gradient-from, @home-bg-gradient-to);
    min-height: 100vh;
    padding-bottom: 100px;
  }

  .thumbnail {
    text-align: center;
    background: transparent;
    border-color: @home-mute-color;

    .caption {
      color: #fff;
    }

    .icon-thumbnail {
      font-size: 600%;
      color: @home-mute-color;
      margin: 20px 0;
      height: 100px;
    }
  }

  .jumbotron {
    .btn {
      background: transparent;
      color: #fff;
      transition: all .3s ease-in-out;
      border: 1px solid #fff;
      margin-right: 10px;

      &:visited, &:focus, &:active {
        color: #fff;
        border: 1px solid #fff;
      }

      &:hover {
        background: #fff;
        color: #333;
        border: 1px solid #fff;
      }
    }

    color: #fff;
    background: transparent;
  }
</style>
