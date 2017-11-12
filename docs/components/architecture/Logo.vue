<script>
  export default {
    functional: true,
    render (h, {props}) {
      return h('img', {
        class: 'uiv-logo',
        style: {
          height: 150 * props.scale + 'px',
          width: 195 * props.scale + 'px'
        },
        attrs: {
          src: '/static/logo.png'
        }
      })
    },
    props: {
      scale: {
        type: Number,
        default: 1
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .uiv-logo {
    margin: 0 auto;
    display: block;
    position: relative;
  }
</style>
