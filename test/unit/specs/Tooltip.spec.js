import Vue from 'vue'
import Tooltip from '@/components/tooltip/Tooltip.vue'

describe('Tooltip', () => {
  it('should be able to append to custom tags', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let tag = document.createElement('div')
    tag.id = 'tag'
    document.body.appendChild(tag)
    let res = Vue.compile('<tooltip trigger="focus" text="test" append-to="#tag"><button type="button">{{msg}}</button></tooltip>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount('#app')
    vm.$nextTick(() => {
      vm.$el.querySelector('button').focus()
      setTimeout(() => {
        expect(tag.querySelector('.tooltip')).to.exist
        tag.remove()
        app.remove()
        done()
      }, 200)
    })
  })

  it('should be able to render with no content', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let res = Vue.compile('<tooltip text="test"></tooltip>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount('#app')
    vm.$nextTick(() => {
      vm.$destroy()
      app.remove()
      done()
    })
  })

  it('should be able to show tooltip on init', (done) => {
    let app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
    let res = Vue.compile('<tooltip text="test" v-model="show"><button></button></tooltip>')
    let vm = new Vue({
      data () {
        return {
          show: true
        }
      },
      components: {Tooltip},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount('#app')
    setTimeout(() => {
      expect(document.querySelectorAll('.tooltip').length).to.equal(1)
      app.remove()
      vm.$destroy()
      done()
    }, 200)
  })
})
