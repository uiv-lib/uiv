<template>
  <section style="overflow: hidden">
    <github-corner/>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-10">
        <div class="container container-markdown">
          <div class="row">
            <div class="col-xs-12" ref="markdown">
              <slot/>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <!-- row -->
              <ins class="adsbygoogle"
                   style="display:block"
                   data-ad-client="ca-pub-4714899946256166"
                   data-ad-slot="2940247473"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
            </div>
          </div>
          <div class="row" v-if="this.docUrl">
            <div class="col-xs-12">
              <div class="edit-this-page">
                <p>
                  Caught a mistake or want to contribute to the documentation?
                  <a :href="docUrlFull">Edit this page on Github!</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-2 hidden-xs hidden-sm" style="margin-top: 80px">
        <affix :offset="80">
          <toc :anchors="anchors" v-if="anchors && anchors.length"/>
          <!--
          <br/>
          <div style="width: 200px;">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-4714899946256166"
                 data-ad-slot="5716075317"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
          -->
        </affix>
      </div>
    </div>
  </section>
</template>

<script>
  import GithubCorner from './../architecture/GithubCorner.vue'
  import Toc from './Toc.vue'
  import googleAd from '../../mixins/googleAd'

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
    components: {Toc, GithubCorner},
    mixins: [googleAd()],
    data () {
      return {
        anchors: []
      }
    },
    computed: {
      docUrl () {
        return this.$route.meta && this.$route.meta.url
      },
      docUrlFull () {
        return `https://github.com/wxsms/uiv/blob/master/docs/pages/${this.docUrl}`
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.anchors = getAnchors(this.$refs.markdown)
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .edit-this-page {
    color: #7f8c8d;
    margin-top: 4em;
    padding-top: 2em;
    border-top: 1px solid #e5e5e5;
    font-size: 0.9em;
  }
</style>
