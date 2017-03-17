<template>
  <div class="alert" role="alert" :class="alertType">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-if="canClose" @click="closeAlert">
      <span aria-hidden="true">&times;</span>
    </button>
    <div>
      <slot name="contain"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        triggerEl: undefined
      }
    },
    props: {
      canClose: {
        type: Boolean,
        default: false
      },
      displayTime: {
        type: Number
      },
      alertType: {
        default: ''
      }
    },
    methods: {
      closeAlert () {
        this.$el.remove()
      }
    },
    mounted: function () {
      if (this.displayTime > 0) {
        setTimeout(this.closeAlert, this.displayTime)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
