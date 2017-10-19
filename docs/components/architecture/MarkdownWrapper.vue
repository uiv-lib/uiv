<template>
  <section style="overflow: hidden">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-10">
        <div class="container container-markdown">
          <div class="row">
            <div class="col-xs-12" ref="markdown">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-2 hidden-xs hidden-sm">
        <affix :offset="100">
          <toc :anchors="anchors"></toc>
        </affix>
      </div>
    </div>
  </section>
</template>

<script>
  import Toc from './Toc.vue'

  const getAnchors = (element) => {
    let anchors = []
    if (document) {
      let headings = element.querySelectorAll(`h1,h2`)
      for (let i = 0; i < headings.length; i++) {
        let h = headings[i]
        // Filter those have no id present
        if (!h.id) {
          continue
        }
        let t = {
          level: parseInt(h.tagName.substr(1, 1)),
          href: `#${h.id}`,
          label: h.innerText.replace('🔗', ''),
          items: []
        }
        if (t.level === 1) {
          anchors.push(t)
        } else if (anchors.length) {
          anchors[anchors.length - 1].items.push(t)
        }
      }
    }
    return anchors
  }

  export default {
    components: {Toc},
    data () {
      return {
        anchors: []
      }
    },
    mounted () {
      this.anchors = getAnchors(this.$refs.markdown)
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
