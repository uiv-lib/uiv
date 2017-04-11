<script>
  export default {
    render (h) {
      return h('transition', {
        on: {
          enter (el) {
            el.style.height = 'auto'
            let height = window.getComputedStyle(el).height
            el.style.height = '0px'
            el.offsetHeight // force repaint
            el.style.height = height
          },
          afterEnter (el) {
            el.style.height = null
          },
          leave (el) {
            el.style.height = window.getComputedStyle(el).height
            el.offsetHeight // force repaint
            el.style.height = '0px'
          },
          afterLeave (el) {
            el.style.height = null
          }
        }
      }, [
        h(this.tag, {
          directives: [
            {name: 'show', value: this.value}
          ],
          'class': {
            collapse: true,
            'in': true
          }
        }, this.$slots.default)
      ])
    },
    props: {
      tag: {
        type: String,
        'default': 'div'
      },
      value: {
        type: Boolean,
        'default': false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .collapse {
    transition: height .3s ease-in-out;
    overflow: hidden;
  }
</style>
