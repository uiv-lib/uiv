<template>
  <nav :class="navClasses">
    <div :class="fluid?'container-fluid':'container'">
      <div class="navbar-header">
        <slot name="collapse-btn">
          <button type="button" class="navbar-toggle collapsed" @click="toggle">
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
    props: {
      value: Boolean,
      fluid: {
        type: Boolean,
        default: true
      },
      fixedTop: Boolean,
      fixedBottom: Boolean,
      staticTop: Boolean,
      inverse: Boolean
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      navClasses () {
        return {
          navbar: true,
          'navbar-default': !this.inverse,
          'navbar-inverse': this.inverse,
          'navbar-static-top': this.staticTop,
          'navbar-fixed-bottom': this.fixedBottom,
          'navbar-fixed-top': this.fixedTop
        }
      }
    },
    mounted () {
      this.show = !!this.value
    },
    watch: {
      value (v) {
        this.show = v
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
        this.$emit('input', this.show)
      }
    }
  }
</script>
