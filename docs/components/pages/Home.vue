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
            <h3 v-html="$t('home.desc')"></h3>
            <br/>
            <div>
              <a href="https://github.com/wxsms/uiv" class="btn btn-default btn-lg">
                {{$t('home.codeOnGithub')}}
              </a>
              <router-link to="/getting-started" class="btn btn-default btn-lg">
                {{$t('home.gettingStarted')}}
              </router-link>
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
              <h3>{{$t('home.lightWeight')}}</h3>
              <p><i class="glyphicon glyphicon-leaf icon-thumbnail"></i></p>
              <p v-html="$t('home.lightWeight1')"></p>
              <p v-html="$t('home.lightWeight2')"></p>
              <p v-html="$t('home.lightWeight3')"></p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <div class="caption">
              <h3>{{$t('home.compatible')}}</h3>
              <p><i class="glyphicon glyphicon-check icon-thumbnail"></i></p>
              <p v-html="$t('home.compatible1')"></p>
              <p v-html="$t('home.compatible2')"></p>
              <p v-html="$t('home.compatible3')"></p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4">
          <div class="thumbnail">
            <div class="caption">
              <h3>{{$t('home.openSource')}}</h3>
              <p><i class="glyphicon glyphicon-grain icon-thumbnail"></i></p>
              <p v-html="$t('home.openSource1')"></p>
              <p v-html="$t('home.openSource2')"></p>
              <p v-html="$t('home.openSource3')"></p>
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
  @import "../../assets/css/variables";

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
