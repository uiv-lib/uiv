<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Modal" source-folder="modal"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Simple Modal with Callback</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="open1=true">Show Modal 1</button>
          <span id="modal1-msg">{{msg || 'A simple modal example.'}}</span>
        </div>
        <h3>Different Sizes</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="open2=true">Large Modal</button>
          <button type="button" class="btn btn-default" @click="open3=true">Small Modal</button>
        </div>
        <h3>Customize Header / Footer</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="open4=true">Modal with HTML Title</button>
          <button type="button" class="btn btn-default" @click="open5=true">Modal with No Footer</button>
          <button type="button" class="btn btn-default" @click="open6=true">Modal with Customize Footer</button>
        </div>
        <h3>Others</h3>
        <div class="well">
          <button type="button" class="btn btn-default" @click="open7=true">Disable Backdrop</button>
          <button type="button" class="btn btn-default" @click="open8=true">Disable Animation</button>
          <button type="button" class="btn btn-default" @click="open9=true">Auto Focus</button>
        </div>
        <!--Modal 1-->
        <modal id="modal-demo-1" ref="modal1" v-model="open1" title="Modal 1" @modal-show="showCallback"
               @modal-dismiss="dismissCallback">
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          <h4>Popover in a modal</h4>
          <popover title="A Title" placement="right" append-to="#modal-demo-1 [role=dialog]">
            <p>
              This
              <a role="button" class="btn btn-default" data-role="trigger">button</a> should trigger a popover on click.
            </p>
            <div slot="popover">And here's some amazing content. It's very engaging. right?</div>
          </popover>
          <h4>Tooltips in a modal</h4>
          <p>
            <tooltip text="Tooltip" append-to="#modal-demo-1 [role=dialog]">
              <a role="button" class="tooltip-test">This link</a>
            </tooltip>
            <span>and</span>
            <tooltip text="Tooltip" append-to="#modal-demo-1 [role=dialog]">
              <a role="button" class="tooltip-test">that link</a>
            </tooltip>
            <span>should have tooltips on hover.</span>
          </p>
          <hr>
          <h4>Overflowing text to show scroll behavior</h4>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
            laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
            laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
            laoreet rutrum faucibus dolor auctor.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </modal>
        <!--Modal 2-->
        <modal v-model="open2" title="Modal 2" size="lg">
          <p>This is a large modal.</p>
        </modal>
        <!--Modal 3-->
        <modal v-model="open3" title="Modal 3" size="sm">
          <p>This is a small modal.</p>
        </modal>
        <!--Modal 4-->
        <modal v-model="open4">
          <span slot="title"><span><i class="glyphicon glyphicon-heart"></i> Modal 4</span></span>
          <p>This is a modal with HTML title.</p>
        </modal>
        <!--Modal 5-->
        <modal v-model="open5" title="Modal 5" :footer="false">
          <p>This is a modal with no footer.</p>
        </modal>
        <!--Modal 6-->
        <modal v-model="open6" title="Modal 6">
          <p>This is a modal with customize footer.</p>
          <div slot="footer">
            <button type="button" class="btn btn-default" @click="open6=false">Close</button>
            <button type="button" class="btn btn-warning">Warning Action</button>
            <button type="button" class="btn btn-danger">Danger Action</button>
          </div>
        </modal>
        <!--Modal 7-->
        <modal v-model="open7" title="Modal 7" :backdrop="false">
          <p>This is a modal that can not close by backdrop click.</p>
        </modal>
        <!--Modal 8-->
        <modal v-model="open8" title="Modal 8" :animation="false">
          <p>This is a modal that has no transition effect.</p>
        </modal>
        <!--Modal 9-->
        <modal v-model="open9" title="Modal 9" :auto-focus="true">
          <p>Check this out! The OK button is focus now.</p>
        </modal>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="ModalDoc.vue">
        <pre><code>
&lt;modal v-model=&quot;open&quot; title=&quot;Modal 1&quot;&gt;
  &lt;p&gt;This is a simple modal.&lt;/p&gt;
&lt;/modal&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">API</h3>
        <h4>Props</h4>
        <ul>
          <li><p><code>v-model: Boolean</code> Show / hide the modal.</p></li>
          <li><p><code>title: String</code> The modal title (will be override if title slot exist).</p></li>
          <li><p><code>size: String</code> The modal size. Support 'lg' / 'sm', default normal size.</p></li>
          <li><p><code>backdrop: Boolean</code> The modal can close by backdrop click. Default true.</p></li>
          <li><p><code>footer: Boolean</code> The modal shows footer. Default true.</p></li>
          <li><p><code>cancelText: String</code> The text of cancel button.</p></li>
          <li><p><code>okText: String</code> The text of ok button.</p></li>
          <li><p><code>animation: Boolean</code> Use animation while show / hide the modal. Default true.</p></li>
          <li>
            <p>
              <code>auto-focus: Boolean</code>
              Focus on the action button that has <code>data-action="auto-focus"</code> attribute after modal open,
              by default it is the OK button.
              Default false.
            </p>
          </li>
          <li><p><code>keyboard: Boolean</code> Close the modal after esc key pressed. Default true.</p></li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li><p><code>title</code> Replace as the modal title.</p></li>
          <li><p><code>default</code> Replace as the modal body.</p></li>
          <li><p><code>footer</code> Replace as the modal footer.</p></li>
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
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodeBlock from '../architecture/DemoCodeBlock.vue'
  import Modal from '../../components/modal/Modal.vue'
  import Popover from '../../components/popover/Popover.vue'
  import Tooltip from './../../components/tooltip/Tooltip.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodeBlock, Modal, Popover, Tooltip},
    data () {
      return {
        msg: '',
        open1: false,
        open2: false,
        open3: false,
        open4: false,
        open5: false,
        open6: false,
        open7: false,
        open8: false,
        open9: false
      }
    },
    methods: {
      showCallback () {
        // console.log('show')
      },
      dismissCallback (msg) {
        this.msg = `Modal 1 dismiss with msg '${msg}'`
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
