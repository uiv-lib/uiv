<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Modal"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h3>Simple Modal with Callback</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="$refs.modal1.toggle()">Show Modal 1</button>
          <span id="modal1-msg">{{msg||'A simple modal example.'}}</span>
        </div>
        <h3>Different Sizes</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="$refs.modal2.toggle()">Large Modal</button>
          <button type="button" class="btn btn-default" @click="$refs.modal3.toggle()">Small Modal</button>
        </div>
        <h3>Customize Header / Footer</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="$refs.modal4.toggle()">Modal with HTML Title</button>
          <button type="button" class="btn btn-default" @click="$refs.modal5.toggle()">Modal with No Footer</button>
          <button type="button" class="btn btn-default" @click="$refs.modal6.toggle()">
            Modal with Customize Footer
          </button>
        </div>
        <h3>Disable Backdrop Function</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="$refs.modal7.toggle()">
            I will Not Close on Backdrop Clicked
          </button>
        </div>
        <!--Modal 1-->
        <modal ref="modal1" title="Modal 1" @modal-show="showCallback" @modal-dismiss="dismissCallback">
          <p>This is a simple modal.</p>
        </modal>
        <!--Modal 2-->
        <modal ref="modal2" title="Modal 2" size="lg">
          <p>This is a large modal.</p>
        </modal>
        <!--Modal 3-->
        <modal ref="modal3" title="Modal 3" size="sm">
          <p>This is a small modal.</p>
        </modal>
        <!--Modal 4-->
        <modal ref="modal4">
      <span slot="title">
        <span><i class="glyphicon glyphicon-heart"></i> Modal 4</span>
      </span>
          <p>This is a modal with HTML title.</p>
        </modal>
        <!--Modal 5-->
        <modal ref="modal5" title="Modal 5" :footer="false">
          <p>This is a modal with no footer.</p>
        </modal>
        <!--Modal 6-->
        <modal ref="modal6" title="Modal 6">
          <p>This is a modal with customize footer.</p>
          <div slot="footer">
            <button type="button" class="btn btn-default" @click="closeModal6">Close</button>
            <button type="button" class="btn btn-warning">Warning Action</button>
            <button type="button" class="btn btn-danger">Danger Action</button>
          </div>
        </modal>
        <!--Modal 7-->
        <modal ref="modal7" title="Modal 7" :backdrop="false">
          <p>This is a modal that can not close by backdrop click.</p>
        </modal>
      </div>
      <div class="col-md-6">
        <h4>Props</h4>
        <ul>
          <li><p><code>title:String</code> The modal title (will be override if title slot exist).</p></li>
          <li><p><code>size:String</code> The modal size. Support 'lg' / 'sm', default normal size.</p></li>
          <li><p><code>backdrop:Boolean</code> The modal can close by backdrop click. Default true.</p></li>
          <li><p><code>footer:Boolean</code> The modal shows footer. Default true.</p></li>
          <li><p><code>cancelText:String</code> The text of cancel button.</p></li>
          <li><p><code>okText:String</code> The text of ok button.</p></li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li><p><code>title</code> Replace as the modal title.</p></li>
          <li><p><code>default</code> Replace as the modal body.</p></li>
          <li><p><code>footer</code> Replace as the modal footer.</p></li>
        </ul>
        <h4>Methods</h4>
        <ul>
          <li><p><code>toggle(show:Boolean)</code> Toggle or show / hide the modal.</p></li>
        </ul>
        <h4>Events</h4>
        <ul>
          <li><p><code>modal-show</code> Called after modal shown.</p></li>
          <li><p><code>modal-dismiss</code> Called after modal dismissed.</p></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import Modal from './../components/Modal.vue'
  export default {
    components: {AnchorHeader, Modal},
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      showCallback () {
        // console.log('show')
      },
      dismissCallback (msg) {
        this.msg = `Modal 1 dismiss with msg '${msg}'`
      },
      closeModal6 () {
        this.$refs.modal6.toggle(false)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
