<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="DatePicker" source-folder="datepicker"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="well" v-if="date">You selected <b>{{date.toDateString()}}</b>.</div>
        <form class="form-inline">
          <div class="checkbox">
            <label><input type="checkbox" v-model="todayBtn"> Show Today Btn</label>
          </div>
          <div class="checkbox">
            <label><input type="checkbox" v-model="clearBtn"> Show clear Btn</label>
          </div>
          <div class="checkbox">
            <label><input type="checkbox" v-model="closeOnSelected"> Close On Selected</label>
          </div>
        </form>
        <br/>
        <form class="form-inline">
          <div class="form-group">
            <label>Limit From</label>
            <input type="text" class="form-control" v-model="limitFrom" placeholder="E.g. 2017-03-01">
          </div>
          <div class="form-group">
            <label>Limit To</label>
            <input type="text" class="form-control" v-model="limitTo" placeholder="E.g. 2017-03-31">
          </div>
        </form>
        <h3>Inline Sample</h3>
        <date-picker v-model="date"
                     :inline="true"
                     :today-btn="todayBtn"
                     :clear-btn="clearBtn"
                     :limit-from="limitFrom"
                     :limit-to="limitTo"></date-picker>
        <h3>Popup Sample</h3>
        <form class="form-inline">
          <div class="form-group">
            <div class="input-group">
              <input class="form-control" type="text" v-model="date" readonly>
              <div class="input-group-btn">
                <button class="btn btn-default" type="button" @click="toggle()">
                  <i class="glyphicon glyphicon-calendar"></i>
                </button>
              </div>
            </div>
            <date-picker ref="datepicker"
                         v-model="date"
                         :today-btn="todayBtn"
                         :clear-btn="clearBtn"
                         :limit-from="limitFrom"
                         :limit-to="limitTo"
                         :close-on-selected="closeOnSelected"></date-picker>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <h4>Note</h4>
        <ul>
          <li><p>Use <code>v-model</code> to bind or change the selected date (object).</p></li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li><p><code>width:Number</code> The date-picker's width in px. Default: 270.</p></li>
          <li><p><code>inline:Boolean</code> Use inline date-picker. Default: false.</p></li>
          <li><p><code>today-btn:Boolean</code> Show / hide the today button. Default: true.</p></li>
          <li><p><code>clear-btn:Boolean</code> Show / hide the clear button. Default: true.</p></li>
          <li>
            <p><code>close-on-selected:Boolean</code> Close the date-picker after date selected. Default: true.</p>
          </li>
          <li>
            <p>
              <code>limit-from</code>
              Anything that can convert to a valid Date object.
              E.g. '2017-01-01' or 'new Date()'
            </p>
          </li>
          <li><p><code>limit-to</code> Same as limitFrom.</p></li>
        </ul>
        <h4>Methods</h4>
        <ul>
          <li><p><code>toggle(show:Boolean)</code> Toggle or show / hide the date-picker.</p></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="DatePickerDoc.vue">
        <pre><code>
&lt;div class=&quot;form-group&quot;&gt;
  &lt;div class=&quot;input-group&quot;&gt;
    &lt;input class=&quot;form-control&quot; type=&quot;text&quot; v-model=&quot;date&quot; readonly&gt;
    &lt;div class=&quot;input-group-btn&quot;&gt;
      &lt;button class=&quot;btn btn-default&quot; type=&quot;button&quot; @click=&quot;toggle()&quot;&gt;
        &lt;i class=&quot;glyphicon glyphicon-calendar&quot;&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;date-picker ref=&quot;datepicker&quot; v-model=&quot;date&quot;&gt;&lt;/date-picker&gt;
&lt;/div&gt;

&lt;script&gt;
  ...
  methods: {
    toggle () {
      this.$refs.datepicker.toggle()
    }
  }
  ...
&lt;/script&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'
  import DatePicker from './../components/datepicker/DatePicker.vue'
  export default {
    components: {AnchorHeader, DemoCodeBlock, DatePicker},
    data () {
      return {
        date: null,
        show: false,
        clearBtn: true,
        todayBtn: true,
        closeOnSelected: true,
        limitFrom: '',
        limitTo: ''
      }
    },
    methods: {
      toggle () {
        this.$refs.datepicker.toggle()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
