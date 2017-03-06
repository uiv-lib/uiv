<template>
  <section>
    <ul class="nav nav-tabs">
      <li :class="{'active':activeIndex===0}" @click="activeIndex=0">
        <a href="javascript:void(0);">Tab 1</a>
      </li>
      <li :class="{'active':activeIndex===1}" @click="activeIndex=1">
        <a href="javascript:void(0);">Tab 2</a>
      </li>
    </ul>
    <transition-group name="tab">
      <div :key="index"
           class="tab-pane active"
           v-show="index===activeIndex"
           v-for="(r,index) in tabs">
        this is tab {{r}}
      </div>
    </transition-group>
    <slot></slot>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: 0,
        tabs: [1, 2]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-pane {
    transition: opacity .3s ease-in-out;
    opacity: 1;
  }

  .tab-enter {
    opacity: 0;
  }

  .tab-leave {
    display: none;
  }

  .tab-leave-active {
    transition: none;
  }
</style>
