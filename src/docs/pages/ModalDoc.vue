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
        <demo-code-panel demo-file="ModalDoc.vue">
        <pre><code>
&lt;modal v-model=&quot;open&quot; title=&quot;Modal 1&quot;&gt;
  &lt;p&gt;This is a simple modal.&lt;/p&gt;
&lt;/modal&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="modal" file="Modal.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import Modal from '../../components/modal/Modal.vue'
  import Popover from '../../components/popover/Popover.vue'
  import Tooltip from './../../components/tooltip/Tooltip.vue'
  import hljsMixin from './../mixins/hljsMixin'
  import ApiPanel from './../architecture/ApiPanel.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Modal, Popover, Tooltip, ApiPanel},
    data () {
      return {
        api: {
          props: [
            {
              name: 'v-model',
              type: 'Boolean',
              'default': false,
              desc: 'Show / hide the modal',
              required: true
            },
            {
              name: 'title',
              type: 'String',
              desc: 'The modal title (will be override if title slot exist)'
            },
            {
              name: 'size',
              type: 'String',
              desc: 'The alternative modal size. Support \'lg\' / \'sm\''
            },
            {
              name: 'backdrop',
              type: 'Boolean',
              desc: 'Dismiss the modal by backdrop click',
              'default': true
            },
            {
              name: 'footer',
              type: 'Boolean',
              desc: 'Show modal footer',
              'default': true
            },
            {
              name: 'cancel-text',
              type: 'String',
              desc: 'The text of cancel button',
              'default': 'Cancel'
            },
            {
              name: 'ok-text',
              type: 'String',
              desc: 'The text of ok button',
              'default': 'OK'
            },
            {
              name: 'animation',
              type: 'Boolean',
              desc: 'Use animation while show / hide the modal',
              'default': true
            },
            {
              name: 'auto-focus',
              type: 'Boolean',
              desc: 'Focus on the action button that has <code>data-action="auto-focus"</code> attribute after modal open, by default it is the OK button.',
              'default': false
            },
            {
              name: 'keyboard',
              type: 'Boolean',
              desc: 'Close the modal after esc key pressed',
              'default': true
            }
          ],
          slots: [
            {
              name: 'title',
              desc: 'Replace as the modal title'
            },
            {
              name: 'default',
              desc: 'Replace as the modal body'
            },
            {
              name: 'footer',
              desc: 'Replace as the modal footer'
            }
          ],
          events: [
            {
              name: 'modal-show',
              desc: 'Called after modal shown'
            },
            {
              name: 'modal-dismiss',
              desc: 'Called after modal dismissed with message (if exist)',
              params: ['msg']
            }
          ]
        },
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
