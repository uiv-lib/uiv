<template>
  <div role="alert" :class="alertClass">
    <button type="button" class="close" aria-label="Close" v-if="closable" @click="closeAlert">
      <span aria-hidden="true">&times;</span>
    </button>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      closable: {
        type: Boolean,
        'default': true
      },
      duration: {
        type: Number,
        'default': 0
      },
      type: {
        type: String,
        'default': 'success'
      }
    },
    data () {
      return {
        timeout: 0
      }
    },
    computed: {
      alertClass () {
        return `alert alert-${this.type}`
      }
    },
    methods: {
      closeAlert () {
        clearTimeout(this.timeout)
        this.$emit('closed')
      }
    },
    mounted () {
      if (this.duration > 0) {
        this.timeout = setTimeout(this.closeAlert, this.duration)
      }
    },
    destroyed () {
      clearTimeout(this.timeout)
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
