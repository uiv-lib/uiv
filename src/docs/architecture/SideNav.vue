<template>
  <aside :class="{'show':isAsideShow}">
    <div class="brand">
      <div @click="toggleAside(false)" class="logo">
        <router-link to="/" exact>
          <img class="vue-logo" src="./../../assets/img/v-logo.png">
          <img class="bootstrap-logo" src="./../../assets/img/b-logo.png">
        </router-link>
      </div>
      <h2 @click="toggleAside(false)" class="text-center">
        <router-link to="/" exact>uiv</router-link>
      </h2>
    </div>
    <div class="nav-container">
      <div class="nav-div">
        <ul class="nav nav-pills nav-stacked" role="tablist">
          <template v-for="item in asideItems">
            <template v-if="item.items">
              <li role="presentation">
                <a role="button">
                  <b>{{item.label}}</b>
                </a>
              </li>
              <li role="presentation" v-for="_item in item.items" @click="toggleAside(false)">
                <router-link :to="_item.path" role="button" class="sub-list">
                  {{_item.label}}
                </router-link>
              </li>
            </template>
            <li v-else role="presentation" @click="toggleAside(false)">
              <router-link :to="item.path" role="button">
                <b>{{item.label}}</b>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
  import types from '../../store/mutationTypes'
  import Collapse from './../../components/collapse/Collapse.vue'
  export default {
    components: {Collapse},
    data () {
      return {
        query: ''
      }
    },
    computed: {
      isAsideShow () {
        return this.$store.state.asideShow
      },
      asideItems () {
        return this.$store.state.asideItems
      }
    },
    methods: {
      toggleAside (show) {
        this.$store.commit(types.TOGGLE_ASIDE, show)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./../../assets/css/variables";

  .search-box-placeholder-mixin {
    color: #CFD8DC;
    font-size: 12px
  }

  aside {
    position: fixed;
    left: 0;
    top: 0;
    width: @side-nav-width;
    height: 100vh;
    flex-shrink: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 5;
    background: @aside-bg;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.24);

    .brand {
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid darken(@gray, 10%);

      .logo {
        height: 100px;
        width: 100%;
        position: relative;
        overflow: hidden;
        display: block;

        a {
          display: block;
          width: 100%;
          height: 100%;
        }

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
    }

    .nav-container {
      position: relative;

      .nav-div {
        position: relative;
      }

      .nav {
        li {
          margin: 0;

          a {
            color: #888;
            transition: all .3s ease-in-out;
            text-align: left;
            text-transform: none;
            padding: 15px 15px;
            border: 0;

            &.sub-list {
              padding: 10px 15px 10px 30px;
            }

            &.router-link-active {
              background: @side-nav-item-active-bg;
              color: @highlight-color;
              font-weight: 600;
              box-shadow: -6px 0 0 @highlight-color inset;
            }

            &:hover {
              background: @side-nav-item-active-bg;
            }
          }
        }
      }

      .toc-div {
        padding: 0;
        position: relative;

        .toc-ul {
          list-style: none;
          padding: 20px 20px;
          margin: 0;

          ul {
            list-style: none;
            margin: 0;
            padding-left: 20px;
          }
        }
      }
    }

    .social-links {
      flex-basis: 50px;
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 10px 15px;

      a {
        color: #888;
        text-decoration: none;

        &:hover, &:active, &:focus {
          text-decoration: none;
        }

        i {
          font-size: x-large;
        }
      }
    }
  }

  @media (max-width: @screen-xs-max) {
    aside {
      left: -275px;
      z-index: 1002;
      transition: left .3s ease-in-out;

      &.show {
        left: 0;
      }
    }
  }
</style>
