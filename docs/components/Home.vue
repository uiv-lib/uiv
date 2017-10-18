<template>
  <section>
    <div class="jumbotron text-center">
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
        <router-link to="/getting-started" class="btn btn-default btn-lg">Getting Started</router-link>
        <a href="https://github.com/wxsms/uiv" class="btn btn-default btn-lg">Github</a>
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

  .jumbotron {
    background: transparent;

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
  }
</style>
