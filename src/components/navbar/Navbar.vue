<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <slot name="collapse-btn">
          <button type="button" class="navbar-toggle collapsed" @click="show=!show">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </slot>
        <slot name="brand"/>
      </div>
      <slot/>
      <collapse class="navbar-collapse" v-model="show">
        <slot name="collapse"/>
      </collapse>
    </div>
  </nav>
</template>

<script>
  import Collapse from '../collapse/Collapse'

  export default {
    components: {Collapse},
    data () {
      return {
        show: false
      }
    }
  }
</script>
